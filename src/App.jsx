import { useEffect, useRef, useState } from 'react'
import AmplopDigital from './components/AmplopDigital.jsx'
import MusicPlayer from './components/MusicPlayer.jsx'
import Navbar from './components/Navbar.jsx'
import ProfilArkan from './components/ProfilArkan.jsx'
import ProfilSalsa from './components/ProfilSalsa.jsx'
import RSVP from './components/RSVP.jsx'
import SaveTheDate from './components/SaveTheDate.jsx'
import TheShift from './components/TheShift.jsx'
import Ucapan from './components/Ucapan.jsx'

const SECTION_IDS = ['anak-daro', 'marapulai', 'tanggal', 'rsvp', 'kado', 'ucapan']

function App() {
  const [activeSection, setActiveSection] = useState('anak-daro')
  const scrollContainerRef = useRef(null)
  const autoScrollTimerRef = useRef(null)
  const isManualScrollRef = useRef(false)
  const activeSectionRef = useRef(activeSection)

  const startAutoScroll = () => {
    window.clearInterval(autoScrollTimerRef.current)
    autoScrollTimerRef.current = window.setInterval(() => {
      if (isManualScrollRef.current) {
        return
      }

      const container = scrollContainerRef.current

      if (!container) {
        return
      }

      const currentIndex = SECTION_IDS.indexOf(activeSectionRef.current)

      if (currentIndex < SECTION_IDS.length - 1) {
        const nextId = SECTION_IDS[currentIndex + 1]
        const nextSection = document.getElementById(nextId)

        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        window.clearInterval(autoScrollTimerRef.current)
      }
    }, 3000)
  }

  useEffect(() => {
    activeSectionRef.current = activeSection
  }, [activeSection])

  useEffect(() => {
    const container = scrollContainerRef.current

    if (!container) {
      return undefined
    }

    const handleScroll = () => {
      const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)
      const containerTop = container.scrollTop
      const viewHeight = container.clientHeight

      for (const section of sections) {
        const sectionTop = section.offsetTop

        if (
          containerTop >= sectionTop - viewHeight / 2 &&
          containerTop < sectionTop + section.offsetHeight - viewHeight / 2
        ) {
          setActiveSection(section.id)
          break
        }
      }

      isManualScrollRef.current = true
      window.clearTimeout(autoScrollTimerRef.current)
      autoScrollTimerRef.current = window.setTimeout(() => {
        isManualScrollRef.current = false
        startAutoScroll()
      }, 3000)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })

    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    startAutoScroll()

    return () => window.clearInterval(autoScrollTimerRef.current)
  }, [activeSection])

  const handleNavClick = (sectionId) => {
    isManualScrollRef.current = true
    window.clearInterval(autoScrollTimerRef.current)
    const section = document.getElementById(sectionId)

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }

    window.setTimeout(() => {
      isManualScrollRef.current = false
      startAutoScroll()
    }, 3000)
  }

  return (
    <>
      <div
        id="snap-scroll-container"
        ref={scrollContainerRef}
        style={{
          height: '100dvh',
          overflowY: 'scroll',
          scrollSnapType: 'y mandatory',
          paddingBottom: '70px',
        }}
      >
        <TheShift />
        <ProfilSalsa />
        <ProfilArkan />
        <SaveTheDate />
        <RSVP />
        <AmplopDigital />
        <Ucapan />
      </div>
      <MusicPlayer />
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />
    </>
  )
}

export default App
