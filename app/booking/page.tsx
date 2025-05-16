'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon, UserIcon, UsersIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import './booking.css'
import { useTheme } from '../providers/ThemeProvider'
import { DatePicker } from '@/components/ui/date-picker'
import { format, parse } from 'date-fns'
import { DateTimePicker } from '@/components/ui/datetime-picker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const { darkMode, toggleDarkMode } = useTheme()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  
  // Track when validation should be shown for each step
  const [validationState, setValidationState] = useState({
    showRouteErrors: false,
    showScheduleErrors: false,
    showDetailsErrors: false
  })
  
  // Track error messages for each field
  const [errorMessages, setErrorMessages] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    name: '',
    email: '',
    phone: ''
  })
  
  const [formData, setFormData] = useState({
    pickupLocation: '',
    dropoffLocation: '',
    date: '',
    time: '',
    passengers: '1',
    service: 'sedan',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  })

  // Initialize selectedDate from URL params if available
  useEffect(() => {
    if (formData.date) {
      try {
        const parsedDate = parse(formData.date, 'yyyy-MM-dd', new Date());
        setSelectedDate(parsedDate);
      } catch (error) {
        console.error('Failed to parse date:', error);
      }
    }
  }, []);
  
  // Reset validation state when switching steps
  useEffect(() => {
    // Reset errors visibility when changing steps
    if (step === 1) {
      setValidationState(prev => ({ ...prev, showRouteErrors: false }));
    } else if (step === 2) {
      setValidationState(prev => ({ ...prev, showScheduleErrors: false }));
    } else if (step === 3) {
      setValidationState(prev => ({ ...prev, showDetailsErrors: false }));
    }
  }, [step]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error message when user types
    if (errorMessages[name as keyof typeof errorMessages]) {
      setErrorMessages(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Helper function to get border class based on error state
  const getBorderClass = (hasError: boolean) => {
    return hasError ? 'border-gold/80' : 'border-border';
  }

  const nextStep = () => {
    // Validate step 1 fields (route information)
    if (step === 1) {
      const newErrors = { ...errorMessages }
      let hasErrors = false
      
      if (!formData.pickupLocation) {
        newErrors.pickupLocation = 'Pickup location is required'
        hasErrors = true
      }
      
      if (!formData.dropoffLocation) {
        newErrors.dropoffLocation = 'Dropoff location is required'
        hasErrors = true
      }
      
      if (hasErrors) {
        setErrorMessages(newErrors)
        setValidationState(prev => ({ ...prev, showRouteErrors: true }))
        return
      }
    } 
    // Validate step 2 fields (schedule)
    else if (step === 2) {
      if (!selectedDate) {
        setErrorMessages(prev => ({ ...prev, date: 'Please select a date and time' }))
        setValidationState(prev => ({ ...prev, showScheduleErrors: true }))
        return
      }
      
      // Sync the date
      setFormData(prev => ({ ...prev, date: format(selectedDate, 'yyyy-MM-dd') }))
    }
    
    // If validation passes, move to the next step
    setStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields for step 3
    const newErrors = { ...errorMessages }
    let hasErrors = false
    
    if (!formData.name) {
      newErrors.name = 'Full name is required'
      hasErrors = true
    }
    
    if (!formData.email) {
      newErrors.email = 'Email address is required'
      hasErrors = true
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
      hasErrors = true
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
      hasErrors = true
    }
    
    // Show validation errors only after submit attempt
    setValidationState(prev => ({ ...prev, showDetailsErrors: true }))
    setErrorMessages(newErrors)
    
    if (hasErrors) {
      return
    }
    
    // Make sure the date is properly set before submission
    if (selectedDate && formData.date === '') {
      setFormData(prev => ({ ...prev, date: format(selectedDate, 'yyyy-MM-dd') }))
    }
    
    // Here you would handle the form submission, e.g., send data to backend
    console.log('Booking submitted:', {
      ...formData,
      date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : formData.date
    })
    
    // Navigate to confirmation page
    router.push('/booking/confirmation')
  }

  const selectService = (service: string) => {
    setFormData(prev => ({ ...prev, service }))
  }

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true)
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      setIsLoadingLocation(false)
      return
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          
          // Use reverse geocoding to get address from coordinates
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            { headers: { 'Accept-Language': 'en' } }
          )
          
          if (response.ok) {
            const data = await response.json()
            const address = data.display_name
            
            setFormData(prev => ({ ...prev, pickupLocation: address }))
          } else {
            throw new Error('Failed to get address')
          }
        } catch (error) {
          console.error('Error getting address:', error)
          alert('Unable to retrieve your location address. Please enter it manually.')
        } finally {
          setIsLoadingLocation(false)
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        alert(`Error getting your location: ${error.message}`)
        setIsLoadingLocation(false)
      },
      { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
    )
  }

  // Clear date error when user selects a date
  const clearDateError = () => {
    setErrorMessages(prev => ({ ...prev, date: '' }))
  }

  return (
    <div className="relative min-h-screen bg-background py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-4">
          <Link
            href="/"
            className="rounded-md bg-card border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent flex items-center whitespace-nowrap min-w-[120px] justify-center order-1 group"
          >
            <ArrowLeftIcon className="h-6 w-6 sm:h-12 sm:w-12 mr-2 text-gold" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center w-full sm:flex-grow order-3 sm:order-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Book Your <span className="accent-gold">Luxury Experience</span>
            </h1>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg text-muted-foreground">
              Complete the form below to reserve your premium transportation
            </p>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors bg-card border border-border order-2 sm:order-3"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Progress steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <MapPinIcon className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm">Route</span>
            </div>
            <div className={`h-1 w-20 mx-2 ${step > 1 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <ClockIcon className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm">Schedule</span>
            </div>
            <div className={`h-1 w-20 mx-2 ${step > 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <UserIcon className="h-5 w-5" />
              </div>
              <span className="mt-2 text-sm">Details</span>
            </div>
          </div>
        </div>

        {/* Booking form */}
        <form onSubmit={handleSubmit} className="w-full" noValidate>
          <div className="overflow-hidden rounded-lg bg-card shadow w-full">
            {/* Step 1: Trip Details */}
            <div className={step === 1 ? 'block' : 'hidden'}>
              <div className="p-6">
                <h2 className="text-lg font-medium text-foreground">Trip Details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us about your journey
                </p>

                {/* General error message for step 1 */}
                {validationState.showRouteErrors && (errorMessages.pickupLocation || errorMessages.dropoffLocation) && (
                  <div className="mt-4 p-3 bg-gold/5 border border-gold/40 rounded-md">
                    <p className="text-sm text-gold-dark font-medium">
                      Please provide both pickup and dropoff locations to continue.
                    </p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-foreground">
                      Pickup Location
                    </label>
                    <div className="mt-1">
                      <div className="relative">
                        <input
                          type="text"
                          name="pickupLocation"
                          id="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          className={`block w-full rounded-md ${getBorderClass(validationState.showRouteErrors && !!errorMessages.pickupLocation)} bg-background px-4 py-3 pr-12 shadow-sm focus:border-primary focus:ring-primary booking-input`}
                          placeholder="Enter address, hotel, or airport"
                        />
                        <button
                          type="button"
                          onClick={handleGetCurrentLocation}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground hover:text-primary transition-colors"
                          disabled={isLoadingLocation}
                          title="Use my current location"
                        >
                          {isLoadingLocation ? (
                            <div className="h-5 w-5 border-2 border-t-transparent border-primary rounded-full animate-spin"></div>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </button>
                      </div>
                      {validationState.showRouteErrors && errorMessages.pickupLocation && (
                        <p className="mt-1 text-sm text-gold-dark font-medium">{errorMessages.pickupLocation}</p>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Click the pin icon to use your current location</p>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="dropoffLocation" className="block text-sm font-medium text-foreground">
                      Dropoff Location
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="dropoffLocation"
                        id="dropoffLocation"
                        value={formData.dropoffLocation}
                        onChange={handleChange}
                        className={`block w-full rounded-md ${getBorderClass(validationState.showRouteErrors && !!errorMessages.dropoffLocation)} bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input`}
                        placeholder="Enter destination address or location"
                      />
                      {validationState.showRouteErrors && errorMessages.dropoffLocation && (
                        <p className="mt-1 text-sm text-gold-dark font-medium">{errorMessages.dropoffLocation}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Date & Time */}
            <div className={step === 2 ? 'block' : 'hidden'}>
              <div className="p-6">
                <h2 className="text-lg font-medium text-foreground">Schedule</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Select your preferred date and time
                </p>

                {/* General error message for step 2 */}
                {validationState.showScheduleErrors && errorMessages.date && (
                  <div className="mt-4 p-3 bg-gold/5 border border-gold/40 rounded-md">
                    <p className="text-sm text-gold-dark font-medium">
                      Please select a date and time to continue.
                    </p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="datetime" className="block text-sm font-medium text-foreground">
                      Date & Time
                    </label>
                    <div className="mt-1 relative">
                      <DateTimePicker
                        date={selectedDate}
                        setDate={(date) => {
                          setSelectedDate(date);
                          if (date) {
                            setFormData(prev => ({
                              ...prev,
                              date: format(date, 'yyyy-MM-dd'),
                              time: format(date, 'HH:mm')
                            }));
                            // Clear the date error when user selects a date
                            setErrorMessages(prev => ({ ...prev, date: '' }));
                          }
                        }}
                        className={`w-full booking-input ${getBorderClass(validationState.showScheduleErrors && !!errorMessages.date)}`}
                      />
                      {validationState.showScheduleErrors && errorMessages.date && (
                        <p className="mt-1 text-sm text-gold-dark font-medium">{errorMessages.date}</p>
                      )}
                      <input 
                        type="hidden" 
                        name="date" 
                        id="date" 
                        value={selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''} 
                      />
                      <input 
                        type="hidden" 
                        name="time" 
                        id="time" 
                        value={selectedDate ? format(selectedDate, 'HH:mm') : ''} 
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="passengers" className="block text-sm font-medium text-foreground">
                      Passengers
                    </label>
                    <div className="mt-1 relative">
                      <Select
                        value={formData.passengers}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, passengers: value }))}
                      >
                        <SelectTrigger className="w-full booking-input px-4 py-3 h-auto">
                          <SelectValue placeholder="Select number of passengers" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} passenger{num > 1 ? 's' : ''}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="absolute inset-y-0 right-10 flex items-center pointer-events-none">
                        <UsersIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Service Type
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div 
                        className={`service-option p-4 cursor-pointer ${formData.service === 'sedan' ? 'selected' : ''}`}
                        onClick={() => selectService('sedan')}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-foreground">Executive Sedan</h3>
                          {formData.service === 'sedan' && (
                            <CheckIcon className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Luxury sedan for up to 3 passengers</p>
                        <p className="mt-2 text-sm font-medium text-gold">From 850 MAD</p>
                      </div>

                      <div 
                        className={`service-option p-4 cursor-pointer ${formData.service === 'suv' ? 'selected' : ''}`}
                        onClick={() => selectService('suv')}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-foreground">Luxury SUV</h3>
                          {formData.service === 'suv' && (
                            <CheckIcon className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Spacious SUV for up to 5 passengers</p>
                        <p className="mt-2 text-sm font-medium text-gold">From 1250 MAD</p>
                      </div>

                      <div 
                        className={`service-option p-4 cursor-pointer ${formData.service === 'van' ? 'selected' : ''}`}
                        onClick={() => selectService('van')}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-foreground">Premium Van</h3>
                          {formData.service === 'van' && (
                            <CheckIcon className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Spacious van for up to 8 passengers</p>
                        <p className="mt-2 text-sm font-medium text-gold">From 1450 MAD</p>
                      </div>

                      <div 
                        className={`service-option p-4 cursor-pointer ${formData.service === 'limousine' ? 'selected' : ''}`}
                        onClick={() => selectService('limousine')}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-foreground">Stretch Limousine</h3>
                          {formData.service === 'limousine' && (
                            <CheckIcon className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Luxury limousine for up to 6 passengers</p>
                        <p className="mt-2 text-sm font-medium text-gold">From 2200 MAD</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Personal Details */}
            <div className={step === 3 ? 'block' : 'hidden'}>
              <div className="p-6">
                <h2 className="text-lg font-medium text-foreground">Your Details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Please provide your contact information
                </p>

                {/* General error message for step 3 */}
                {validationState.showDetailsErrors && (errorMessages.name || errorMessages.email || errorMessages.phone) && (
                  <div className="mt-4 p-3 bg-gold/5 border border-gold/40 rounded-md">
                    <p className="text-sm text-gold-dark font-medium">
                      Please complete all required fields to proceed with your booking.
                    </p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`block w-full rounded-md ${getBorderClass(validationState.showDetailsErrors && !!errorMessages.name)} bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input`}
                      />
                      {validationState.showDetailsErrors && errorMessages.name && (
                        <p className="mt-1 text-sm text-gold-dark font-medium">{errorMessages.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full rounded-md ${getBorderClass(validationState.showDetailsErrors && !!errorMessages.email)} bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input`}
                      />
                      {validationState.showDetailsErrors && errorMessages.email && (
                        <p className="mt-1 text-sm text-gold-dark font-medium">{errorMessages.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                      Phone
                    </label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full rounded-md ${getBorderClass(validationState.showDetailsErrors && !!errorMessages.phone)} bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input`}
                      />
                      {validationState.showDetailsErrors && errorMessages.phone && (
                        <p className="mt-1 text-sm text-gold-dark font-medium">{errorMessages.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="specialRequests" className="block text-sm font-medium text-foreground">
                      Special Requests
                    </label>
                    <div className="mt-1">
                      <textarea
                        name="specialRequests"
                        id="specialRequests"
                        rows={3}
                        value={formData.specialRequests}
                        onChange={handleChange}
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        placeholder="Any special requirements or preferences?"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <div className="rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 via-background to-gold/5 border border-border shadow-lg">
                      {/* Booking Summary Header */}
                      <div className="p-4 sm:p-5 bg-gradient-to-r from-primary/10 to-gold/10 border-b border-border">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-foreground">Your Luxury Experience</h3>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-gold/80 animate-pulse delay-150"></div>
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Route Map Visualization */}
                      <div className="p-4 sm:p-6 relative">
                        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-background/80 to-transparent"></div>
                        
                                                {/* From/To Header */}                        <div className="flex items-center mb-4">                          <span className="text-xs font-medium text-primary uppercase tracking-wider">Your Journey</span>                        </div>
                        
                                                {/* Route Path */}                        <div className="flex relative z-10 mb-6">                          <div className="flex flex-col items-center mr-4">                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center p-2.5 relative z-10 ring-4 ring-background">                              <MapPinIcon className="h-5 w-5 text-primary" />                            </div>                            <div className="h-28 w-0.5 bg-gradient-to-b from-primary to-gold/80"></div>                            <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center p-2.5 relative z-10 ring-4 ring-background">                              <MapPinIcon className="h-5 w-5 text-gold" />                            </div>                          </div>                                                    <div className="flex-1 flex flex-col justify-between">                            <div className="min-h-[64px] bg-card p-3 rounded-lg shadow-sm border border-border/40 mb-auto">                              <div className="flex items-center">                                <span className="text-xs font-bold uppercase text-primary tracking-wider pb-1">Pickup</span>                              </div>                              <p className="text-sm font-medium text-foreground line-clamp-2">{formData.pickupLocation || '(Not specified)'}</p>                            </div>                                                        <div className="min-h-[64px] bg-card p-3 rounded-lg shadow-sm border border-border/40 mt-auto">                              <div className="flex items-center">                                <span className="text-xs font-bold uppercase text-gold tracking-wider pb-1">Dropoff</span>                              </div>                              <p className="text-sm font-medium text-foreground line-clamp-2">{formData.dropoffLocation || '(Not specified)'}</p>                            </div>                          </div>                        </div>
                        
                                                {/* Service Details */}                        <div className="grid grid-cols-1 gap-4 mb-4">                          {/* Reorganized Details Section */}                          <div className="rounded-xl bg-card border border-border/50 shadow-sm overflow-hidden">                            <div className="bg-gradient-to-r from-primary/10 to-gold/10 px-4 py-2.5 border-b border-border/30">                              <h3 className="text-sm font-bold text-foreground">Journey Details</h3>                            </div>                            <div className="p-1">                              <div className="grid grid-cols-3 divide-x divide-border/30">                                {/* Vehicle Type */}                                <div className="p-3 flex flex-col">                                  <span className="text-xs uppercase tracking-wider font-bold text-primary/80 mb-2">Vehicle</span>                                  <div className="flex items-center">                                    {formData.service === 'sedan' && (                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">                                        <path d="M5 10h14a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" />                                        <path d="M19 10V6a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v4" />                                        <circle cx="7" cy="16" r="2" />                                        <circle cx="17" cy="16" r="2" />                                      </svg>                                    )}                                    {formData.service === 'suv' && (                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">                                        <path d="M5 14h14a2 2 0 0 0 2-2V8a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v4a2 2 0 0 0 2 2z" />                                        <path d="M5 14v2a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-2" />                                        <circle cx="7" cy="14" r="2" />                                        <circle cx="17" cy="14" r="2" />                                      </svg>                                    )}                                    {formData.service === 'van' && (                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">                                        <rect x="2" y="8" width="20" height="8" rx="2" />                                        <path d="M2 12h20" />                                        <path d="M10 8V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3" />                                        <circle cx="7" cy="16" r="2" />                                        <circle cx="17" cy="16" r="2" />                                      </svg>                                    )}                                    {formData.service === 'limousine' && (                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">                                        <rect x="2" y="10" width="20" height="6" rx="2" />                                        <path d="M2 13h20" />                                        <path d="M7 10V8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />                                        <circle cx="5" cy="16" r="1" />                                        <circle cx="19" cy="16" r="1" />                                      </svg>                                    )}                                    <div>                                      <p className="text-sm font-bold">                                        {formData.service === 'sedan' ? 'Executive Sedan' :                                           formData.service === 'suv' ? 'Luxury SUV' :                                           formData.service === 'van' ? 'Premium Van' : 'Stretch Limousine'}                                      </p>                                    </div>                                  </div>                                </div>                                                                {/* Passengers */}                                <div className="p-3 flex flex-col">                                  <span className="text-xs uppercase tracking-wider font-bold text-primary/80 mb-2">Passengers</span>                                  <div className="flex items-center">                                    <UsersIcon className="h-6 w-6 mr-2 text-gold" />                                    <p className="text-sm font-bold">                                      {formData.passengers} {parseInt(formData.passengers) === 1 ? 'Person' : 'People'}                                    </p>                                  </div>                                </div>                                                                {/* Date & Time */}                                <div className="p-3 flex flex-col">                                  <span className="text-xs uppercase tracking-wider font-bold text-primary/80 mb-2">Date & Time</span>                                  <div className="flex items-center">                                    <ClockIcon className="h-6 w-6 mr-2 text-gold" />                                    <p className="text-sm font-bold whitespace-normal">                                      {formData.date                                         ? new Date(formData.date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})                                         : '(Not specified)'}                                       {formData.time ? ' at ' + formData.time : ''}                                    </p>                                  </div>                                </div>                              </div>                            </div>                          </div>                        </div>
                        
                                                {/* Booking ID */}                        <div className="flex items-center pt-2 border-t border-border/30">                          <div className="flex items-center">                            <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center mr-2">                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">                                <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />                                <path d="M12 9v6" />                                <path d="M9 12h6" />                              </svg>                            </div>                            <div>                              <span className="text-xs text-muted-foreground">Booking reference</span>                              <div className="text-xs font-mono font-medium">{`DRP-${Math.floor(Math.random() * 900000) + 100000}`}</div>                            </div>                          </div>                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Navigation */}
            <div className="bg-card/50 px-6 py-4 flex items-center justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className={`rounded-md px-3 py-2 text-sm font-medium flex items-center ${
                  step === 1 
                    ? 'text-muted-foreground cursor-not-allowed' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                <ChevronLeftIcon className="mr-1 h-5 w-5" />
                Back
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 flex items-center"
                >
                  Next
                  <ChevronRightIcon className="ml-1 h-5 w-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="rounded-md bg-gradient-to-r from-gold-dark via-gold to-gold-light px-4 py-2 text-sm font-medium text-primary-foreground hover:shadow-md flex items-center"
                >
                  Complete Booking
                  <CheckIcon className="ml-1 h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}