import { useEffect, useState } from 'react'

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Inline style for a staggered reveal delay, e.g. the Nth card in a grid.
export const staggerStyle = (index, step = 0.08) => ({ '--reveal-delay': `${index * step}s` })

// Reveals `.reveal` elements with a fade + translateY as they enter the viewport.
// Plain IntersectionObserver instead of a library (e.g. Framer Motion) to keep the bundle light.
// Called once per page component so it re-scans that page's own `.reveal` elements on mount.
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

// A vertical thread that fills in as the page is read, tipped with a spark marker —
// the "line that draws itself" as you scroll, connecting the sections top to bottom.
// Lives in the persistent Layout since it tracks whole-page scroll across every route.
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (prefersReducedMotion()) return
    let ticking = false
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return progress
}

export function useScrollToTopVisible(threshold = 560) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    let ticking = false
    const update = () => {
      setVisible(window.scrollY > threshold)
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return visible
}

// Subtle parallax on the hero illustration: it lags behind the page scroll,
// giving the hero a sense of depth instead of moving 1:1 with the text.
export function useHeroParallax(ref) {
  useEffect(() => {
    if (!ref.current || prefersReducedMotion() || !window.matchMedia('(min-width: 900px)').matches) return
    let ticking = false
    const update = () => {
      if (ref.current) ref.current.style.transform = `translateY(${window.scrollY * 0.1}px)`
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref])
}

// A soft trailing dot that follows the pointer and blooms open over anything
// clickable — a small, deliberate detail for mouse/trackpad visitors only.
// Lives in the persistent Layout since it's a whole-viewport effect, not page content.
export function useCustomCursor(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return
    let raf = null
    const move = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        // Position via CSS custom properties (read by the `transform` rule in App.css)
        // instead of setting `transform` directly, so the .is-active hover-scale
        // (driven by the stylesheet) can still transition smoothly on top of it —
        // an inline `transform` would otherwise overwrite that on every mousemove frame.
        el.style.setProperty('--cursor-x', `${e.clientX}px`)
        el.style.setProperty('--cursor-y', `${e.clientY}px`)
        raf = null
      })
    }
    const onOver = (e) => { if (e.target.closest && e.target.closest('a, button')) el.classList.add('is-active') }
    const onOut = (e) => { if (e.target.closest && e.target.closest('a, button')) el.classList.remove('is-active') }
    document.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    el.classList.add('is-enabled')
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [ref])
}

// Updates the document title and <meta name="description"> (plus their og: equivalents)
// for the current page. This runs client-side only — it helps JS-executing crawlers
// (e.g. Googlebot) and browser tabs/history, but bots that read raw HTML without running
// JS (link-preview bots for WhatsApp/Facebook/Twitter) will still see the static
// index.html defaults, since this site has no server-side rendering.
export function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title
    const setMeta = (selector, attr, value) => {
      let tag = document.querySelector(selector)
      if (!tag) {
        tag = document.createElement('meta')
        const [, attrName, attrValue] = selector.match(/\[(\w+)="([^"]+)"\]/)
        tag.setAttribute(attrName, attrValue)
        document.head.appendChild(tag)
      }
      tag.setAttribute(attr, value)
    }
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
    }
    if (title) setMeta('meta[property="og:title"]', 'content', title)
  }, [title, description])
}
