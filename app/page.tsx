'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useTheme } from './providers/ThemeProvider'
import { useTranslation } from '@/lib/i18n/TranslationContext'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
]

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Fleet', href: '/fleet' },
  { name: 'Services', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(languages.find(lang => lang.code === locale) || languages[0])
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrolled])

  const selectLanguage = (language: {code: string, name: string, flag: string}) => {
    setCurrentLanguage(language)
    if (language.code === 'en' || language.code === 'es') {
      setLocale(language.code)
    } else {
      // For languages not yet supported, default to English
      setLocale('en')
    }
    setLanguageMenuOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Gradient */}
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">Luxury Transport</span>
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors relative group px-2 py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-4 lg:flex-1 lg:justify-end">
            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur-sm px-3 py-1.5 text-foreground hover:bg-accent hover:border-primary transition-all"
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                aria-expanded={languageMenuOpen}
              >
                <span className="text-xl" aria-hidden="true">{currentLanguage.flag}</span>
                <span className="sr-only">Select language: {currentLanguage.name}</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${languageMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
              
              {/* Language dropdown */}
              {languageMenuOpen && (
                <div className="absolute right-0 mt-2 origin-top-right rounded-md bg-card shadow-lg ring-1 ring-border focus:outline-none z-10 animate-in fade-in-50 slide-in-from-top-5 duration-150">
                  <div className="py-1">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => selectLanguage(language)}
                        className="flex w-full items-center justify-between gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="text-xl">{language.flag}</span>
                        {currentLanguage.code === language.code && (
                          <CheckIcon className="h-4 w-4 text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={toggleDarkMode}
                className="rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <SunIcon className="size-5" />
                ) : (
                  <MoonIcon className="size-5" />
                )}
              </button>
            </div>
            
            <a
              href="/booking"
              className="hidden lg:block rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Book Now
            </a>
            
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-foreground"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <img
                  alt="Logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-foreground"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6 space-y-3">
                  {/* Language options in mobile menu */}
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Language</p>
                    <div className="flex gap-3">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => selectLanguage(language)}
                          className={`flex items-center justify-center h-10 w-10 rounded-full text-xl ${
                            currentLanguage.code === language.code 
                              ? 'ring-2 ring-primary bg-accent/30' 
                              : 'hover:bg-accent'
                          }`}
                          aria-label={`Switch to ${language.name}`}
                        >
                          {language.flag}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button
                      onClick={toggleDarkMode}
                      className="rounded-full p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? (
                        <SunIcon className="size-5" />
                      ) : (
                        <MoonIcon className="size-5" />
                      )}
                    </button>
                  </div>
                  
                  <a
                    href="/booking"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-foreground ring-1 ring-border hover:ring-primary transition-all">
              Discover Morocco in depth {' '}
              <a href="#" className="font-semibold text-primary">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl relative">
              The Art of <span className="accent-gold">Exceptional</span> Travel
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 w-24 gold-gradient"></span>
            </h1>
            <p className="mt-10 text-lg font-light text-pretty text-muted-foreground sm:text-xl/8 animate-fade-up tracking-wide" style={{ animationDelay: '0.3s' }}>
              For over 10 years, we've been the choice of executives, celebrities, and travelers who demand the finest. Our world-class chauffeurs and luxury fleet deliver more than transportation – we provide peace of mind, privacy, and prestige with every journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <a
                href="/booking"
                className="rounded-md bg-gradient-to-r from-gold-dark via-gold to-gold-light px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold clickable"
              >
                Book now
              </a>
              <a href="#" className="text-sm/6 font-semibold text-foreground hover:text-primary transition-colors clickable">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Key Features & Benefits Section */}
      <div className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl relative inline-block">
              Unparalleled Luxury & Service
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 w-16 gold-gradient"></span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Experience the perfect blend of comfort, style, and exceptional service
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative flex flex-col rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Expert Chauffeurs</h3>
              <p className="mt-4 text-muted-foreground">
                Our professional chauffeurs are extensively trained in luxury service, local knowledge, and discreet professionalism.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>Multilingual expertise</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>Discrete & professional</span>
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="relative flex flex-col rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Premium Fleet</h3>
              <p className="mt-4 text-muted-foreground">
                Travel in style with our meticulously maintained fleet of luxury vehicles, from executive sedans to spacious SUVs.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>Latest model vehicles</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>Complimentary amenities</span>
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="relative flex flex-col rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="absolute -top-4 -right-4 h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center">
                <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">Seamless Experience</h3>
              <p className="mt-4 text-muted-foreground">
                From booking to arrival, enjoy a flawless journey with our comprehensive concierge service and attention to detail.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>24/7 concierge support</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>Real-time tracking</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="relative py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Trusted by Travelers Worldwide
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of satisfied clients who have experienced our premium service
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Statistics */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
              <div className="text-4xl font-bold text-gold">10+</div>
              <div className="mt-2 text-lg font-medium text-foreground">Years of Excellence</div>
              <p className="mt-2 text-sm text-muted-foreground">Delivering premium travel experiences since 2014</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
              <div className="text-4xl font-bold text-gold">50k+</div>
              <div className="mt-2 text-lg font-medium text-foreground">Happy Clients</div>
              <p className="mt-2 text-sm text-muted-foreground">From executives to celebrities worldwide</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
              <div className="text-4xl font-bold text-gold">4.9/5</div>
              <div className="mt-2 text-lg font-medium text-foreground">Average Rating</div>
              <p className="mt-2 text-sm text-muted-foreground">Based on verified customer reviews</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="flex items-center gap-x-4">
                <img
                  className="h-10 w-10 rounded-full bg-muted"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div>
                  <div className="font-semibold text-foreground">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">CEO, TechCorp</div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                "The attention to detail and professionalism of their service is unmatched. Every journey feels like a VIP experience."
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
              <div className="flex items-center gap-x-4">
                <img
                  className="h-10 w-10 rounded-full bg-muted"
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <div>
                  <div className="font-semibold text-foreground">Michael Chen</div>
                  <div className="text-sm text-muted-foreground">International Business Traveler</div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                "Their fleet is immaculate, and the drivers are incredibly knowledgeable. They've become my go-to service for all my business trips."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="py-8 bg-background/50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-gold">Trusted By</h2>
            <p className="mt-1 text-lg font-medium text-muted-foreground">
              Partnering with Morocco's finest establishments
            </p>
          </div>
          <div className="relative mt-6">
            <div className="mx-auto max-w-5xl overflow-hidden">
              <div className="flex animate-scroll">
                <div className="flex items-center gap-24 shrink-0">
                  {/* First set of logos */}
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://mamounia.com/bundles/apiciuswebsite/images/logo-white.svg"
                    alt="La Mamounia Marrakech"
                    width={200}
                    height={60}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://www.movenpickmarrakech.com/wp-content/themes/movenpick-template/images/logo/movenpick_logo.png"
                    alt="Mövenpick Marrakech"
                    width={158}
                    height={48}
                  />
                  <img
                    className="h-16 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://www.essaadi.com/wp-content/themes/EsSaadi/img/logo.png.webp"
                    alt="Es Saadi Marrakech"
                    width={200}
                    height={64}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 max-w-[100px] dark:brightness-200 dark:invert-0 [filter:brightness(0)_contrast(200%)] hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://sofitel.accor.com/content/dam/brands/sof/global-marketing/brand-identity/logos/Logo%20Header.svg"
                    alt="Sofitel"
                    width={100}
                    height={48}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://agafaydesertluxurycamp.com/wp-content/uploads/2021/02/Agafay-luxury-camp-w.png"
                    alt="Agafay Desert Luxury Camp"
                    width={158}
                    height={48}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://image-tc.galaxy.tf/wisvg-aomm7yv3rx17ub9jxv1zz636r/kenzimenarapalace.svg"
                    alt="Kenzi Menara Palace"
                    width={158}
                    height={48}
                  />
                </div>
                <div className="flex items-center gap-24 shrink-0 pl-24">
                  {/* Duplicate set of logos */}
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://mamounia.com/bundles/apiciuswebsite/images/logo-white.svg"
                    alt="La Mamounia Marrakech"
                    width={200}
                    height={60}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://www.movenpickmarrakech.com/wp-content/themes/movenpick-template/images/logo/movenpick_logo.png"
                    alt="Mövenpick Marrakech"
                    width={158}
                    height={48}
                  />
                  <img
                    className="h-16 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://www.essaadi.com/wp-content/themes/EsSaadi/img/logo.png.webp"
                    alt="Es Saadi Marrakech"
                    width={200}
                    height={64}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 max-w-[100px] dark:brightness-200 dark:invert-0 [filter:brightness(0)_contrast(200%)] hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://sofitel.accor.com/content/dam/brands/sof/global-marketing/brand-identity/logos/Logo%20Header.svg"
                    alt="Sofitel"
                    width={100}
                    height={48}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://agafaydesertluxurycamp.com/wp-content/uploads/2021/02/Agafay-luxury-camp-w.png"
                    alt="Agafay Desert Luxury Camp"
                    width={158}
                    height={48}
                  />
                  <img
                    className="h-12 w-auto object-contain grayscale opacity-90 hover:opacity-100 transition-all duration-300 dark:brightness-200 invert dark:invert-0 hover:[filter:brightness(0)_contrast(200%)_sepia(100%)_saturate(1000%)_hue-rotate(0deg)_brightness(100%)] clickable"
                    src="https://image-tc.galaxy.tf/wisvg-aomm7yv3rx17ub9jxv1zz636r/kenzimenarapalace.svg"
                    alt="Kenzi Menara Palace"
                    width={158}
                    height={48}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate mt-16">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary/30 via-primary/20 to-secondary/30 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16 backdrop-blur-sm">
            {/* Decorative elements */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 mix-blend-multiply" />
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30"
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
              />
              <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative">
              <div className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium text-primary-foreground bg-primary/20 backdrop-blur-sm ring-1 ring-primary/30 mb-8">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                </span>
                Exclusive Experience
              </div>
              <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Elevate Your Journey in Morocco
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Experience the pinnacle of luxury transportation with our curated fleet of premium vehicles and dedicated chauffeurs, exclusively serving Morocco's most distinguished guests.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/booking"
                  className="group relative rounded-md bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary clickable"
                >
                  <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Reserve Your Experience</span>
                </a>
                <a
                  href="#"
                  className="group text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors clickable"
                >
                  Discover Our Fleet
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
                </a>
              </div>
              <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="flex items-center justify-center gap-x-3 rounded-xl bg-background/50 p-4 backdrop-blur-sm ring-1 ring-border/50">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-foreground clickable">Personal Concierge</span>
                </div>
                <div className="flex items-center justify-center gap-x-3 rounded-xl bg-background/50 p-4 backdrop-blur-sm ring-1 ring-border/50">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-foreground clickable">Bespoke Itineraries</span>
                </div>
                <div className="flex items-center justify-center gap-x-3 rounded-xl bg-background/50 p-4 backdrop-blur-sm ring-1 ring-border/50">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-foreground clickable">Elite Fleet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to know about our luxury transportation services
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  What types of vehicles do you offer?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our premium fleet includes executive sedans, luxury SUVs, and spacious vans. All vehicles are latest models, meticulously maintained, and equipped with premium amenities for your comfort.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  How far in advance should I book?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  While we can accommodate last-minute requests, we recommend booking at least 24 hours in advance to ensure availability and allow time for any special arrangements.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  What areas do you serve?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We provide luxury transportation services throughout Morocco, with special focus on major cities and tourist destinations. Our chauffeurs are experts in navigating both urban and rural routes.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  What is your cancellation policy?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer flexible cancellation policies. Cancellations made 24 hours before the scheduled service are fully refundable. For special events and peak seasons, please refer to your booking confirmation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg font-semibold">
                  Do you provide airport transfers?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes, we specialize in airport transfers with flight tracking and meet-and-greet services. Our chauffeurs monitor flight status to ensure timely pickup, regardless of delays.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-lg font-semibold">
                  What languages do your chauffeurs speak?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Our chauffeurs are fluent in multiple languages including English, French, Arabic, and Spanish. We ensure language compatibility for all our clients&apos; needs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Services</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Airport Transfers</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">City Tours</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Corporate Travel</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Wedding Services</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Company</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">About Us</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Our Fleet</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Contact</h3>
                <ul className="mt-4 space-y-4">
                  <li className="text-sm text-muted-foreground">Marrakech, Morocco</li>
                  <li className="text-sm text-muted-foreground">+212 6XX-XXXXXX</li>
                  <li className="text-sm text-muted-foreground">contact@luxurytransport.com</li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Luxury Transport Services. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

