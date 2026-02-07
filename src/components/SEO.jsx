import { Helmet } from 'react-helmet-async'

const defaultMeta = {
  title: 'Neuro Thrive Foundation',
  description: 'Empowering neurodivergent youth and adults through adaptive fitness, wellness programs, and inclusive community. Evidence-based coaching and sensory-friendly programming for autism and related support needs.',
  keywords: 'neurodivergent, autism, adaptive fitness, wellness, ABA therapy, sensory-friendly, inclusive fitness, autism support, neurodiversity, special needs fitness',
  siteUrl: 'https://neurothrivefoundation.org',
  image: '/logo512.png',
  twitterHandle: '@neurothrive',
  type: 'website',
  locale: 'en_US'
}

function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type,
  article,
  noindex = false
}) {
  const seo = {
    title: title ? `${title} | ${defaultMeta.title}` : defaultMeta.title,
    description: description || defaultMeta.description,
    keywords: keywords || defaultMeta.keywords,
    image: `${defaultMeta.siteUrl}${image || defaultMeta.image}`,
    url: url ? `${defaultMeta.siteUrl}${url}` : defaultMeta.siteUrl,
    type: type || defaultMeta.type
  }

  // Organization schema for rich snippets
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NonprofitOrganization',
    name: 'Neuro Thrive Foundation',
    description: defaultMeta.description,
    url: defaultMeta.siteUrl,
    logo: `${defaultMeta.siteUrl}/logo512.png`,
    sameAs: [
      'https://twitter.com/neurothrive',
      'https://facebook.com/neurothrivefoundation',
      'https://instagram.com/neurothrivefoundation',
      'https://linkedin.com/company/neuro-thrive-foundation'
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English'
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    nonprofitStatus: '501c3',
    foundingDate: '2024',
    knowsAbout: [
      'Adaptive Fitness',
      'Autism Support',
      'Neurodiversity',
      'Wellness Programs',
      'ABA Therapy',
      'Sensory-Friendly Programming'
    ]
  }

  // Service schema for programs
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: {
      '@type': 'NonprofitOrganization',
      name: 'Neuro Thrive Foundation'
    },
    serviceType: 'Adaptive Fitness Programs',
    description: 'Evidence-based fitness and wellness programs for neurodivergent individuals including adaptive fitness, nutrition coaching, and wellness education.',
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Neurodivergent youth and adults'
    }
  }

  // Website schema for search
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Neuro Thrive Foundation',
    url: defaultMeta.siteUrl,
    description: defaultMeta.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${defaultMeta.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />

      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Neuro Thrive Foundation" />
      <meta property="og:locale" content={defaultMeta.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:site" content={defaultMeta.twitterHandle} />
      <meta name="twitter:creator" content={defaultMeta.twitterHandle} />

      {/* Article specific tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime} />
          <meta property="article:author" content={article.author} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map(tag => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}

      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Neuro Thrive Foundation" />
      <meta name="publisher" content="Neuro Thrive Foundation" />
      <meta name="copyright" content="Neuro Thrive Foundation" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Geo Tags */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />

      {/* Mobile & PWA */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Neuro Thrive" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  )
}

export default SEO
