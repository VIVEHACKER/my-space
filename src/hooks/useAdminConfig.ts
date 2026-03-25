import { useMemo } from 'react';
import { siteConfig } from '@/config';

const STORAGE_KEY = 'myspace-admin-config';

/** 대시보드에서 저장한 설정을 siteConfig에 오버라이드 */
export const useAdminConfig = () => {
  return useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return siteConfig;

      const admin = JSON.parse(raw);
      const merged = { ...siteConfig };

      // 존 링크/이름 오버라이드
      if (admin.zones) {
        merged.zones = siteConfig.zones.map((zone) => {
          const override = admin.zones.find((z: { id: string }) => z.id === zone.id);
          if (!override) return zone;
          return {
            ...zone,
            name: override.name || zone.name,
            link: override.link || zone.link,
          };
        });
      }

      // 오디오 오버라이드
      if (admin.audio) {
        merged.audio = { ...siteConfig.audio, ...admin.audio };
      }

      // 앨범 오버라이드
      if (admin.albums) {
        merged.cameraZone = { ...siteConfig.cameraZone, albums: admin.albums };
      }

      // SEO 오버라이드
      if (admin.seo) {
        merged.seoConfig = {
          ...siteConfig.seoConfig,
          title: admin.seo.title || siteConfig.seoConfig.title,
          description: admin.seo.description || siteConfig.seoConfig.description,
          canonicalUrl: admin.seo.canonicalUrl || siteConfig.seoConfig.canonicalUrl,
          ogImage: admin.seo.ogImage || siteConfig.seoConfig.ogImage,
        };
      }

      return merged;
    } catch {
      return siteConfig;
    }
  }, []);
};
