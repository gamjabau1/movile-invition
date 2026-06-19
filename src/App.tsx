/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Phone, MessageCircle, Music, Volume2, VolumeX, Mail, Heart, Sparkles, ChevronDown, Calendar, MapPin, Clock } from "lucide-react";
import { weddingData } from "./data";
import CalendarSection from "./components/CalendarSection";
import GallerySection from "./components/GallerySection";
import MapSection from "./components/MapSection";
import AccountSection from "./components/AccountSection";
import MessageSection from "./components/MessageSection";
import ShareSection from "./components/ShareSection";

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showParentsContact, setShowParentsContact] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Auto-observe entry sections for graceful fade-ins
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    const targetSections = document.querySelectorAll(".fade-section");
    targetSections.forEach((sec) => observer.observe(sec));

    return () => {
      targetSections.forEach((sec) => observer.unobserve(sec));
    };
  }, []);

  const toggleBgm = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => console.log("Audio play blocked", err));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-[#1A1817] text-ink flex justify-center items-start py-0 sm:py-8 transition-colors duration-500">
      {/* 
        Phone-frame View Container (Mobile First Layout)
        Matches the exquisite 9:16 portrait style, framed wonderfully with soft realistic shadows
      */}
      <div className="relative w-full max-w-md bg-cream shadow-2xl min-h-screen sm:min-h-[850px] sm:rounded-3xl overflow-hidden flex flex-col border border-line">
        
        {/* Hidden Audio Channel for Ambient Wedding Piano BGM */}
        <audio
          ref={audioRef}
          src="https://raw.githubusercontent.com/gamjabau1/mobile-invite/9b36323d80294dae246d21260f0ceb82d46c3fd5/Elvis%20Costello%20-%20She.mp3"
          loop
          preload="auto"
        />

        {/* Ambient BGM floating control player */}
        <div className="fixed sm:absolute top-5 right-5 z-40">
          <button
            onClick={toggleBgm}
            className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-xs hover:bg-cream border border-line rounded-full shadow-md text-taupe text-[11px] font-semibold transition-all duration-300 pointer-events-auto cursor-pointer"
          >
            {isPlaying ? (
              <>
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 bg-[#c07d53] h-full rounded-sm animate-pulse" />
                  <span className="w-0.5 bg-[#c07d53] h-2 rounded-sm animate-pulse delay-75" />
                  <span className="w-0.5 bg-[#c07d53] h-3 rounded-sm animate-pulse delay-150" />
                </span>
                <Volume2 className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span className="text-stone-400 font-sans">BGM</span>
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              </>
            )}
          </button>
        </div>

        {/* =======================================================
            SECTION 1: HERO PORTRAIT / MAIN COVER
            ======================================================= */}
        <div className="relative w-full aspect-[9/16] bg-cream overflow-hidden flex flex-col justify-between">
          {/* Main Cover Photo Background */}
          <div className="absolute inset-0 z-0">
            <img
              src={weddingData.images.cover}
              alt="Main wedding photography cover"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[1.02] contrast-[1.01]"
            />
            {/* Elegant subtle soft white vignetting gradient overlay to blend into the frame */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
          </div>

          {/* Top Label script mimicking first image */}
          <div className="relative z-10 pt-16 text-center select-none">
            <p className="font-en-body text-[10px] tracking-[6px] uppercase text-taupe font-semibold mb-2 pl-1">
              Wedding Invitation
            </p>
            <h1 className="font-hand text-5xl text-[#8C6239] leading-none mb-4 animate-fade-in font-medium">
              Love is...
            </h1>
          </div>

          {/* Bottom Info Floating Card (Editorial Glassmorphism) */}
          <div className="relative z-10 mx-6 mb-8 p-5 bg-white/90 backdrop-blur-md border border-line/80 rounded-2xl text-center text-[#3D3935] shadow-md select-none transition-all duration-300">
            <div className="font-en-title tracking-[3px] text-xs uppercase opacity-90 mb-2 flex items-center justify-center gap-1.5 text-taupe font-semibold">
              <span>{weddingData.groom.englishName}</span>
              <Heart className="w-2.5 h-2.5 text-taupe fill-taupe animate-pulse" />
              <span>{weddingData.bride.englishName}</span>
            </div>

            <h2 className="font-kr-title text-xl tracking-[4px] pl-1 mb-3.5 leading-relaxed text-ink font-medium">
              {weddingData.groom.name.split("").join(" ")} &nbsp;&middot;&nbsp; {weddingData.bride.name.split("").join(" ")}
            </h2>

            <div className="w-8 h-[1px] bg-line mx-auto mb-3.5" />

            <p className="text-[11px] tracking-widest font-en-body text-stone-600 font-semibold leading-relaxed mb-1 pt-0.5">
              {weddingData.dateStr}
            </p>
            <p className="text-[10px] tracking-wider font-kr-body text-stone-400 font-medium">
              {weddingData.venueName} &nbsp;&middot;&nbsp; {weddingData.venueHall}
            </p>
          </div>
        </div>

        {/* =======================================================
            SECTION 2: WEDDING GREETING (초대의 글)
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 bg-white px-8 py-20 text-center flex flex-col items-center">
          <div className="mb-8">
            <span className="font-en-title text-4xl font-normal text-taupe block mb-1 select-none tracking-wide">
              Invitation
            </span>
            <h2 className="font-kr-title text-base tracking-[3px] uppercase text-[#A69076] font-medium">
              소중한 분들을 초대합니다
            </h2>
          </div>

          {/* Heartfelt Poetic Verse */}
          <div className="font-kr-title text-[14px] text-stone-600 leading-[2.2] text-center max-w-sm mb-1 select-text font-light">
            <p className="font-semibold text-stone-800 text-base mb-1">“인생은 누구나 비슷한 길을 걸어간다.</p>
            <p className="font-semibold text-stone-800 text-base mb-1">결국엔 늙어서 지난 날을 추억하는 것이란다.</p>
            <p className="font-semibold text-stone-800 text-base mb-4">그러니 결혼은 따뜻한 사람과 하거라”</p>
            <p className="text-xs text-stone-400 mb-10 font-kr-body">- 영화 [어바웃 타임] 中 -</p>
            <div className="space-y-1 text-[13.5px] text-stone-650 font-kr-body">
              <p>평생을 함께할 따뜻한 사람을 만났습니다.</p>
              <p>서로에게 따스한 온기가 될</p>
              <p>저희 두 사람의 새로운 시작을 축복해 주시면 감사하겠습니다.</p>
            </div>
          </div>
        </div>

        {/* =======================================================
            SECTION 3: IMAGE GALLERY (with gorgeous Lightbox)
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 border-t border-line">
          <GallerySection />
        </div>

        {/* =======================================================
            SECTION 4: CALENDAR / COUNTDOWN
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 border-t border-line">
          <CalendarSection />
        </div>

        {/* =======================================================
            SECTION 5: MAPS AND ROAD DIRECTIONS
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 border-t border-line">
          <MapSection />
        </div>

        {/* =======================================================
            SECTION 6: HANDWRITTEN ANNOUNCEMENT / LOGISTIC CARD 
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 bg-cream px-8 py-16 text-center flex flex-col items-center border-t border-line">
          <div className="mb-8">
            <span className="font-en-title text-4xl text-taupe block mb-1 select-none">
              Wedding Info
            </span>
            <h2 className="font-kr-title text-base tracking-[3px] uppercase text-[#A69076] font-medium">
              안내 사항
            </h2>
          </div>

          <div className="w-full max-w-sm space-y-6">
            {/* Meal guide */}
            <div className="bg-white p-6 rounded-2xl border border-line text-left">
              <h4 className="font-kr-title text-sm font-medium text-ink flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-taupe" />
                식사 및 연회 안내
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-kr-body">
                3층 연회장에서 10시 30분부터 12시 30분까지 식사 가능합니다.
              </p>
            </div>

            {/* Traffic guide */}
            <div className="bg-white p-6 rounded-2xl border border-line text-left">
              <h4 className="font-kr-title text-sm font-medium text-ink flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-taupe" />
                교통 안내
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-kr-body">
                삼성역 일대 공사중으로 교통사항이 변동될 수 있어 가급적 대중교통 이용 부탁드립니다.
              </p>
            </div>

            {/* Flowers guide */}
            <div className="bg-white p-6 rounded-2xl border border-line text-left">
              <h4 className="font-kr-title text-sm font-medium text-ink flex items-center gap-1.5 mb-3">
                <Sparkles className="w-4 h-4 text-taupe" />
                마음 전하는 화환 안내
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed font-kr-body">
                정성 가득한 축하 쌀화환을 보내주시면 예식 후 어려운 이웃에게 전달하여, 보내주신 소중한 인연의 마음이 더욱 향기롭게 퍼지도록 쓰이겠습니다.
              </p>
            </div>
          </div>
        </div>

        {/* =======================================================
            SECTION 7: ACCORDION GIFTS / ACCOUNTS
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 border-t border-line">
          <AccountSection />
        </div>

        {/* =======================================================
            SECTION 8: DYNAMIC CONGRATULATORY GUESTBOARD
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 border-t border-line">
          <MessageSection />
        </div>

        {/* =======================================================
            SECTION 9: SOCIAL CHANNELS / SHARE COPIERS
            ======================================================= */}
        <div className="fade-section transition-all duration-1000 ease-out opacity-0 translate-y-8 border-t border-line">
          <ShareSection />
        </div>

      </div>
    </div>
  );
}

