'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Sun, Moon, ArrowLeft } from 'lucide-react'
import { useTheme } from '../providers/ThemeProvider'
import { useTranslation } from '../../lib/i18n/TranslationContext'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function FleetPage() {
  const { t } = useTranslation()
  const { darkMode, toggleDarkMode } = useTheme()

  // Create vehicles array with the actual fleet
  const vehicles = [
    {
      id: 'range-rover-vogue',
      name: 'Range Rover Vogue',
      description: 'The epitome of luxury and performance, offering unparalleled comfort and presence for executive travel.',
      image: '/images/fleet/range-rover.png',
      price: 'From 1850 MAD',
      passengers: '1-4',
      luggage: '4 large suitcases',
      features: [
        'Premium leather seats with massage function',
        'Panoramic sunroof',
        'Advanced climate control',
        'Premium sound system',
        'WiFi connectivity',
        'Professional chauffeur',
        'Privacy glass',
        'Complimentary refreshments'
      ],
      idealFor: [
        'Executive travel',
        'VIP transport',
        'Special occasions'
      ]
    },
    {
      id: 'mercedes-class-e',
      name: 'Mercedes Class E',
      description: 'Sophisticated elegance meets cutting-edge technology in this premium business sedan.',
      image: '/images/fleet/mercedec-class-E.jpeg',
      price: 'From 1200 MAD',
      passengers: '1-3',
      luggage: '3 medium suitcases',
      features: [
        'Premium leather interior',
        'Advanced safety systems',
        'Climate control',
        'Premium audio system',
        'WiFi available',
        'Professional chauffeur',
        'Privacy glass',
        'Complimentary water'
      ],
      idealFor: [
        'Business travel',
        'Airport transfers',
        'City tours'
      ]
    },
    {
      id: 'mercedes-class-s',
      name: 'Mercedes Class S',
      description: 'The pinnacle of luxury sedans, delivering exceptional comfort and prestige for discerning travelers.',
      image: '/images/fleet/mercedes-class-S.png',
      price: 'From 1650 MAD',
      passengers: '1-3',
      luggage: '3 large suitcases',
      features: [
        'Executive leather seats with massage',
        'Advanced infotainment system',
        'Multi-zone climate control',
        'Premium Burmester sound system',
        'WiFi connectivity',
        'Professional chauffeur',
        'Privacy partition available',
        'Premium refreshment service'
      ],
      idealFor: [
        'Executive travel',
        'VIP occasions',
        'Luxury events'
      ]
    },
    {
      id: 'mercedes-v-vito',
      name: 'Mercedes Class V Vito',
      description: 'Spacious and comfortable van perfect for small group transportation with premium amenities.',
      image: '/images/fleet/mercredes-vito.png',
      price: 'From 1100 MAD',
      passengers: '1-6',
      luggage: '6 medium suitcases',
      features: [
        'Comfortable seating configuration',
        'Air conditioning',
        'Individual climate control',
        'Entertainment system',
        'USB charging ports',
        'Professional chauffeur',
        'Ample luggage space',
        'Complimentary refreshments'
      ],
      idealFor: [
        'Group travel',
        'Family trips',
        'Corporate shuttles'
      ]
    },
    {
      id: 'mercedes-v-viano',
      name: 'Mercedes Class V Viano',
      description: 'Premium MPV offering luxurious group travel with sophisticated comfort and style.',
      image: '/images/fleet/mercedes-viano.jpeg',
      price: 'From 1300 MAD',
      passengers: '1-7',
      luggage: '7 medium suitcases',
      features: [
        'Premium leather seating',
        'Individual captain chairs',
        'Advanced climate control',
        'Entertainment screens',
        'WiFi connectivity',
        'Professional chauffeur',
        'Privacy glass',
        'Refreshment service'
      ],
      idealFor: [
        'Executive groups',
        'Family luxury travel',
        'Corporate events'
      ]
    },
    {
      id: 'mercedes-sprinter-17',
      name: 'Mercedes Sprinter',
      description: 'Spacious and comfortable minibus ideal for larger group transportation with premium features.',
      image: '/images/fleet/mercedes-sprinter.jpeg',
      price: 'From 1800 MAD',
      passengers: '1-17',
      luggage: '17 medium suitcases',
      features: [
        'Comfortable passenger seating',
        'Air conditioning throughout',
        'Entertainment system',
        'USB charging stations',
        'Large luggage compartment',
        'Professional driver',
        'Safety equipment',
        'Refreshment service'
      ],
      idealFor: [
        'Group excursions',
        'Corporate shuttles',
        'Team travel'
      ]
    },
    {
      id: 'audi-a6',
      name: 'Audi A6',
      description: 'German engineering excellence with sophisticated design and premium comfort features.',
      image: '/images/fleet/audi-a6.jpeg',
      price: 'From 1150 MAD',
      passengers: '1-3',
      luggage: '3 medium suitcases',
      features: [
        'Premium leather interior',
        'Virtual cockpit display',
        'Quattro all-wheel drive',
        'Advanced driver assistance',
        'WiFi hotspot',
        'Professional chauffeur',
        'Climate control',
        'Complimentary amenities'
      ],
      idealFor: [
        'Business travel',
        'Executive transport',
        'Airport transfers'
      ]
    },
    {
      id: 'toyota-land-cruiser',
      name: 'Toyota Land Cruiser',
      description: 'Robust luxury SUV perfect for both city travel and adventurous excursions with unmatched reliability.',
      image: '/images/fleet/toyota.jpeg',
      price: 'From 1400 MAD',
      passengers: '1-7',
      luggage: '7 medium suitcases',
      features: [
        'Premium leather seating',
        'All-terrain capability',
        'Advanced 4WD system',
        'Climate control',
        'Entertainment system',
        'Professional chauffeur',
        'Safety features',
        'Refreshment service'
      ],
      idealFor: [
        'Desert excursions',
        'Mountain trips',
        'Adventure travel'
      ]
    },
    {
      id: 'kia-sorento',
      name: 'Kia Sorento',
      description: 'Modern and reliable SUV offering comfortable travel with contemporary features and excellent value.',
      image: '/images/fleet/kia-sorrento.jpeg',
      price: 'From 950 MAD',
      passengers: '1-5',
      luggage: '5 medium suitcases',
      features: [
        'Comfortable cloth/leather seating',
        'Modern infotainment system',
        'Dual-zone climate control',
        'Safety features',
        'USB connectivity',
        'Professional driver',
        'Ample cargo space',
        'Complimentary water'
      ],
      idealFor: [
        'Family travel',
        'City tours',
        'Airport transfers'
      ]
    },
    {
      id: 'bus-king-long-48',
      name: 'Bus King Long',
      description: 'Large capacity luxury coach perfect for group tours and events with premium comfort features.',
      image: '/images/fleet/bus.jpeg',
      price: 'From 2800 MAD',
      passengers: '1-48',
      luggage: '48 medium suitcases',
      features: [
        'Comfortable reclining seats',
        'Air conditioning system',
        'Entertainment system',
        'Onboard restroom',
        'Large luggage compartments',
        'Professional driver',
        'Safety equipment',
        'Refreshment service'
      ],
      idealFor: [
        'Large group tours',
        'Corporate events',
        'Extended excursions'
      ]
    }
  ]

  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0])

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
            <ArrowLeft className="h-6 w-6 sm:h-10 sm:w-10 mr-2 text-gold" aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-center w-full sm:flex-grow order-3 sm:order-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Our Premium <span className="accent-gold">Fleet</span>
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
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
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
                    <Check className="h-5 w-5 text-primary" />
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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Vehicle details */}
          <div className="md:col-span-3 bg-card rounded-xl overflow-hidden border border-border">
            <div className="h-96 sm:h-[28rem] overflow-hidden relative">
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
                    {selectedVehicle.idealFor.map((item, idx) => (
                      <li key={idx}>• {item}</li>
                    ))}
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
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 