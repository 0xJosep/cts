'use client'

import Link from 'next/link'
import { CalendarIcon, CheckCircleIcon, ClockIcon, MapPinIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { useTheme } from '../../providers/ThemeProvider'

export default function ConfirmationPage() {
  const { darkMode, toggleDarkMode } = useTheme()

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

      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        <div className="flex justify-end mb-6">
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

        <div className="rounded-lg bg-card shadow overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                Booking Confirmed!
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Thank you for choosing our luxury transportation service
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-medium text-foreground">Booking Details</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <MapPinIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-foreground">Route</h3>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <p className="mb-1">From: La Mamounia Marrakech</p>
                      <p>To: Marrakech Menara Airport</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CalendarIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-foreground">Date & Time</h3>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <p className="mb-1">Date: July 15, 2024</p>
                      <p>Time: 10:30 AM</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ClockIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-foreground">Service Details</h3>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <p className="mb-1">Service: Executive Sedan</p>
                      <p>Passengers: 2</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-foreground">Payment</h3>
                    <div className="mt-1 text-sm text-muted-foreground">
                      <p className="mb-1">Total: 950 MAD</p>
                      <p>Status: To be paid on arrival</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6">
              <div className="rounded-md bg-accent/50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-foreground">Important Information</h3>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <ul className="list-disc space-y-1 pl-5">
                        <li>A confirmation email has been sent to your email address</li>
                        <li>Your chauffeur will meet you at the specified location</li>
                        <li>For any changes, please contact us at least 6 hours before pickup</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link
                href="/"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 