'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Logo } from './logo'

const sectionLinks = [
  { hash: '#inicio', label: 'Inicio' },
  { hash: '#mision', label: 'Misión' },
  { hash: '#servicios', label: 'Servicios' },
  { hash: '#preguntas-frecuentes', label: 'FAQ' },
  { hash: '#contacto', label: 'Contacto' },
]

const serviceLinks = [
  { href: '/bobinado-de-motores-electricos-tandil', label: 'Bobinado de motores' },
  { href: '/reparacion-de-motores-electricos-tandil', label: 'Reparación de motores' },
  { href: '/reparacion-de-bombas-de-agua-tandil', label: 'Bombas de agua' },
  { href: '/mantenimiento-preventivo-motores-tandil', label: 'Mantenimiento preventivo' },
]

function easeInOutQuint(t: number) {
  return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2
}

function getScrollDuration(distance: number) {
  return Math.min(1900, Math.max(1250, Math.abs(distance) * 0.72))
}

export function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isServicePage = serviceLinks.some((link) => link.href === pathname)
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(isServicePage)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(isHome ? '#inicio' : '#servicios')
  const animationFrame = useRef<number | null>(null)
  const servicesMenuRef = useRef<HTMLDivElement | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelSmoothScroll = () => {
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current)
      animationFrame.current = null
    }
  }

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const openServicesMenu = () => {
    clearCloseTimer()
    setServicesOpen(true)
  }

  const scheduleCloseServicesMenu = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setServicesOpen(false), 180)
  }

  useEffect(() => {
    setOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(isServicePage)
    setActive(isHome ? '#inicio' : '#servicios')
  }, [isHome, isServicePage, pathname])

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
        setServicesOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setServicesOpen(false)
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
      clearCloseTimer()
    }
  }, [])

  useEffect(() => {
    let ticking = false

    const updateHeaderState = () => {
      ticking = false
      const scrollY = window.scrollY
      setScrolled(scrollY > 28)

      if (!isHome) return

      const header = document.querySelector<HTMLElement>('.site-header')
      const headerHeight = header?.getBoundingClientRect().height ?? (scrollY > 28 ? 72 : 88)
      const readingLine = scrollY + headerHeight + 32 + Math.min(140, window.innerHeight * 0.18)
      const pageBottom = scrollY + window.innerHeight >= document.documentElement.scrollHeight - 6

      if (pageBottom) {
        setActive('#contacto')
        return
      }

      let current = sectionLinks[0].hash
      for (const link of sectionLinks) {
        const section = document.querySelector<HTMLElement>(link.hash)
        if (section && section.offsetTop <= readingLine) current = link.hash
      }
      setActive(current)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateHeaderState)
      }
    }

    updateHeaderState()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('wheel', cancelSmoothScroll, { passive: true })
    window.addEventListener('touchstart', cancelSmoothScroll, { passive: true })
    window.addEventListener('keydown', cancelSmoothScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', cancelSmoothScroll)
      window.removeEventListener('touchstart', cancelSmoothScroll)
      window.removeEventListener('keydown', cancelSmoothScroll)
      cancelSmoothScroll()
    }
  }, [isHome])

  const goTo = (hash: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) {
      setOpen(false)
      setServicesOpen(false)
      return
    }

    event.preventDefault()
    const target = document.querySelector(hash)
    if (!target) return

    const header = document.querySelector<HTMLElement>('.site-header')
    const headerHeight = header?.getBoundingClientRect().height ?? (scrolled ? 72 : 88)
    const sectionGap = window.innerWidth < 768 ? 18 : 28
    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - sectionGap)
    const startY = window.scrollY
    const distance = targetY - startY
    const duration = getScrollDuration(distance)
    const startTime = performance.now()

    setOpen(false)
    setServicesOpen(false)
    setActive(hash)
    history.replaceState(null, '', hash)
    cancelSmoothScroll()

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: targetY, left: 0, behavior: 'auto' })
      return
    }

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = easeInOutQuint(progress)
      window.scrollTo({ top: startY + distance * eased, left: 0, behavior: 'auto' })

      if (progress < 1) {
        animationFrame.current = requestAnimationFrame(animate)
      } else {
        animationFrame.current = null
        window.scrollTo({ top: targetY, left: 0, behavior: 'auto' })
      }
    }

    animationFrame.current = requestAnimationFrame(animate)
  }

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`)
  const servicesActive = active === '#servicios' || isServicePage

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`}>
      <div className="site-header__inner mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
        <a href={isHome ? '#inicio' : '/'} onClick={isHome ? goTo('#inicio') : undefined} aria-label="Galpón Bobinados - Inicio">
          <Logo priority />
        </a>

        <nav aria-label="Navegación principal" className="hidden items-center gap-2 md:flex">
          {sectionLinks.map((link) => {
            if (link.hash === '#servicios') {
              return (
                <div
                  key={link.hash}
                  ref={servicesMenuRef}
                  className="services-dropdown"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={scheduleCloseServicesMenu}
                >
                  <button
                    type="button"
                    className={`nav-link services-dropdown__trigger ${servicesActive ? 'nav-link--active' : ''}`}
                    aria-haspopup="menu"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((value) => !value)}
                    onFocus={openServicesMenu}
                  >
                    <span>Servicios</span>
                    <ChevronDown className={`services-dropdown__chevron ${servicesOpen ? 'services-dropdown__chevron--open' : ''}`} aria-hidden="true" />
                  </button>

                  <div className={`services-dropdown__panel ${servicesOpen ? 'services-dropdown__panel--open' : ''}`} role="menu">
                    <a href={hrefFor('#servicios')} onClick={goTo('#servicios')} className="services-dropdown__item" role="menuitem">
                      Ver todos los servicios
                    </a>
                    <div className="services-dropdown__divider" />
                    {serviceLinks.map((service) => (
                      <a
                        key={service.href}
                        href={service.href}
                        onClick={() => setServicesOpen(false)}
                        aria-current={pathname === service.href ? 'page' : undefined}
                        className={`services-dropdown__item ${pathname === service.href ? 'services-dropdown__item--active' : ''}`}
                        role="menuitem"
                      >
                        {service.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <a
                key={link.hash}
                href={hrefFor(link.hash)}
                onClick={goTo(link.hash)}
                aria-current={active === link.hash ? 'page' : undefined}
                className={`nav-link ${active === link.hash ? 'nav-link--active' : ''}`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md p-2 text-background transition-colors hover:bg-white/10 md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div className={`mobile-menu md:hidden ${open ? 'mobile-menu--open' : ''}`}>
        <nav aria-label="Navegación móvil" className="mx-4 mb-3 rounded-xl bg-dark-section/98 p-2 shadow-2xl">
          {sectionLinks.map((link) => {
            if (link.hash === '#servicios') {
              return (
                <div key={link.hash} className="mobile-services">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((value) => !value)}
                    className={`mobile-nav-link mobile-services__trigger ${servicesActive ? 'mobile-nav-link--active' : ''}`}
                    aria-expanded={mobileServicesOpen}
                  >
                    <span>Servicios</span>
                    <ChevronDown className={`mobile-services__chevron ${mobileServicesOpen ? 'mobile-services__chevron--open' : ''}`} aria-hidden="true" />
                  </button>
                  <div className={`mobile-services__panel ${mobileServicesOpen ? 'mobile-services__panel--open' : ''}`}>
                    <a href={hrefFor('#servicios')} onClick={goTo('#servicios')} className="mobile-services__item">
                      Ver todos los servicios
                    </a>
                    {serviceLinks.map((service) => (
                      <a
                        key={service.href}
                        href={service.href}
                        onClick={() => setOpen(false)}
                        aria-current={pathname === service.href ? 'page' : undefined}
                        className={`mobile-services__item ${pathname === service.href ? 'mobile-services__item--active' : ''}`}
                      >
                        {service.label}
                      </a>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <a
                key={link.hash}
                href={hrefFor(link.hash)}
                onClick={goTo(link.hash)}
                className={`mobile-nav-link ${active === link.hash ? 'mobile-nav-link--active' : ''}`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
