function TheShift() {
  return (
    <section
      id="the-shift"
      className="relative h-[100dvh] w-full overflow-hidden bg-maroon"
      aria-hidden="true"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always', height: '100dvh' }}
    >
      <div className="absolute inset-0 bg-maroon" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/songket-pattern.svg')",
          backgroundRepeat: 'repeat',
          backgroundSize: '900px auto',
          backgroundPosition: 'center',
          opacity: 0.15,
        }}
      />

      <div className="relative flex h-[100dvh] items-center justify-center px-6">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="space-y-3">
            <p className="font-cormorant text-xs uppercase tracking-[0.45em] text-ivory sm:text-sm">
              dan di sisi lain
            </p>
            <p className="font-cormorant text-2xl italic text-ivory sm:text-4xl">
              ada cerita yang lebih besar menanti
            </p>
          </div>

          <div className="relative mt-2 h-4 w-[120px]">
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
            <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold bg-maroon" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TheShift
