import { useEffect, useRef, useState } from 'react'

function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    if (!audio) {
      return undefined
    }

    audio.volume = 0.4
    audio.loop = true

    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
          })
          .catch(() => {})
      }
    }

    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [hasInteracted])

  const toggleMusic = (event) => {
    event.stopPropagation()
    const audio = audioRef.current

    if (!audio) {
      return
    }

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => {
        setIsPlaying(true)
        setHasInteracted(true)
      }).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/musik-minang.mp3" preload="auto" />
      <button
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 200,
          background: 'rgba(123, 26, 26, 0.7)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(196, 154, 42, 0.5)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#C49A2A',
        }}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#C49A2A">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#C49A2A">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
    </>
  )
}

export default MusicPlayer
