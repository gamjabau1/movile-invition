import { useState } from "react";
import { Copy, MapPin, Navigation, Car, Train, Bus } from "lucide-react";
import { weddingData } from "../data";

export default function MapSection() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(weddingData.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address.", err);
    }
  };

  const navNaver = () => {
    // Open Naver Map search link for the address
    const url = `https://map.naver.com/v5/search/${encodeURIComponent(weddingData.venueName)}`;
    window.open(url, "_blank");
  };

  const navKakao = () => {
    // Open Kakao Map search link for the address
    const url = `https://map.kakao.com/?q=${encodeURIComponent(weddingData.venueName)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="map-section" className="bg-white px-6 py-16 flex flex-col items-center">
      {/* Editorial Header */}
      <div className="text-center mb-8">
        <span className="font-en-title text-4xl text-taupe block mb-1 select-none tracking-wide">
          Location
        </span>
        <h2 className="font-kr-title text-xl text-ink tracking-widest font-medium uppercase">
          오시는 길
        </h2>
        <div className="w-8 h-[1px] bg-taupe/40 mx-auto mt-4" />
      </div>

      {/* Venue Detail */}
      <div className="text-center mb-6 max-w-md">
        <h3 className="font-kr-title text-lg font-semibold text-ink mb-1">
          {weddingData.venueName}
        </h3>
        <p className="text-xs text-taupe tracking-widest mb-3 font-medium uppercase font-en-title">
          {weddingData.venueHall}
        </p>
        <p className="text-sm text-stone-600 font-kr-body leading-relaxed px-4">
          {weddingData.address}
        </p>
        <p className="text-xs text-stone-400 mt-1 font-en-body">Tel. {weddingData.phone}</p>
      </div>

      {/* Embedded Map Visual/Iframe */}
      <div className="w-full max-w-md h-56 rounded-2xl overflow-hidden border border-line shadow-xs relative mb-6">
        <iframe
          title="Wedding Venue Map"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight={0}
          marginWidth={0}
          src={`https://maps.google.com/maps?q=${encodeURIComponent(weddingData.address + " " + weddingData.venueName)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-md border border-line flex items-center gap-1 font-kr-body">
          <MapPin className="w-3.5 h-3.5 text-taupe" />
          <span className="text-[10px] font-medium text-stone-700 font-kr-body">{weddingData.venueName}</span>
        </div>
      </div>

      {/* Interactive Navigation Control Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md px-2 mb-10 font-kr-body">
        <button
          onClick={copyAddress}
          className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-3 bg-transparent hover:bg-stone-50 border border-stone-200 text-stone-700 rounded-md text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300"
        >
          <Copy className="w-3 h-3 shrink-0" />
          {copied ? "주소 복사 완료!" : "도로명 주소 복사"}
        </button>
        <div className="flex gap-2 flex-1">
          <button
            onClick={navNaver}
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-3 bg-[#03c75a] hover:bg-[#02b350] text-white rounded-md text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300"
          >
            <Navigation className="w-3 h-3 shrink-0" />
            네이버 지도
          </button>
          <button
            onClick={navKakao}
            className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-3 bg-[#fae100] hover:bg-[#ebd300] text-[#3c1e1e] rounded-md text-[11px] font-semibold tracking-wide whitespace-nowrap transition-all duration-300"
          >
            <Navigation className="w-3 h-3 shrink-0" />
            카카오 맵
          </button>
        </div>
      </div>

      {/* Custom Toast Notification inside SPA */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900/90 text-white text-xs px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-2 animate-bounce font-kr-body">
          <span>주소가 클립보드에 복사되었습니다.</span>
        </div>
      )}

      {/* Detailed Public Transport Guides with fine icons */}
      <div className="w-full max-w-md bg-cream/40 border border-line p-6 rounded-2xl">
        <h4 className="font-kr-title text-sm font-semibold tracking-wider text-ink mb-5 uppercase flex items-center gap-2">
          <Car className="w-4 h-4 text-taupe" /> 교통수단 안내
        </h4>

        {/* Subway Guide */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 bg-amber-50 rounded-lg text-amber-800">
              <Train className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-stone-700 font-kr-body">지하철 (Subway)</span>
          </div>
          <ul className="list-none pl-1 space-y-1.5">
            {weddingData.transportation.subway.map((line, idx) => (
              <li key={idx} className="text-xs text-stone-500 leading-relaxed font-kr-body pl-2 border-l border-amber-300">
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* Bus Guide */}
        {weddingData.transportation.bus && weddingData.transportation.bus.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 bg-sky-50 rounded-lg text-sky-800">
                <Bus className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-bold text-stone-700 font-kr-body">버스 (Bus)</span>
            </div>
            <ul className="list-none pl-1 space-y-1.5">
              {weddingData.transportation.bus.map((line, idx) => (
                <li key={idx} className="text-xs text-stone-500 leading-relaxed font-kr-body pl-2 border-l border-sky-300">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Parking Guide */}
        <div className="border-t border-line pt-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1 bg-stone-100 rounded-lg text-stone-700">
              <Car className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold text-stone-700 font-kr-body">자가용 & 주차 안내</span>
          </div>
          <p className="text-xs text-stone-500 font-kr-body leading-relaxed pl-2 border-l border-stone-300">
            {weddingData.transportation.parking}
          </p>
        </div>
      </div>
    </section>
  );
}
