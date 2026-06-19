import { useState } from "react";
import { Copy, MessageCircle, Send, Heart, Share2 } from "lucide-react";
import { weddingData } from "../data";

// 초대장 링크를 복사하거나 모바일 공유/SMS로 전달하는 섹션입니다.
export default function ShareSection() {
  const [copied, setCopied] = useState(false);

  // 네이티브 공유를 지원하지 않는 브라우저에서 현재 URL을 클립보드에 복사합니다.
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // 모바일 브라우저가 제공하는 기본 공유 시트를 우선 사용합니다.
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${weddingData.groom.name} & ${weddingData.bride.name} 모바일 청첩장`,
          text: `${weddingData.groom.name} & ${weddingData.bride.name}의 소중한 결혼식에 축복 가득한 걸음으로 함께해 주시기 바랍니다.`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Native share dismissed/failed", err);
      }
    } else {
      copyLink();
    }
  };

  // 문자 앱을 열고 청첩장 안내 문구를 미리 채워 넣습니다.
  const sendSMS = () => {
    const message = `[모바일 청첩장] ${weddingData.groom.name} & ${weddingData.bride.name}\n\n저희 두 사람이 사랑과 믿음으로 한 가정을 이루려 합니다. 오셔서 저희의 시작을 축복해 주시기 바랍니다.\n\n일시: ${weddingData.dateStr}\n장소: ${weddingData.venueName}\n청첩장 링크: ${window.location.href}`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.location.href = smsUrl;
  };

  return (
    <section id="share-section" className="bg-cream px-6 py-16 flex flex-col items-center">
      {/* 공유 섹션 제목입니다. */}
      <div className="text-center mb-8">
        <span className="font-hand text-4xl text-taupe block mb-1 select-none">
          Share Love
        </span>
        <h2 className="font-serif text-xl text-ink tracking-widest font-normal uppercase">
          초대장 공유하기
        </h2>
        <div className="w-8 h-[1px] bg-taupe mx-auto mt-4" />
      </div>

      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-12">
        <button
          onClick={shareNative}
          className="flex flex-col items-center justify-center p-5 bg-white border border-line hover:bg-cream rounded-2xl gap-2 shadow-xs transition-colors cursor-pointer group"
        >
          <div className="p-3 bg-stone-50 rounded-full group-hover:bg-line transition-all">
            <Share2 className="w-4 h-4 text-ink" />
          </div>
          <span className="text-[11px] font-sans font-semibold text-stone-600">초대장 링크 전송</span>
        </button>

        <button
          onClick={sendSMS}
          className="flex flex-col items-center justify-center p-5 bg-white border border-line hover:bg-cream rounded-2xl gap-2 shadow-xs transition-colors cursor-pointer group"
        >
          <div className="p-3 bg-stone-50 rounded-full group-hover:bg-line transition-all">
            <Send className="w-4 h-4 text-ink" />
          </div>
          <span className="text-[11px] font-sans font-semibold text-stone-600">문자로 공유하기</span>
        </button>
      </div>

      {/* 청첩장의 마지막 인사와 저작권 문구입니다. */}
      <div className="text-center border-t border-line pt-12 w-full max-w-md select-none">
        <div className="font-hand text-6xl text-taupe leading-none mb-1 opacity-90">
          With Love
        </div>
        <p className="font-serif text-[11px] tracking-[6px] uppercase text-stone-400 font-semibold mb-4">
          {weddingData.groom.englishName} & {weddingData.bride.englishName}
        </p>
        <p className="font-sans text-[10px] text-stone-400">
          Copyright © 2026. All rights reserved.
        </p>
      </div>

      {/* 링크 복사가 완료되었음을 알려주는 토스트입니다. */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900/90 text-white text-xs px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-2 animate-bounce">
          <span>링크가 클립보드에 복사되었습니다.</span>
        </div>
      )}
    </section>
  );
}
