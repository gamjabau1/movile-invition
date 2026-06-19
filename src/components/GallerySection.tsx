import { useState, MouseEvent } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Play } from "lucide-react";
import { weddingData } from "../data";

// 갤러리에 표시할 사진/영상 카드의 메타데이터입니다.
interface GalleryItem {
  type: "image" | "video";
  src: string;
  videoSrc?: string;
  title: string;
  subtitle: string;
  tag: string;
}

// 웨딩 사진 썸네일, 식전 영상, 확대 보기 모달을 담당하는 섹션입니다.
export default function GallerySection() {
  // null이면 모달이 닫힌 상태이고, 숫자이면 해당 인덱스의 사진을 확대 표시합니다.
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // 갤러리에 노출되는 사진과 문구 목록입니다.
  const galleryItems: GalleryItem[] = [
    {
      type: "image",
      src: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/9b36323d80294dae246d21260f0ceb82d46c3fd5/HO_00243_%EC%88%98%EC%A0%95.jpg",
      tag: "ALWAYS WITH YOU",
      title: "서로를 품에 가득 안는 것",
      subtitle: "마주한 순간 시작된 우리의 영원한 기적"
    },
    {
      type: "image",
      src: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/9b36323d80294dae246d21260f0ceb82d46c3fd5/HO_00363_%EC%88%98%EC%A0%95_1.jpg",
      tag: "WARM PROMISE",
      title: "맞잡은 두 손에 흐르는 약속",
      subtitle: "함께 그려갈 따스한 내일을 마음에 약속합니다"
    },
    {
      type: "image",
      src: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/9b36323d80294dae246d21260f0ceb82d46c3fd5/HO_00744_%EC%88%98%EC%A0%95.jpg",
      tag: "HIGHLIGHT MOVIE",
      title: "우리의 눈부신 시간 (식전 영상)",
      subtitle: "눈부신 행복의 한 페이지를 장식하며"
    },
    {
      type: "image",
      src: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/6c4c5935fd4f3964a2d47de98ba0c5d125a2a413/HO_01143_%EC%88%98%EC%A0%95_1.jpg",
      tag: "HAPPY TOAST",
      title: "우리의 시작을 기뻐해 주는 밤",
      subtitle: "눈부신 축복 아래 잔을 들어 행복을 기원합니다"
    },
    {
      type: "image",
      src: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/6c4c5935fd4f3964a2d47de98ba0c5d125a2a413/HO_00744_%EC%88%98%EC%A0%95.jpg",
      tag: "GARDEN WEDDING",
      title: "햇살 고운 온실 야외 정원",
      subtitle: "초록빛 머금은 한낮의 비밀정원 속에서"
    },
    {
      type: "image",
      src: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/6c4c5935fd4f3964a2d47de98ba0c5d125a2a413/HO_00566_%EC%88%98%EC%A0%95.jpg",
      tag: "PURE BLOSSOM",
      title: "따뜻한 바람에 설렘을 가득 실어",
      subtitle: "향기로운 계절에 만개한 우리의 첫걸음"
    },
    {
      type: "image",
      src: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/9b36323d80294dae246d21260f0ceb82d46c3fd5/HO_00385_%EC%88%98%EC%A0%95.jpg",
      tag: "FOREVER MORE",
      title: "눈부신 날에 약속하는 영원",
      subtitle: "함께 걷는 이 길 위에 행복 가득하기를"
    },
    {
      type: "image",
      src: weddingData.images.detail,
      tag: "PROMISE OF LOVE",
      title: "사랑의 또 다른 약속",
      subtitle: "서로의 따스함을 건네는 시간"
    },
    {
      type: "image",
      src: weddingData.images.cheers,
      tag: "SPECIAL CELEBRATION",
      title: "축하와 축복의 아름다운 밤",
      subtitle: "세상에서 가장 빛나는 추억을 새기며"
    }
  ];

  // 모달 안에서 이전 사진으로 이동합니다.
  const handlePrev = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  // 모달 안에서 다음 사진으로 이동합니다.
  const handleNext = (e: MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % galleryItems.length);
    }
  };

  return (
    <section id="gallery-section" className="bg-white px-6 py-16 flex flex-col items-center">
      {/* 갤러리 섹션 제목입니다. */}
      <div className="text-center mb-10 select-none">
        <span className="font-en-title text-4xl font-normal text-taupe block mb-1 tracking-wider">
          Our Moments
        </span>
        <h2 className="font-kr-title text-xl text-ink tracking-widest font-medium uppercase">
          갤러리
        </h2>
        <div className="w-8 h-[1px] bg-taupe/40 mx-auto mt-4" />
      </div>

      {/* 작은 썸네일을 누르면 해당 사진이 라이트박스로 열립니다. */}
      <div className="w-full max-w-sm grid grid-cols-3 gap-2 px-1">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-cream aspect-square rounded-xs overflow-hidden border border-line hover:border-taupe/40 transition-all duration-300 cursor-pointer shadow-xs"
            onClick={() => setActiveIdx(idx)}
            id={`gallery-thumb-${idx}`}
          >
            <img
              src={item.src}
              alt={item.tag}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />

            {/* 영상 항목일 때만 재생 아이콘 오버레이를 보여줍니다. */}
            {item.type === "video" && (
              <div className="absolute inset-0 bg-black/15 flex items-center justify-center transition-all duration-300 group-hover:bg-black/25">
                <div className="bg-taupe/90 text-white p-1.5 rounded-full shadow-xs border border-white/25">
                  <Play className="w-3 h-3 fill-white text-white translate-x-[0.5px]" />
                </div>
              </div>
            )}

            {/* 마우스를 올렸을 때 확대 가능함을 알려주는 오버레이입니다. */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
              <div className="bg-white/95 backdrop-blur-xs p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xs">
                <ZoomIn className="w-3.5 h-3.5 text-ink" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 식전 하이라이트 영상을 별도 영역으로 보여줍니다. */}
      <div className="w-full max-w-sm mt-12 pt-10 border-t border-line text-center select-none" id="wedding-video-panel">
        <span className="font-en-title text-3xl text-taupe block mb-1 font-normal tracking-wide">
          Wedding Film
        </span>
        <h3 className="font-kr-title text-base tracking-widest text-ink font-medium uppercase mb-3">
          식전 하이라이트 영상
        </h3>
        <p className="text-xs text-stone-500 font-kr-body leading-relaxed mb-6 px-3">
          가장 반짝이는 빛속에서 써온 두 사람의 러브스토리를<br />
          정성껏 담은 한 편의 따뜻한 영화에 여러분을 초대합니다.
        </p>

        {/* 모바일 화면 비율에 맞춘 영상 플레이어입니다. */}
        <div className="bg-cream p-3 pb-4 rounded-md border border-line shadow-xs">
          <div className="relative w-full aspect-[16/9] bg-stone-950 overflow-hidden border border-line rounded-xs">
            <video
              src="https://raw.githubusercontent.com/gamjabau1/mobile-invite/9b36323d80294dae246d21260f0ceb82d46c3fd5/wedding_video_under_25mb.mp4#t=67"
              controls
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="mt-3 flex justify-between items-center px-1 font-kr-body">
            <span className="text-xs text-taupe font-medium">{weddingData.venueName}, {weddingData.venueHall}</span>
            <span className="font-en-body text-[9px] text-stone-400 tracking-wider">PREVIEW FILM</span>
          </div>
        </div>
      </div>

      {/* 사진을 크게 볼 수 있는 전체 화면 라이트박스입니다. */}
      {activeIdx !== null && (
        <div
          className="fixed inset-0 bg-stone-950/95 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-500"
          onClick={() => setActiveIdx(null)}
          id="gallery-lightbox"
        >
          {/* 라이트박스를 닫는 버튼입니다. */}
          <button
            onClick={() => setActiveIdx(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-50 cursor-pointer animate-fade-in"
            id="lightbox-close-btn"
          >
            <X className="w-6 h-6" />
          </button>

          {/* 라이트박스 사진 이동 버튼입니다. */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50 cursor-pointer"
            id="lightbox-prev-btn"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-all z-50 cursor-pointer"
            id="lightbox-next-btn"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* 선택된 사진 또는 영상을 크게 표시하는 본문입니다. */}
          <div
            className="w-full max-w-sm max-h-[85vh] flex flex-col justify-center items-center gap-4 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
            id="lightbox-content-frame"
          >
            <div className="relative w-full aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden border border-white/10 shadow-2xl flex justify-center items-center">
              {galleryItems[activeIdx].type === "video" ? (
                <video
                  src={galleryItems[activeIdx].videoSrc}
                  poster={galleryItems[activeIdx].src}
                  controls
                  autoPlay
                  playsInline
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  id="lightbox-video-player"
                />
              ) : (
                <img
                  src={galleryItems[activeIdx].src}
                  alt="Enlarged wedding moment"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mx-auto"
                  id="lightbox-photo-view"
                />
              )}
            </div>


            <span className="font-en-body text-[10px] text-white/40 tracking-widest mt-2 select-none">
              {activeIdx + 1} / {galleryItems.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
