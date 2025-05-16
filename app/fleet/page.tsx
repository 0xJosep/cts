'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { useTheme } from '../providers/ThemeProvider'
import Image from 'next/image'

const vehicles = [
  {
    id: 'sedan',
    name: 'Executive Sedan',
    description: 'Perfect for business travel and airport transfers, our executive sedans offer premium comfort for up to 3 passengers.',
    image: 'https://images.unsplash.com/photo-1549399542-7e38945b4d69?q=80&w=1000&auto=format&fit=crop',
    price: 'From 850 MAD',
    passengers: '1-3',
    luggage: '3 medium suitcases',
    features: [
      'Premium leather seats',
      'Privacy glass',
      'Climate control',
      'Complimentary water and refreshments',
      'WiFi available',
      'Professional chauffeur'
    ]
  },
  {
    id: 'suv',
    name: 'Luxury SUV',
    description: 'Combining style and space, our luxury SUVs provide ample room for up to 5 passengers with extra luggage capacity.',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop',
    price: 'From 1250 MAD',
    passengers: '1-5',
    luggage: '5 medium suitcases',
    features: [
      'Premium leather seats',
      'Privacy glass',
      'Climate control',
      'Complimentary water and refreshments',
      'WiFi available',
      'Professional chauffeur',
      'Additional legroom'
    ]
  },
  {
    id: 'van',
    name: 'Premium Van',
    description: 'Ideal for group travel, our premium vans offer spacious comfort for up to 8 passengers with generous luggage space.',
    image: 'https://images.unsplash.com/photo-1622559924472-2c2adb3f3abd?q=80&w=1000&auto=format&fit=crop',
    price: 'From 1450 MAD',
    passengers: '1-8',
    luggage: '8 medium suitcases',
    features: [
      'Premium leather seats',
      'Privacy glass',
      'Climate control',
      'Complimentary water and refreshments',
      'WiFi available',
      'Professional chauffeur',
      'Individual seating',
      'Extra-large luggage capacity'
    ]
  },
  {
    id: 'limousine',
    name: 'Stretch Limousine',
    description: 'Make a statement with our premium stretch limousines, perfect for VIP travel, special occasions, and high-profile events.',
    image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?q=80&w=1000&auto=format&fit=crop',
    price: 'From 2200 MAD',
    passengers: '1-6',
    luggage: '4 medium suitcases',
    features: [
      'Premium leather seating',
      'Privacy partition',
      'Advanced climate control',
      'Premium refreshment bar',
      'Entertainment system',
      'WiFi and charging ports',
      'Professional chauffeur',
      'Red carpet service available'
    ]
  }
]

export default function FleetPage() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0])
  const { darkMode, toggleDarkMode } = useTheme()

  return (
    <div className="relative bg-background py-16 sm:py-24 pb-24 min-h-screen">
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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-4">
          <Link
            href="/"
            className="rounded-md bg-card border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent flex items-center whitespace-nowrap min-w-[120px] justify-center order-1 group"
          >
            <ArrowLeftIcon className="h-6 w-6 sm:h-10 sm:w-10 mr-2 text-gold" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center w-full sm:flex-grow order-3 sm:order-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Our <span className="accent-gold">Premium</span> Fleet
            </h1>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience Morocco in style with our meticulously maintained collection of luxury vehicles
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Vehicle selector */}
          <div className="md:col-span-1 space-y-3 mb-6 md:mb-0">
            <h2 className="text-lg font-medium text-foreground mb-4">Select a Vehicle</h2>
            {vehicles.map(vehicle => (
              <div
                key={vehicle.id}
                className={`p-4 rounded-lg cursor-pointer transition-all ${
                  selectedVehicle.id === vehicle.id 
                    ? 'bg-primary/10 border border-primary' 
                    : 'bg-card hover:bg-accent border border-border'
                }`}
                onClick={() => setSelectedVehicle(vehicle)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-foreground">{vehicle.name}</h3>
                  {selectedVehicle.id === vehicle.id && (
                    <CheckIcon className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{vehicle.price}</p>
              </div>
            ))}
            
            <div className="pt-4">
              <Link
                href="/booking"
                className="w-full inline-flex justify-center items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Book Now
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Vehicle details */}
          <div className="md:col-span-3 bg-card rounded-xl overflow-hidden border border-border">
            <div className="h-48 sm:h-64 overflow-hidden relative">
              <Image
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                className="w-full h-full object-cover"
                width={800}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h2 className="text-2xl font-semibold">{selectedVehicle.name}</h2>
                  <p className="text-white/80 text-lg">{selectedVehicle.price}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <p className="text-muted-foreground">{selectedVehicle.description}</p>
              
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-accent/50 p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Capacity</h3>
                  <div className="flex items-center text-muted-foreground">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{selectedVehicle.passengers} passengers</span>
                  </div>
                  <div className="flex items-center text-muted-foreground mt-2">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m-6-8h6M3 9l9-6 9 6m-1.5 12V10.5L12 6 3.5 10.5V21.75l9-6 9.75 6" />
                    </svg>
                    <span>{selectedVehicle.luggage}</span>
                  </div>
                </div>
                
                <div className="bg-accent/50 p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-2">Ideal For</h3>
                  <ul className="text-muted-foreground space-y-1">
                    {selectedVehicle.id === 'sedan' && (
                      <>
                        <li>• Airport transfers</li>
                        <li>• Business travel</li>
                        <li>• City tours</li>
                      </>
                    )}
                    {selectedVehicle.id === 'suv' && (
                      <>
                        <li>• Family travel</li>
                        <li>• Executive groups</li>
                        <li>• Extended tours</li>
                      </>
                    )}
                    {selectedVehicle.id === 'van' && (
                      <>
                        <li>• Group travel</li>
                        <li>• Corporate events</li>
                        <li>• Multi-day excursions</li>
                      </>
                    )}
                    {selectedVehicle.id === 'limousine' && (
                      <>
                        <li>• VIP transport</li>
                        <li>• Special occasions</li>
                        <li>• Luxury events</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6">
                <h3 className="font-medium text-foreground mb-2">Premium Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-2 sm:mt-3">
                  {selectedVehicle.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-gold flex-shrink-0 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-6 sm:mt-8 flex justify-end">
                <Link
                  href={`/booking?service=${selectedVehicle.id}`}
                  className="rounded-md bg-gradient-to-r from-gold-dark via-gold to-gold-light px-4 py-2 text-sm font-medium text-primary-foreground hover:shadow-md flex items-center"
                >
                  Book this Vehicle
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 