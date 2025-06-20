'use client'

import { useState, useEffect } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Menu, X, Sun, Moon, ChevronDown, Check } from 'lucide-react'
import { useTheme } from './providers/ThemeProvider'
import { useTranslation } from '@/lib/i18n/TranslationContext'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import LanguageSwitcher from './components/LanguageSwitcher'

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
]

const getNavigation = (t: (key: string) => string) => [
  { name: t('common.home'), href: '/' },
  { name: t('common.fleet'), href: '/fleet' },
  { name: t('common.services'), href: '/services' },
  { name: t('common.about'), href: '#' },
  { name: t('common.contact'), href: '/contact' },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const { locale, setLocale, t } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(languages.find(lang => lang.code === locale) || languages[0])
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  // Update currentLanguage when locale changes
  useEffect(() => {
    const langObj = languages.find(lang => lang.code === locale)
    if (langObj) {
      setCurrentLanguage(langObj)
    }
  }, [locale])

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
    if (language.code === 'en' || language.code === 'es' || language.code === 'fr') {
      setLocale(language.code as 'en' | 'es' | 'fr')
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
            <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">CTS Luxury Transport</span>
              <img
                alt="CTS Logo"
                src="/logo-cts-sharpened.png"
                className="h-10 w-auto"
              />
            </a>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {getNavigation(t).map((item) => (
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
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${languageMenuOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
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
                          <Check className="h-4 w-4 text-primary" />
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
                  <Sun className="size-5" />
                ) : (
                  <Moon className="size-5" />
                )}
              </button>
            </div>
            
            <a
              href="/booking"
              className="hidden lg:block rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t('common.booking')}
            </a>
            
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-full p-2.5 text-foreground"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="size-6" />
              </button>
            </div>
          </div>
        </nav>
        
        {/* Mobile menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right" className="w-full overflow-y-auto bg-background px-6 py-6 sm:max-w-sm">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                <img
                  alt="CTS Logo"
                  src="/logo-cts-sharpened.png"
                  className="h-8 w-auto"
                />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-full p-2.5 text-foreground"
              >
                <span className="sr-only">Close menu</span>
                <X className="size-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {getNavigation(t).map((item) => (
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
                        <Sun className="size-5" />
                      ) : (
                        <Moon className="size-5" />
                      )}
                    </button>
                  </div>
                  
                  <a
                    href="/booking"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {t('common.booking')}
                  </a>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
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
              {t('home.hero.discoverMorocco')} {' '}
              <a href="#" className="font-semibold text-primary">
                <span aria-hidden="true" className="absolute inset-0" />
                {t('home.hero.readMore')} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>

          </div>
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl relative">
              {t('home.hero.title')}
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-0.5 w-24 gold-gradient"></span>
            </h1>
            <p className="mt-10 text-lg font-light text-pretty text-muted-foreground sm:text-xl/8 animate-fade-up tracking-wide" style={{ animationDelay: '0.3s' }}>
              {t('home.hero.subtitle')}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <a
                href="/booking"
                className="rounded-md bg-gradient-to-r from-gold-dark via-gold to-gold-light px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold clickable"
              >
                {t('common.booking')}
              </a>
              <a href="#" className="text-sm/6 font-semibold text-foreground hover:text-primary transition-colors clickable">
                {t('home.hero.learnMore')} <span aria-hidden="true">→</span>
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
              {t('home.features.title')}
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 w-16 gold-gradient"></span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              {t('home.features.subtitle')}
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
              <h3 className="text-xl font-semibold text-foreground">{t('home.features.expertChauffeurs.title')}</h3>
              <p className="mt-4 text-muted-foreground">
                {t('home.features.expertChauffeurs.description')}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{t('home.features.expertChauffeurs.multilingual')}</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{t('home.features.expertChauffeurs.discrete')}</span>
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
              <h3 className="text-xl font-semibold text-foreground">{t('home.features.premiumFleet.title')}</h3>
              <p className="mt-4 text-muted-foreground">
                {t('home.features.premiumFleet.description')}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{t('home.features.premiumFleet.latestModels')}</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{t('home.features.premiumFleet.amenities')}</span>
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
              <h3 className="text-xl font-semibold text-foreground">{t('home.features.seamlessExperience.title')}</h3>
              <p className="mt-4 text-muted-foreground">
                {t('home.features.seamlessExperience.description')}
              </p>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{t('home.features.seamlessExperience.support')}</span>
                </li>
                <li className="flex items-center gap-x-2">
                  <svg className="h-4 w-4 text-gold" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span>{t('home.features.seamlessExperience.tracking')}</span>
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
              {t('home.socialProof.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.socialProof.subtitle')}
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Statistics */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
              <div className="text-4xl font-bold text-gold">10+</div>
              <div className="mt-2 text-lg font-medium text-foreground">{t('home.socialProof.yearsExperience')}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t('home.socialProof.yearsDesc')}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
              <div className="text-4xl font-bold text-gold">50k+</div>
              <div className="mt-2 text-lg font-medium text-foreground">{t('home.socialProof.clients')}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t('home.socialProof.clientsDesc')}</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-card p-8 text-center shadow-sm ring-1 ring-border">
              <div className="text-4xl font-bold text-gold">4.9/5</div>
              <div className="mt-2 text-lg font-medium text-foreground">{t('home.socialProof.rating')}</div>
              <p className="mt-2 text-sm text-muted-foreground">{t('home.socialProof.ratingDesc')}</p>
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
                  <div className="font-semibold text-foreground">{t('home.testimonials.sarah.name')}</div>
                  <div className="text-sm text-muted-foreground">{t('home.testimonials.sarah.title')}</div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                "{t('home.testimonials.sarah.quote')}"
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
                  <div className="font-semibold text-foreground">{t('home.testimonials.michael.name')}</div>
                  <div className="text-sm text-muted-foreground">{t('home.testimonials.michael.title')}</div>
                </div>
              </div>
              <p className="mt-4 text-muted-foreground">
                "{t('home.testimonials.michael.quote')}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="py-8 bg-background/50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-gold">{t('home.trustedBy.title')}</h2>
            <p className="mt-1 text-lg font-medium text-muted-foreground">
              {t('home.trustedBy.subtitle')}
            </p>
          </div>
          <div className="relative mt-6">
            <Marquee speed="normal" gap="6rem" className="mx-auto max-w-5xl">
              <div className="flex items-center gap-24">
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
            </Marquee>
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
                {t('home.cta.title')}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                {t('home.cta.subtitle')}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="/booking"
                  className="group relative rounded-md bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary clickable"
                >
                  <span className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">{t('home.cta.reserve')}</span>
                </a>
                <a
                  href="#"
                  className="group text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors clickable"
                >
                  {t('home.cta.discover')}
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
              {t('home.faq.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.faq.subtitle')}
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('home.faq.vehicles.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('home.faq.vehicles.answer')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('home.faq.booking.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('home.faq.booking.answer')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('home.faq.coverage.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('home.faq.coverage.answer')}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg font-semibold">
                  {t('home.faq.cancellation.question')}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t('home.faq.cancellation.answer')}
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
                <h3 className="text-sm font-semibold text-foreground">{t('footer.services.title')}</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.services.airport')}</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.services.tours')}</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.services.corporate')}</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.services.wedding')}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{t('footer.company.title')}</h3>
                <ul className="mt-4 space-y-4">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.company.about')}</a></li>
                  <li><a href="/fleet" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.company.fleet')}</a></li>
                  <li><a href="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.company.contact')}</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.company.careers')}</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{t('footer.contact.title')}</h3>
                <ul className="mt-4 space-y-4">
                  <li className="text-sm text-muted-foreground">{t('footer.contact.location')}</li>
                  <li className="text-sm text-muted-foreground">{t('footer.contact.phone')}</li>
                  <li className="text-sm text-muted-foreground">{t('footer.contact.email')}</li>
                </ul>
              </div>
            </div>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Luxury Transport Services. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

