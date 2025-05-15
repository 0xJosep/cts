'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CalendarIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, MapPinIcon, UserIcon, UsersIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import './booking.css'
import { useTheme } from '../providers/ThemeProvider'

export default function BookingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const { darkMode, toggleDarkMode } = useTheme()
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    setStep(prev => Math.min(prev + 1, 3))
  }

  const prevStep = () => {
    setStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission, e.g., send data to backend
    console.log('Booking submitted:', formData)
    // Navigate to confirmation page
    router.push('/booking/confirmation')
  }

  const selectService = (service: string) => {
    setFormData(prev => ({ ...prev, service }))
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
        <div className="flex justify-between items-center mb-12">
          <Link
            href="/"
            className="rounded-md bg-card border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent flex items-center whitespace-nowrap min-w-[120px] justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          
          <div className="text-center flex-grow">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Book Your <span className="accent-gold">Luxury Experience</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Complete the form below to reserve your premium transportation
            </p>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors bg-card border border-border"
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
                <CalendarIcon className="h-5 w-5" />
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
        <form onSubmit={handleSubmit} className="w-full">
          <div className="overflow-hidden rounded-lg bg-card shadow w-full">
            {/* Step 1: Trip Details */}
            <div className={step === 1 ? 'block' : 'hidden'}>
              <div className="p-6">
                <h2 className="text-lg font-medium text-foreground">Trip Details</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tell us about your journey
                </p>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-foreground">
                      Pickup Location
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="pickupLocation"
                        id="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        placeholder="Enter address, hotel, or airport"
                        required
                      />
                    </div>
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
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        placeholder="Enter destination address or location"
                        required
                      />
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
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="date" className="block text-sm font-medium text-foreground">
                      Date
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="time" className="block text-sm font-medium text-foreground">
                      Time
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type="time"
                        name="time"
                        id="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        required
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ClockIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="passengers" className="block text-sm font-medium text-foreground">
                      Passengers
                    </label>
                    <div className="mt-1 relative">
                      <select
                        name="passengers"
                        id="passengers"
                        value={formData.passengers}
                        onChange={handleChange}
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        required
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        required
                      />
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
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        required
                      />
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
                        className="block w-full rounded-md border-border bg-background px-4 py-3 shadow-sm focus:border-primary focus:ring-primary booking-input"
                        required
                      />
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
                    <div className="rounded-md bg-muted/50 p-4">
                      <div className="flex">
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-foreground">Booking Summary</h3>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>Service: {formData.service === 'sedan' ? 'Executive Sedan' : 
                              formData.service === 'suv' ? 'Luxury SUV' : 
                              formData.service === 'van' ? 'Premium Van' : 'Stretch Limousine'}</p>
                            <p className="mt-1">Passengers: {formData.passengers}</p>
                            <p className="mt-1">From: {formData.pickupLocation || '(Not specified)'}</p>
                            <p className="mt-1">To: {formData.dropoffLocation || '(Not specified)'}</p>
                            <p className="mt-1">Date: {formData.date || '(Not specified)'}</p>
                            <p className="mt-1">Time: {formData.time || '(Not specified)'}</p>
                          </div>
                        </div>
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