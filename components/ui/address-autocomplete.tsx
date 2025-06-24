"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { MapPin, X, Loader2 } from "lucide-react"

interface AddressAutocompleteProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  onChange?: (address: string, placeDetails?: any) => void
  className?: string
  error?: boolean
  placeholder?: string
  countryRestrict?: string[]
}

interface NominatimResult {
  place_id: number
  licence: string
  osm_type: string
  osm_id: number
  boundingbox: string[]
  lat: string
  lon: string
  display_name: string
  class: string
  type: string
  importance: number
  icon?: string
  address?: {
    house_number?: string
    road?: string
    neighbourhood?: string
    suburb?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
    country_code?: string
  }
}

const AddressAutocomplete = React.forwardRef<HTMLInputElement, AddressAutocompleteProps>(
  ({ className, value, onChange, error, placeholder, countryRestrict = ['ma'], ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [inputValue, setInputValue] = React.useState(value || '')
    const [suggestions, setSuggestions] = React.useState<NominatimResult[]>([])
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const abortController = React.useRef<AbortController | null>(null)

    // Debounce search to avoid too many API calls
    const debounceTimeout = React.useRef<NodeJS.Timeout>()

    // Handle input change and get predictions
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setInputValue(newValue)
      
      // Clear previous timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }

      // Abort previous request
      if (abortController.current) {
        abortController.current.abort()
      }

      if (newValue.length < 3) {
        setSuggestions([])
        setShowSuggestions(false)
        setIsLoading(false)
        return
      }

      setIsLoading(true)

      // Debounce the search
      debounceTimeout.current = setTimeout(async () => {
        try {
          abortController.current = new AbortController()
          
          // Build country codes parameter
          const countryCodes = countryRestrict.join(',')
          
          // Nominatim search URL
          const searchUrl = new URL('https://nominatim.openstreetmap.org/search')
          searchUrl.searchParams.set('q', newValue)
          searchUrl.searchParams.set('format', 'json')
          searchUrl.searchParams.set('addressdetails', '1')
          searchUrl.searchParams.set('limit', '5')
          searchUrl.searchParams.set('countrycodes', countryCodes)
          searchUrl.searchParams.set('accept-language', 'en')

          const response = await fetch(searchUrl.toString(), {
            signal: abortController.current.signal,
            headers: {
              'User-Agent': 'CTSTransport/1.0 (contact@ctstransport.com)'
            }
          })

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const results: NominatimResult[] = await response.json()
          
          if (results && results.length > 0) {
            setSuggestions(results)
            setShowSuggestions(true)
          } else {
            setSuggestions([])
            setShowSuggestions(false)
          }
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            console.error('Error fetching suggestions:', error)
          }
          setSuggestions([])
          setShowSuggestions(false)
        } finally {
          setIsLoading(false)
        }
      }, 300) // 300ms debounce
    }

    // Handle suggestion selection
    const handleSuggestionSelect = (suggestion: NominatimResult) => {
      setInputValue(suggestion.display_name)
      setShowSuggestions(false)
      
      // Create place details object similar to Google Places format
      const placeDetails = {
        formatted_address: suggestion.display_name,
        geometry: {
          location: {
            lat: parseFloat(suggestion.lat),
            lng: parseFloat(suggestion.lon)
          }
        },
        place_id: suggestion.place_id.toString(),
        address_components: suggestion.address ? [
          suggestion.address.house_number && { long_name: suggestion.address.house_number, short_name: suggestion.address.house_number, types: ['street_number'] },
          suggestion.address.road && { long_name: suggestion.address.road, short_name: suggestion.address.road, types: ['route'] },
          suggestion.address.city && { long_name: suggestion.address.city, short_name: suggestion.address.city, types: ['locality'] },
          suggestion.address.state && { long_name: suggestion.address.state, short_name: suggestion.address.state, types: ['administrative_area_level_1'] },
          suggestion.address.country && { long_name: suggestion.address.country, short_name: suggestion.address.country_code?.toUpperCase(), types: ['country'] },
          suggestion.address.postcode && { long_name: suggestion.address.postcode, short_name: suggestion.address.postcode, types: ['postal_code'] }
        ].filter(Boolean) : []
      }
      
      onChange?.(suggestion.display_name, placeDetails)
    }

    // Clear input
    const handleClear = () => {
      setInputValue('')
      setShowSuggestions(false)
      setIsLoading(false)
      onChange?.('')
      
      // Abort any pending request
      if (abortController.current) {
        abortController.current.abort()
      }
      
      // Clear timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current)
      }
    }

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
          setShowSuggestions(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Sync with external value changes
    React.useEffect(() => {
      if (value !== undefined && value !== inputValue) {
        setInputValue(value)
      }
    }, [value])

    // Cleanup on unmount
    React.useEffect(() => {
      return () => {
        if (abortController.current) {
          abortController.current.abort()
        }
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current)
        }
      }
    }, [])

    // Format display name for better readability
    const formatDisplayName = (displayName: string) => {
      // Split by commas and take first 3-4 parts for cleaner display
      const parts = displayName.split(',').map(part => part.trim())
      if (parts.length > 4) {
        return parts.slice(0, 3).join(', ') + '...'
      }
      return displayName
    }

    // Extract main address and secondary info
    const getAddressParts = (displayName: string) => {
      const parts = displayName.split(',').map(part => part.trim())
      const main = parts[0] || displayName
      const secondary = parts.slice(1, 3).join(', ')
      return { main, secondary }
    }

    return (
      <div className={cn("relative", className)}>
        <div className="relative">
          <Input
            {...props}
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            className={cn(
              "pr-16",
              error && "border-red-500 focus:border-red-500"
            )}
            placeholder={placeholder}
            autoComplete="off"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            {isLoading && (
              <div className="p-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
            {inputValue && !isLoading && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                title="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {!isLoading && (
              <div className="p-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
              </div>
            )}
          </div>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
            {suggestions.map((suggestion) => {
              const { main, secondary } = getAddressParts(suggestion.display_name)
              return (
                <button
                  key={suggestion.place_id}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none transition-colors border-b border-border last:border-b-0"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {main}
                      </div>
                      {secondary && (
                        <div className="text-xs text-muted-foreground mt-1 truncate">
                          {secondary}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* No results message */}
        {showSuggestions && suggestions.length === 0 && !isLoading && inputValue.length >= 3 && (
          <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg">
            <div className="px-4 py-3 text-sm text-muted-foreground text-center">
              No addresses found. Try a different search term.
            </div>
          </div>
        )}
      </div>
    )
  }
)

AddressAutocomplete.displayName = "AddressAutocomplete"

export { AddressAutocomplete } 