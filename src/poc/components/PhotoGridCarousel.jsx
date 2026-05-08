import { useCallback, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'iconoir-react'

const PER_PAGE = 6

const galleryContext = require.context(
  '../../assets/carousel',
  false,
  /^\.\/image-\d+\.png$/
)

const galleryImages = galleryContext
  .keys()
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  )
  .map((key) => galleryContext(key))
  .slice(0, 18)

function PhotoGridCarousel() {
  const photos = useMemo(() => galleryImages, [])

  const pages = useMemo(() => {
    const chunks = []
    for (let i = 0; i < photos.length; i += PER_PAGE) {
      chunks.push(photos.slice(i, i + PER_PAGE))
    }
    return chunks
  }, [photos])

  const pageCount = pages.length
  const [page, setPage] = useState(0)

  const goPrev = useCallback(() => {
    setPage((p) => (p - 1 + pageCount) % pageCount)
  }, [pageCount])

  const goNext = useCallback(() => {
    setPage((p) => (p + 1) % pageCount)
  }, [pageCount])

  const slidePercent = pageCount > 0 ? 100 / pageCount : 100

  return (
    <section className="w-full py-16 md:py-20" aria-label="Photo gallery preview">
      <div className="container-main">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-6 md:mb-8">
          <div>
            <p className="text-[#5C5045] text-sm tracking-[0.4em] uppercase mb-2">Gallery</p>
            <h2 className="text-[clamp(1.35rem,2.8vw,1.85rem)] font-black text-[#110000] leading-[115%]">
              Moments from our community
            </h2>
            <p className="mt-2 text-[14px] md:text-[15px] text-[#2A1810]/90 max-w-md leading-[150%]">
              A peek at classes, events, and everyday wins from our community.
            </p>
          </div>
          {pageCount > 1 ? (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#110000]/15 bg-white/70 text-[#110000] hover:bg-white hover:border-[#110000]/25 transition-colors"
                aria-label="Previous gallery page"
              >
                <ArrowLeft className="w-5 h-5" strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#110000]/15 bg-white/70 text-[#110000] hover:bg-white hover:border-[#110000]/25 transition-colors"
                aria-label="Next gallery page"
              >
                <ArrowRight className="w-5 h-5" strokeWidth={2} />
              </button>
            </div>
          ) : null}
        </div>

        <div className="overflow-hidden rounded-[20px] md:rounded-[24px] bg-[#110000]/5 ring-1 ring-[#110000]/10 p-2.5 md:p-3">
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              width: `${pageCount * 100}%`,
              transform: `translateX(-${page * slidePercent}%)`
            }}
          >
            {pages.map((chunk, pageIndex) => (
              <div
                key={pageIndex}
                className="grid grid-cols-3 gap-2 md:gap-2.5 shrink-0 px-0.5"
                style={{ width: `${slidePercent}%` }}
              >
                {chunk.map((src, i) => (
                  <div
                    key={`${pageIndex}-${i}`}
                    className="aspect-square rounded-[12px] md:rounded-[14px] overflow-hidden bg-white/50 shadow-[0_8px_30px_-18px_rgba(17,0,0,0.35)] ring-1 ring-[#110000]/5"
                  >
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {pageCount > 1 ? (
          <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Gallery pages">
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === page}
                onClick={() => setPage(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === page ? 'w-6 bg-[#110000]' : 'w-2 bg-[#110000]/20 hover:bg-[#110000]/35'
                }`}
                aria-label={`Go to gallery page ${i + 1}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default PhotoGridCarousel
