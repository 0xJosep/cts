"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectSeparator } from "./select"

// Common country codes with flags - prioritize Morocco and commonly used countries
const countryCodes = [
  { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Morocco', popular: true },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France', popular: true },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain', popular: true },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'United States', popular: true },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom', popular: true },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany' },
  { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy' },
  { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada' },
  { code: '+213', country: 'DZ', flag: '🇩🇿', name: 'Algeria' },
  { code: '+216', country: 'TN', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt' },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE' },
  { code: '+90', country: 'TR', flag: '🇹🇷', name: 'Turkey' },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China' },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India' },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea' },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia' },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil' },
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico' },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia' },
  { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa' }
]

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string
  countryCode?: string
  onPhoneChange?: (phone: string) => void
  onCountryChange?: (countryCode: string) => void
  className?: string
  error?: boolean
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, countryCode = '+1', onPhoneChange, onCountryChange, error, ...props }, ref) => {
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const phoneNumber = e.target.value.replace(/[^\d\s\-\(\)]/g, '') // Allow digits, spaces, hyphens, and parentheses
      onPhoneChange?.(phoneNumber)
    }

    const handleCountryChange = (newCountryCode: string) => {
      onCountryChange?.(newCountryCode)
    }

    return (
      <div className={cn("flex", className)}>
        <Select value={countryCode} onValueChange={handleCountryChange}>
          <SelectTrigger className={cn(
            "w-[120px] rounded-r-none border-r-0 focus:z-10",
            error && "border-red-500 focus:border-red-500"
          )}>
            <SelectValue>
              <div className="flex items-center gap-2">
                <span>{countryCodes.find(c => c.code === countryCode)?.flag}</span>
                <span className="text-sm">{countryCode}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {countryCodes.map((country, index) => {
              const isPopular = country.popular;
              const nextCountry = countryCodes[index + 1];
              const shouldAddSeparator = isPopular && nextCountry && !nextCountry.popular;
              
              return (
                <React.Fragment key={`${country.code}-${country.country}`}>
                  <SelectItem value={country.code}>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{country.name}</span>
                        <span className="text-xs text-muted-foreground">{country.code}</span>
                      </div>
                    </div>
                  </SelectItem>
                  {shouldAddSeparator && <SelectSeparator />}
                </React.Fragment>
              );
            })}
          </SelectContent>
        </Select>
        <Input
          {...props}
          ref={ref}
          type="tel"
          value={value}
          onChange={handlePhoneChange}
          className={cn(
            "rounded-l-none focus:z-10",
            error && "border-red-500 focus:border-red-500"
          )}
          placeholder="Enter phone number"
        />
      </div>
    )
  }
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput } 