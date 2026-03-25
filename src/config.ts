// Site Configuration

export interface ZoneConfig {
  id: string;
  name: string;
  icon: string; // 이미지 경로
  type: 'external' | 'internal';
  link?: string;
  position?: {
    top: string;
    left: string;
  };
  iconSize?: number; // px 기준 너비
}

export const siteConfig = {
  audio: {
    enabled: true,
    src: '/audio/background-music.mp3',
    autoplay: false,
    loop: true,
    volume: 0.5,
  },

  background: {
    videos: ['/videos/bg1.mp4', '/videos/bg2.mp4'],
    crossfadeDuration: 3000,
    displayDuration: 8000,
  },

  zones: [
    {
      id: 'about',
      name: 'About / Portfolio',
      icon: '/icons/ipod.png',
      type: 'external',
      link: 'https://1-qi3v.vercel.app/',
      iconSize: 64,
    },
    {
      id: 'lip',
      name: 'Lip Zone',
      icon: '/icons/msn.png',
      type: 'external',
      link: 'https://1-qi3v.vercel.app/',
      iconSize: 64,
    },
    {
      id: 'camera',
      name: 'Camera Zone',
      icon: '/icons/monitor.png',
      type: 'internal',
      iconSize: 72,
    },
    {
      id: 'playlist',
      name: 'Playlist Zone',
      icon: '/icons/itunes.png',
      type: 'external',
      link: 'https://open.spotify.com',
      iconSize: 64,
    },
    {
      id: 'taste-map',
      name: 'Taste Map Zone',
      icon: '/icons/filmstrip1.png',
      type: 'external',
      link: 'https://1-qi3v.vercel.app/',
      iconSize: 90,
    },
  ] as ZoneConfig[],

  // ─── Camera Zone 앨범 설정 ───
  // 사진을 추가하려면:
  // 1. public/photos/ 폴더에 이미지 파일을 넣고
  // 2. 아래 albums 배열에 경로를 추가하면 끝!
  cameraZone: {
    albums: [
      {
        name: 'Memories',
        photos: [
          '/photos/sample1.jpg',
          '/photos/sample2.jpg',
          '/photos/sample3.jpg',
          '/photos/sample4.jpg',
        ],
      },
      {
        name: 'Favorites',
        photos: [
          '/photos/sample5.jpg',
          '/photos/sample6.jpg',
          '/photos/sample7.jpg',
        ],
      },
      // 앨범 추가 예시:
      // {
      //   name: '새 앨범 이름',
      //   photos: ['/photos/파일명.jpg'],
      // },
    ],
  },
  // ─── SEO / GEO / AEO 설정 ───
  // 대시보드에서 수정하면 <head> 메타태그, OG, JSON-LD가 자동 업데이트됩니다.
  seoConfig: {
    siteName: 'My Space',
    title: 'My Space — Frutiger Aero Personal Hub',
    description: 'Frutiger Aero 스타일의 개인 포트폴리오 & 크리에이티브 허브. Lip Zone, Camera Zone, Playlist, Taste Map, Portfolio를 만나보세요.',
    author: 'My Space Owner',
    canonicalUrl: 'https://1-qi3v.vercel.app/',
    ogImage: '',
  },
};

export default siteConfig;
