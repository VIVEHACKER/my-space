import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteConfig } from '@/config';

// localStorage 키
const STORAGE_KEY = 'myspace-admin-config';

interface AdminConfig {
  title: string;
  zones: {
    id: string;
    name: string;
    link: string;
  }[];
  audio: {
    src: string;
    volume: number;
  };
  albums: {
    name: string;
    photos: string[];
  }[];
  seo: {
    siteName: string;
    title: string;
    description: string;
    author: string;
    ogImage: string;
    canonicalUrl: string;
  };
}

const getDefaultConfig = (): AdminConfig => ({
  title: 'My Space',
  zones: siteConfig.zones.map((z) => ({
    id: z.id,
    name: z.name,
    link: z.link ?? '',
  })),
  audio: {
    src: siteConfig.audio.src,
    volume: siteConfig.audio.volume,
  },
  albums: siteConfig.cameraZone.albums.map((a) => ({
    name: a.name,
    photos: [...a.photos],
  })),
  seo: {
    siteName: siteConfig.seoConfig.siteName,
    title: siteConfig.seoConfig.title,
    description: siteConfig.seoConfig.description,
    author: siteConfig.seoConfig.author,
    ogImage: siteConfig.seoConfig.ogImage,
    canonicalUrl: siteConfig.seoConfig.canonicalUrl,
  },
});

