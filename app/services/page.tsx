'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sun, Moon, Car, Plane, Users, Clock, Shield, Star, CheckCircle, ArrowRight, MapPin, Calendar, Phone } from 'lucide-react'
import { useTheme } from '../providers/ThemeProvider'
import { useTranslation } from '@/lib/i18n/TranslationContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ServicesPage() {
  const { darkMode, toggleDarkMode } = useTheme()
  const { t } = useTranslation()

  const getMainServices = () => [
    {
      id: 'airport-transfers',
      name: t('services.mainServices.airportTransfers.name'),
      description: t('services.mainServices.airportTransfers.description'),
      icon: Plane,
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1000&auto=format&fit=crop',
      features: [
        t('services.mainServices.airportTransfers.features.flightTracking'),
        t('services.mainServices.airportTransfers.features.meetGreet'),
        t('services.mainServices.airportTransfers.features.waitingTime'),
        t('services.mainServices.airportTransfers.features.terminalPickup'),
        t('services.mainServices.airportTransfers.features.luggageAssistance'),
        t('services.mainServices.airportTransfers.features.availability')
      ],
      price: 'From 850 MAD',
      duration: t('services.mainServices.airportTransfers.duration')
    },
    {
      id: 'city-tours',
      name: t('services.mainServices.cityTours.name'),
      description: t('services.mainServices.cityTours.description'),
      icon: MapPin,
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d4d795?q=80&w=1000&auto=format&fit=crop',
      features: [
        t('services.mainServices.cityTours.features.customItineraries'),
        t('services.mainServices.cityTours.features.multilingualGuides'),
        t('services.mainServices.cityTours.features.historicalInsights'),
        t('services.mainServices.cityTours.features.photoStops'),
        t('services.mainServices.cityTours.features.flexibleTiming'),
        t('services.mainServices.cityTours.features.localRecommendations')
      ],
      price: 'From 1200 MAD',
      duration: t('services.mainServices.cityTours.duration')
    },
    {
      id: 'corporate-travel',
      name: t('services.mainServices.corporateTravel.name'),
      description: t('services.mainServices.corporateTravel.description'),
      icon: Users,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
      features: [
        t('services.mainServices.corporateTravel.features.executiveService'),
        t('services.mainServices.corporateTravel.features.flexibleScheduling'),
        t('services.mainServices.corporateTravel.features.corporateBilling'),
        t('services.mainServices.corporateTravel.features.multiplePickups'),
        t('services.mainServices.corporateTravel.features.privacyGuaranteed'),
        t('services.mainServices.corporateTravel.features.wifiCharging')
      ],
      price: 'From 950 MAD',
      duration: t('services.mainServices.corporateTravel.duration')
    },
    {
      id: 'wedding-services',
      name: t('services.mainServices.weddingServices.name'),
      description: t('services.mainServices.weddingServices.description'),
      icon: Star,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
      features: [
        t('services.mainServices.weddingServices.features.bridalTransport'),
        t('services.mainServices.weddingServices.features.guestShuttle'),
        t('services.mainServices.weddingServices.features.decoratedVehicles'),
        t('services.mainServices.weddingServices.features.professionalCoordination'),
        t('services.mainServices.weddingServices.features.flexiblePackages'),
        t('services.mainServices.weddingServices.features.photographyAssistance')
      ],
      price: 'From 1800 MAD',
      duration: t('services.mainServices.weddingServices.duration')
    },
    {
      id: 'vip-transport',
      name: t('services.mainServices.vipTransport.name'),
      description: t('services.mainServices.vipTransport.description'),
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop',
      features: [
        t('services.mainServices.vipTransport.features.maximumPrivacy'),
        t('services.mainServices.vipTransport.features.securityCoordination'),
        t('services.mainServices.vipTransport.features.routePlanning'),
        t('services.mainServices.vipTransport.features.personalConcierge'),
        t('services.mainServices.vipTransport.features.luxuryAmenities'),
        t('services.mainServices.vipTransport.features.redCarpetService')
      ],
      price: 'From 2500 MAD',
      duration: t('services.mainServices.vipTransport.duration')
    },
    {
      id: 'long-distance',
      name: t('services.mainServices.longDistance.name'),
      description: t('services.mainServices.longDistance.description'),
      icon: Car,
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop',
      features: [
        t('services.mainServices.longDistance.features.intercityTransport'),
        t('services.mainServices.longDistance.features.comfortStops'),
        t('services.mainServices.longDistance.features.scenicRoutes'),
        t('services.mainServices.longDistance.features.multipleDays'),
        t('services.mainServices.longDistance.features.hotelCoordination'),
        t('services.mainServices.longDistance.features.culturalInsights')
      ],
      price: 'From 2000 MAD',
      duration: t('services.mainServices.longDistance.duration')
    }
  ]

  const getAdditionalServices = () => [
    {
      name: t('services.additionalServices.personalShopping.name'),
      description: t('services.additionalServices.personalShopping.description')
    },
    {
      name: t('services.additionalServices.eventTransport.name'),
      description: t('services.additionalServices.eventTransport.description')
    },
    {
      name: t('services.additionalServices.medicalAppointments.name'),
      description: t('services.additionalServices.medicalAppointments.description')
    },
    {
      name: t('services.additionalServices.culturalExcursions.name'),
      description: t('services.additionalServices.culturalExcursions.description')
    },
    {
      name: t('services.additionalServices.golfTransport.name'),
      description: t('services.additionalServices.golfTransport.description')
    },
    {
      name: t('services.additionalServices.conciergeServices.name'),
      description: t('services.additionalServices.conciergeServices.description')
    }
  ]

  const mainServices = getMainServices()
  const additionalServices = getAdditionalServices()

  const [selectedService, setSelectedService] = useState(mainServices[0])

  useEffect(() => {
    setSelectedService(mainServices[0])
  }, [t])

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-4">
          <Link
            href="/"
            className="rounded-md bg-card border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent flex items-center whitespace-nowrap min-w-[120px] justify-center order-1 group"
          >
            <ArrowLeft className="h-6 w-6 sm:h-10 sm:w-10 mr-2 text-gold" aria-hidden="true" />
            <span>{t('services.backToHome')}</span>
          </Link>
          
          <div className="text-center w-full sm:flex-grow order-3 sm:order-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {t('services.title').split(' ').slice(0, -1).join(' ')} <span className="accent-gold">{t('services.title').split(' ').slice(-1)}</span>
            </h1>
            <p className="mt-2 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
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

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {mainServices.map((service) => (
            <Card 
              key={service.id} 
              className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                selectedService.id === service.id ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => setSelectedService(service)}
            >
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <service.icon className="h-8 w-8" />
                    <Badge variant="secondary" className="bg-white/90 text-black">
                      {service.price}
                    </Badge>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                  {service.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{service.duration}</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-primary">{t('services.learnMore')}</span>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Details Section */}
        {selectedService && (
          <div className="bg-card rounded-2xl border border-border p-8 mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <selectedService.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">{selectedService.name}</h2>
                    <div className="flex items-center gap-4 mt-1">
                      <Badge variant="outline">{selectedService.price}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {selectedService.duration}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {selectedService.description}
                </p>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">{t('services.keyFeatures')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedService.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src={selectedService.image}
                  alt={selectedService.name}
                  className="w-full h-full object-cover rounded-lg min-h-[300px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-lg" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-3">
                    <Link
                      href={`/booking?service=${selectedService.id}`}
                      className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-md font-medium text-center hover:bg-primary/90 transition-colors"
                    >
                      {t('services.bookThisService')}
                    </Link>
                    <Link
                      href="/contact"
                      className="flex-1 bg-white/90 text-black px-4 py-3 rounded-md font-medium text-center hover:bg-white transition-colors"
                    >
                      {t('services.getQuote')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-4">
            {t('services.additionalServicesTitle')}
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            {t('services.additionalServicesSubtitle')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-foreground">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Our Services */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-foreground mb-4">
              {t('services.whyChooseTitle')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('services.whyChooseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('services.reliability')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('services.reliabilityDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('services.excellence')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('services.excellenceDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('services.experience')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('services.experienceDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t('services.availability')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('services.availabilityDesc')}
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {t('services.bookYourService')}
              </Link>
              <Link
                href="/contact"
                className="bg-card border border-border text-foreground px-6 py-3 rounded-md font-medium hover:bg-accent transition-colors flex items-center justify-center"
              >
                <Phone className="mr-2 h-4 w-4" />
                {t('services.contactForQuote')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}