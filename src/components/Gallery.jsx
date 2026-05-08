import { useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from 'framer-motion'

const photos = [
  '/minang-1.jpg',
  '/minang-2.jpg',
  '/minang-3.jpg',
  '/minang-4.jpg',
  '/minang-5.jpg',
  '/minang-6.jpg',
  '/minang-7.jpg',
  '/minang-8.jpg',
  '/minang-9.jpg',
]

function DraggableCard({ src, onSwipeLeft, onSwipeRight, isTop }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(
    x,
    [-200, -100, 0, 100, 200],
    [0, 1, 1, 1, 0],
  )
  const leftGlowOpacity = useTransform(x, [-200, 0], [1, 0])
  const rightGlowOpacity = useTransform(x, [0, 200], [0, 1])

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 80) {
      onSwipeRight()
    } else if (info.offset.x < -80) {
      onSwipeLeft()
    }
  }

  return (
    <motion.div
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={{ cursor: 'grabbing' }}
      animate={{ scale: isTop ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute"
      style={{
        x,
        rotate,
        opacity,
        width: 'min(260px, 70vw)',
        height: 'min(340px, 50vh)',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '2px solid #C49A2A',
        boxShadow: isTop
          ? '0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(196,154,42,0.3)'
          : '0 8px 20px rgba(0,0,0,0.3)',
        cursor: isTop ? 'grab' : 'default',
        top: isTop ? 0 : '12px',
        left: isTop ? 0 : '6px',
        zIndex: isTop ? 10 : 5,
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
        draggable={false}
      />
      {isTop ? (
        <>
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(196,154,42,0.3), transparent)',
              opacity: leftGlowOpacity,
              pointerEvents: 'none',
            }}
          />
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to left, rgba(196,154,42,0.3), transparent)',
              opacity: rightGlowOpacity,
              pointerEvents: 'none',
            }}
          />
        </>
      ) : null}
    </motion.div>
  )
}

function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [songketSrc, setSongketSrc] = useState('/songket-padang-mobile.svg')
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const sectionRef = useRef(null)

  useEffect(() => {
    const update = () => {
      setSongketSrc(
        window.innerWidth >= 768
          ? '/songket-padang.svg'
          : '/songket-padang-mobile.svg',
      )
      setIsMobile(window.innerWidth < 768)
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const handleSwipeRight = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  const visiblePhotos = [
    photos[currentIndex],
    photos[(currentIndex + 1) % photos.length],
  ]

  return (
    <section
      id="galeri"
      ref={sectionRef}
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(to bottom, #7B1A1A 0%, #5C1A0E 60%, #3B1F0E 100%)',
        scrollSnapAlign: 'start',
        scrollSnapStop: 'always',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Lora, serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: `url('${songketSrc}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          animation:
            songketSrc === '/songket-padang-mobile.svg'
              ? 'breathe 6s ease-in-out infinite'
              : 'none',
          transformOrigin: 'center center',
        }}
      />

      {isMobile ? (
        <>
          {[
            { src: '/batik-1.svg', size: 38, duration: 9, top: '20%' },
            { src: '/batik-2.svg', size: 28, duration: 13, top: '45%' },
            { src: '/batik-1.svg', size: 44, duration: 7, top: '70%' },
          ].map((item, index) => (
            <img
              key={`bl-${index}`}
              src={item.src}
              style={{
                position: 'absolute',
                left: '8px',
                top: item.top,
                width: `${item.size}px`,
                height: `${item.size}px`,
                pointerEvents: 'none',
                zIndex: 1,
                animation: `rotateCW ${item.duration}s ease-in-out infinite`,
                transformOrigin: 'center center',
                opacity: 0.7,
              }}
            />
          ))}
          {[
            { src: '/batik-2.svg', size: 42, duration: 8, top: '20%' },
            { src: '/batik-1.svg', size: 30, duration: 10, top: '45%' },
            { src: '/batik-2.svg', size: 36, duration: 12, top: '70%' },
          ].map((item, index) => (
            <img
              key={`br-${index}`}
              src={item.src}
              style={{
                position: 'absolute',
                right: '8px',
                top: item.top,
                width: `${item.size}px`,
                height: `${item.size}px`,
                pointerEvents: 'none',
                zIndex: 1,
                animation: `rotateCW ${item.duration}s ease-in-out infinite`,
                transformOrigin: 'center center',
                opacity: 0.7,
              }}
            />
          ))}
        </>
      ) : null}

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <p
            style={{
              fontSize: '11px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: '#F5E6C8',
              marginBottom: '4px',
            }}
          >
            Galeri
          </p>
          <p style={{ fontSize: '18px', color: '#F5E6C8', fontStyle: 'italic' }}>
            Momen bersama
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            width: 'min(260px, 70vw)',
            height: 'min(340px, 50vh)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((src, index) => (
              <DraggableCard
                key={`${src}-${currentIndex}-${index}`}
                src={src}
                isTop={index === 0}
                onSwipeLeft={handleSwipeLeft}
                onSwipeRight={handleSwipeRight}
              />
            ))}
          </AnimatePresence>
        </div>

        <p
          style={{
            fontSize: '11px',
            color: '#F5E6C8',
            opacity: 0.5,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          geser untuk lihat foto lainnya
        </p>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {photos.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: index === currentIndex ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background:
                  index === currentIndex
                    ? '#C49A2A'
                    : 'rgba(196,154,42,0.3)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        <p style={{ fontSize: '12px', color: '#C49A2A', opacity: 0.7 }}>
          {currentIndex + 1} / {photos.length}
        </p>
      </div>
    </section>
  )
}

export default Gallery
