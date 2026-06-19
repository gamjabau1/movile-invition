import { useState } from "react";
import { Check, Copy, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { weddingData } from "../data";

// 신랑측/신부측 계좌 목록을 아코디언으로 보여주고 계좌번호 복사를 처리합니다.
export default function AccountSection() {
  // 한쪽 계좌 목록만 펼쳐지도록 신랑측/신부측 상태를 따로 관리합니다.
  const [openGroom, setOpenGroom] = useState(false);
  const [openBride, setOpenBride] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  // 선택한 계좌번호를 복사하고 하단 토스트 문구를 잠시 표시합니다.
  const handleCopy = async (accountNumber: string, holder: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopiedText(`${holder}님의 계좌번호가 복사되었습니다.`);
      setTimeout(() => setCopiedText(""), 2200);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <section id="account-section" className="bg-cream px-6 py-16 flex flex-col items-center">
      {/* 계좌 안내 섹션 제목입니다. */}
      <div className="text-center mb-8">
        <span className="font-en-title text-4xl text-taupe block mb-1 select-none tracking-wide">
          Sharing Love
        </span>
        <h2 className="font-kr-title text-xl text-ink tracking-widest font-medium uppercase">
          마음 전하실 곳
        </h2>
        <div className="w-8 h-[1px] bg-taupe/40 mx-auto mt-4" />
      </div>

      <p className="text-xs text-stone-500 font-kr-body text-center leading-relaxed max-w-sm mb-10 px-4">
        저희의 새로운 발걸음을 격려해 주시는 모든 분들께 감사드립니다.<br />
        참석이 고우신 분들의 따뜻한 마음을 소중히 간직해 살아가겠습니다.
      </p>

      {/* 신랑측과 신부측 계좌 목록을 접고 펼치는 컨테이너입니다. */}
      <div className="w-full max-w-md space-y-4">
        {/* 신랑측 계좌 목록입니다. */}
        <div className="bg-white border border-line rounded-2xl overflow-hidden transition-all duration-300">
          <button
            onClick={() => {
              setOpenGroom(!openGroom);
              setOpenBride(false);
            }}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          >
            <span className="flex items-center gap-2 font-kr-title text-sm font-semibold text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              신랑측 마음 전하실 곳
            </span>
            {openGroom ? (
              <ChevronUp className="w-4 h-4 text-taupe" />
            ) : (
              <ChevronDown className="w-4 h-4 text-taupe" />
            )}
          </button>

          {openGroom && (
            <div className="px-6 pb-6 pt-2 border-t border-line bg-cream/40 space-y-4 animate-fade-in">
              {weddingData.groomAccounts?.map((acc, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-line gap-3">
                  <div className="text-left font-kr-body">
                    <span className="text-[10px] text-blue-500 font-semibold tracking-wider block mb-1">
                      {acc.role}
                    </span>
                    <p className="text-xs text-stone-400 font-medium">{acc.bank}</p>
                    <p className="text-sm font-semibold text-stone-700 my-0.5 font-en-body">{acc.number}</p>
                    <p className="text-xs text-stone-500 font-kr-body">예금주: {acc.holder}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.number, acc.holder)}
                    className="self-start sm:self-center inline-flex items-center gap-1 px-3 py-1.5 bg-cream hover:bg-line text-taupe border border-line rounded-md text-xs font-semibold cursor-pointer transition-all font-kr-body"
                  >
                    <Copy className="w-3 h-3" />
                    복사하기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 신부측 계좌 목록입니다. */}
        <div className="bg-white border border-line rounded-2xl overflow-hidden transition-all duration-300">
          <button
            onClick={() => {
              setOpenBride(!openBride);
              setOpenGroom(false);
            }}
            className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
          >
            <span className="flex items-center gap-2 font-kr-title text-sm font-semibold text-stone-700">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
              신부측 마음 전하실 곳
            </span>
            {openBride ? (
              <ChevronUp className="w-4 h-4 text-taupe" />
            ) : (
              <ChevronDown className="w-4 h-4 text-taupe" />
            )}
          </button>

          {openBride && (
            <div className="px-6 pb-6 pt-2 border-t border-line bg-cream/40 space-y-4 animate-fade-in">
              {weddingData.brideAccounts?.map((acc, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-line gap-3">
                  <div className="text-left font-kr-body">
                    <span className="text-[10px] text-pink-500 font-semibold tracking-wider block mb-1">
                      {acc.role}
                    </span>
                    <p className="text-xs text-stone-400 font-medium">{acc.bank}</p>
                    <p className="text-sm font-semibold text-stone-700 my-0.5 font-en-body">{acc.number}</p>
                    <p className="text-xs text-stone-500 font-kr-body">예금주: {acc.holder}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(acc.number, acc.holder)}
                    className="self-start sm:self-center inline-flex items-center gap-1 px-3 py-1.5 bg-cream hover:bg-line text-taupe border border-line rounded-md text-xs font-semibold cursor-pointer transition-all font-kr-body"
                  >
                    <Copy className="w-3 h-3" />
                    복사하기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 계좌번호 복사가 완료되었음을 알려주는 토스트입니다. */}
      {copiedText && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900/90 text-white text-xs px-4 py-2.5 rounded-full shadow-lg z-50 flex items-center gap-2">
          <Heart className="w-3.5 h-3.5 text-taupe fill-taupe animate-pulse" />
          <span>{copiedText}</span>
        </div>
      )}
    </section>
  );
}