export const loadAdminConfig = (): AdminConfig | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [config, setConfig] = useState<AdminConfig>(getDefaultConfig);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'zones' | 'audio' | 'albums' | 'seo'>('zones');

  useEffect(() => {
    const stored = loadAdminConfig();
    if (stored) {
      setConfig(stored);
    }
  }, []);

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateZone = (id: string, field: 'name' | 'link', value: string) => {
    setConfig((prev) => ({
      ...prev,
      zones: prev.zones.map((z) =>
        z.id === id ? { ...z, [field]: value } : z
      ),
    }));
  };

  const updateAlbumName = (index: number, name: string) => {
    setConfig((prev) => ({
      ...prev,
      albums: prev.albums.map((a, i) =>
        i === index ? { ...a, name } : a
      ),
    }));
  };

  const addPhotoToAlbum = (albumIndex: number, path: string) => {
    if (!path.trim()) return;
    setConfig((prev) => ({
      ...prev,
      albums: prev.albums.map((a, i) =>
        i === albumIndex
          ? { ...a, photos: [...a.photos, path.trim()] }
          : a
      ),
    }));
  };

  const removePhotoFromAlbum = (albumIndex: number, photoIndex: number) => {
    setConfig((prev) => ({
      ...prev,
      albums: prev.albums.map((a, i) =>
        i === albumIndex
          ? { ...a, photos: a.photos.filter((_, pi) => pi !== photoIndex) }
          : a
      ),
    }));
  };

  const addAlbum = () => {
    setConfig((prev) => ({
      ...prev,
      albums: [...prev.albums, { name: 'New Album', photos: [] }],
    }));
  };

  const removeAlbum = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      albums: prev.albums.filter((_, i) => i !== index),
    }));
  };

  const resetConfig = () => {
    localStorage.removeItem(STORAGE_KEY);
    setConfig(getDefaultConfig());
    setSaved(false);
  };

  const tabs = [
    { key: 'zones' as const, label: '🔗 존 관리' },
    { key: 'audio' as const, label: '🎵 BGM' },
    { key: 'albums' as const, label: '📷 앨범' },
    { key: 'seo' as const, label: '🔍 SEO' },
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-titlebar">
          <span className="admin-titlebar-text">⚙️ My Space — Dashboard</span>
          <button className="admin-btn-close" onClick={() => navigate('/')}>
            ✕
          </button>
        </div>
      </div>

      <div className="admin-body">
        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-content">
          {/* ─── 존 관리 ─── */}
          {activeTab === 'zones' && (
            <div className="admin-section">
              <h2 className="admin-section-title">존 링크 관리</h2>
              <p className="admin-hint">각 존의 이름과 외부 링크를 설정합니다. Camera Zone은 내부 모달이므로 링크가 필요 없습니다.</p>
              {config.zones.map((zone) => (
                <div key={zone.id} className="admin-field-group">
                  <label className="admin-label">{zone.id.toUpperCase()}</label>
                  <input
                    type="text"
                    value={zone.name}
                    onChange={(e) => updateZone(zone.id, 'name', e.target.value)}
                    className="admin-input"
                    placeholder="존 이름"
                  />
                  {zone.id !== 'camera' && (
                    <input
                      type="url"
                      value={zone.link}
                      onChange={(e) => updateZone(zone.id, 'link', e.target.value)}
                      className="admin-input"
                      placeholder="https://..."
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ─── BGM ─── */}
          {activeTab === 'audio' && (
            <div className="admin-section">
              <h2 className="admin-section-title">배경음악 설정</h2>
              <p className="admin-hint">public/audio/ 폴더에 mp3 파일을 넣고 경로를 입력하세요.</p>
              <div className="admin-field-group">
                <label className="admin-label">파일 경로</label>
                <input
                  type="text"
                  value={config.audio.src}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      audio: { ...prev.audio, src: e.target.value },
                    }))
                  }
                  className="admin-input"
                  placeholder="/audio/background-music.mp3"
                />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">볼륨 ({Math.round(config.audio.volume * 100)}%)</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={config.audio.volume}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      audio: { ...prev.audio, volume: parseFloat(e.target.value) },
                    }))
                  }
                  className="admin-range"
                />
              </div>
            </div>
          )}

          {/* ─── 앨범 관리 ─── */}
          {activeTab === 'albums' && (
            <div className="admin-section">
              <h2 className="admin-section-title">Camera Zone 앨범</h2>
              <p className="admin-hint">public/photos/ 폴더에 이미지를 넣고 경로를 추가하세요.</p>
              {config.albums.map((album, ai) => (
                <div key={ai} className="admin-album">
                  <div className="admin-album-header">
                    <input
                      type="text"
                      value={album.name}
                      onChange={(e) => updateAlbumName(ai, e.target.value)}
                      className="admin-input admin-album-name"
                      placeholder="앨범 이름"
                    />
                    <button
                      onClick={() => removeAlbum(ai)}
                      className="admin-btn-danger"
                    >
                      삭제
                    </button>
                  </div>
                  <div className="admin-photos">
                    {album.photos.map((photo, pi) => (
                      <div key={pi} className="admin-photo-item">
                        <span className="admin-photo-path">{photo}</span>
                        <button
                          onClick={() => removePhotoFromAlbum(ai, pi)}
                          className="admin-btn-sm"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="admin-add-photo">
                    <input
                      type="text"
                      placeholder="/photos/파일명.jpg"
                      className="admin-input"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addPhotoToAlbum(ai, (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <span className="admin-hint-inline">Enter로 추가</span>
                  </div>
                </div>
              ))}
              <button onClick={addAlbum} className="admin-btn-add">
                + 새 앨범 추가
              </button>
            </div>
          )}

          {/* ─── SEO ─── */}
          {activeTab === 'seo' && (
            <div className="admin-section">
              <h2 className="admin-section-title">SEO / GEO / AEO 설정</h2>
              <p className="admin-hint">여기서 수정하면 메타태그, OG, JSON-LD 스키마가 자동으로 업데이트됩니다.</p>
              <div className="admin-field-group">
                <label className="admin-label">사이트 이름</label>
                <input
                  type="text"
                  value={config.seo.siteName}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, siteName: e.target.value },
                    }))
                  }
                  className="admin-input"
                  placeholder="My Space"
                />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">페이지 제목 (Title)</label>
                <input
                  type="text"
                  value={config.seo.title}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, title: e.target.value },
                    }))
                  }
                  className="admin-input"
                />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">설명 (Description)</label>
                <textarea
                  value={config.seo.description}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, description: e.target.value },
                    }))
                  }
                  className="admin-textarea"
                  rows={3}
                />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">작성자 / 소유자 이름</label>
                <input
                  type="text"
                  value={config.seo.author}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, author: e.target.value },
                    }))
                  }
                  className="admin-input"
                  placeholder="이름"
                />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">사이트 URL (Canonical)</label>
                <input
                  type="url"
                  value={config.seo.canonicalUrl}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, canonicalUrl: e.target.value },
                    }))
                  }
                  className="admin-input"
                  placeholder="https://mysite.com/"
                />
              </div>
              <div className="admin-field-group">
                <label className="admin-label">OG 이미지 URL</label>
                <input
                  type="url"
                  value={config.seo.ogImage}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, ogImage: e.target.value },
                    }))
                  }
                  className="admin-input"
                  placeholder="https://..."
                />
              </div>

              <div className="admin-seo-status">
                <h3 className="admin-label">자동 최적화 현황</h3>
                <div className="admin-check">✅ &lt;title&gt; + &lt;meta description&gt; — 저장 시 자동 반영</div>
                <div className="admin-check">✅ Open Graph (og:title, og:description, og:image, og:url) — 자동 반영</div>
                <div className="admin-check">✅ Twitter Card — 자동 반영</div>
                <div className="admin-check">✅ JSON-LD WebSite + Person 스키마 — 존 링크가 sameAs로 자동 연결</div>
                <div className="admin-check">✅ JSON-LD FAQPage — 존별 Q&A 자동 생성 (AEO 인용률 2.7배)</div>
                <div className="admin-check">✅ JSON-LD Speakable — 음성 검색 최적화</div>
                <div className="admin-check">✅ Canonical URL — 자동 반영</div>
                <div className="admin-check">✅ robots.txt — GPTBot, ClaudeBot, PerplexityBot 허용</div>
                <div className="admin-check">✅ sitemap.xml — 생성 완료</div>
                <div className="admin-check">✅ llms.txt — AI 크롤러용 사이트 요약</div>
                <div className="admin-check">✅ noscript 폴백 — JS 없이도 콘텐츠 노출</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="admin-footer">
          <button onClick={resetConfig} className="admin-btn-reset">
            초기화
          </button>
          <div className="admin-footer-right">
            {saved && <span className="admin-saved">✅ 저장됨!</span>}
            <button onClick={save} className="admin-btn-save">
              💾 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
