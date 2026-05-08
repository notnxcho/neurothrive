const YOUTUBE_ID = 'X4Vrx25H9BM'

function IntroVideoSection() {
  const embedSrc =
    `https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}` +
    '?rel=0&modestbranding=1&playsinline=1'

  return (
    <section
      id="intro-video"
      className="w-full min-h-screen flex items-center justify-center relative py-20 md:py-24"
    >
      <div className="container-main flex flex-col items-center text-center gap-8 md:gap-10">
        <p className="text-[#A09080] text-xs tracking-[0.4em] uppercase">
          watch the video
        </p>

        <div className="w-full max-w-[940px]">
          <div className="relative w-full overflow-hidden rounded-[20px] md:rounded-[28px]">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute inset-0 h-full w-full"
                src={embedSrc}
                title="Neuro Thrive intro video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default IntroVideoSection
