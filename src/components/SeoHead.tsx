import { Helmet } from 'react-helmet-async';
import { useAdminConfig } from '@/hooks/useAdminConfig';

/**
 * 대시보드 SEO 설정 + config 기반으로 <head> 태그를 자동 업데이트
 * URL만 넣으면 메타태그, OG, 스키마, canonical 전부 자동 반영
 */
export const SeoHead = () => {
  const config = useAdminConfig();
  const seo = config.seoConfig;

  const zones = config.zones;
  const externalZones = zones.filter((z) => z.type === 'external' && z.link);
  const sameAs = externalZones.map((z) => z.link).filter(Boolean);

  return (
    <Helmet>
      {/* 기본 메타 */}
      <html lang="ko" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={seo.canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonicalUrl} />
      <meta property="og:site_name" content={seo.siteName} />
      <meta property="og:locale" content="ko_KR" />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}

      {/* JSON-LD: WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: seo.siteName,
          url: seo.canonicalUrl,
          description: seo.description,
          author: {
            '@type': 'Person',
            name: seo.author,
            sameAs,
          },
        })}
      </script>

      {/* JSON-LD: Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: seo.author,
          url: seo.canonicalUrl,
          knowsAbout: zones.map((z) => z.name),
          sameAs,
        })}
      </script>

      {/* JSON-LD: Speakable (AEO) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: seo.siteName,
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.title-aero', '.desktop-icon-label'],
          },
        })}
      </script>

      {/* JSON-LD: FAQPage (AEO 인용률 2.7배) */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `${seo.siteName}은 무엇인가요?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: seo.description,
              },
            },
            ...zones.map((z) => ({
              '@type': 'Question',
              name: `${z.name}은 무엇인가요?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: z.type === 'external'
                  ? `${z.name}은 외부 링크로 연결되는 존입니다. ${z.link ?? ''}`
                  : `${z.name}은 사이트 내에서 사진 앨범을 볼 수 있는 존입니다.`,
              },
            })),
          ],
        })}
      </script>
    </Helmet>
  );
};
