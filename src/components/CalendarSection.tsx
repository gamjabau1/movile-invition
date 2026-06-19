import { useEffect, useState } from "react";
import { weddingData } from "../data";

// 예식 날짜를 달력에 표시하고 남은 시간을 실시간 카운트다운으로 보여줍니다.
export default function CalendarSection() {
  // JavaScript Date의 month는 0부터 시작하므로 weddingData.month에서 1을 뺍니다.
  const targetDate = new Date(weddingData.year, weddingData.month - 1, weddingData.day, 12, 30, 0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    // 현재 시각과 예식 시각의 차이를 초 단위로 다시 계산합니다.
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // weddingData에 설정된 연월을 기준으로 달력 배열을 동적으로 만듭니다.
  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  
  const firstDayOfMonth = new Date(weddingData.year, weddingData.month - 1, 1);
  const startOffset = firstDayOfMonth.getDay(); // (0 = Sunday, 1 = Monday, etc.)
  const daysInMonth = new Date(weddingData.year, weddingData.month, 0).getDate();

  // 월 시작 전 빈 칸(null)과 실제 날짜를 합쳐 7열 그리드에 맞춥니다.
  const gridCells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) {
    gridCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    gridCells.push(day);
  }

  return (
    <section id="calendar-section" className="bg-cream px-6 py-16 flex flex-col items-center">
      {/* 캘린더 섹션 제목입니다. */}
      <span className="font-en-title text-4xl text-taupe mb-2 opacity-90 select-none tracking-wide">
        Save the Date
      </span>
      <h3 className="font-en-title text-2xl text-ink tracking-widest font-normal mb-6">
        {weddingData.year} . {String(weddingData.month).padStart(2, "0")} . {String(weddingData.day).padStart(2, "0")}
      </h3>

      {/* 예식 날짜가 동그라미로 강조되는 월간 달력입니다. */}
      <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xs border border-line transition-transform duration-300 hover:scale-[1.01]">
        {/* 요일 헤더입니다. */}
        <div className="grid grid-cols-7 text-center gap-y-3 mb-2 font-kr-body">
          {weekDays.map((wd, idx) => (
            <span
              key={wd}
              className={`text-xs font-semibold tracking-wider select-none ${
                idx === 0 ? "text-taupe" : idx === 6 ? "text-blue-500/80" : "text-stone-300"
              }`}
            >
              {wd}
            </span>
          ))}
        </div>

        {/* 날짜 칸을 순서대로 렌더링합니다. */}
        <div className="grid grid-cols-7 text-center gap-y-3 relative">
          {gridCells.map((day, index) => {
            const isTarget = day === weddingData.day;
            const isSunday = index % 7 === 0;
            const isSaturday = index % 7 === 6;

            return (
              <div
                key={index}
                className="relative h-10 flex items-center justify-center text-sm font-en-body"
              >
                {day !== null ? (
                  <>
                    <span
                      className={`relative z-10 font-medium ${
                        isTarget
                          ? "text-white font-semibold"
                          : isSunday
                          ? "text-taupe/80"
                          : isSaturday
                          ? "text-blue-500/80"
                          : "text-stone-700"
                      }`}
                    >
                      {day}
                    </span>
                    {isTarget && (
                      <div className="absolute inset-0 m-auto w-10 h-10 calendar-circle bg-taupe rounded-full flex items-center justify-center -z-10">
                        {/* 예식일을 한눈에 보이게 하는 강조 원입니다. */}
                        <span className="hidden md:block absolute w-12 h-12 border-2 border-dashed border-taupe rounded-full scale-110 pointer-events-none" />
                      </div>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 예식일까지 남은 일/시/분/초를 보여주는 카운트다운입니다. */}
      <div className="mt-10 text-center">
        {!timeLeft.isOver ? (
          <div className="flex flex-col items-center">
            <p className="text-[10px] font-en-body text-stone-400 tracking-[3px] uppercase mb-4">
              THE CELEBRATION COUNTDOWN
            </p>
            <div className="flex gap-4">
              <div className="bg-white px-3 py-2 rounded-xl border border-line min-w-[64px] text-center shadow-xs">
                <span className="block font-en-title text-2xl font-light text-ink">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] text-stone-400 font-en-body tracking-wide">DAYS</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-xl border border-line min-w-[64px] text-center shadow-xs">
                <span className="block font-en-title text-2xl font-light text-ink">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] text-stone-400 font-en-body tracking-wide">HOURS</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-xl border border-line min-w-[64px] text-center shadow-xs">
                <span className="block font-en-title text-2xl font-light text-ink">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] text-stone-400 font-en-body tracking-wide">MINS</span>
              </div>
              <div className="bg-white px-3 py-2 rounded-xl border border-line min-w-[64px] text-center shadow-xs">
                <span className="block font-en-title text-2xl font-light text-ink">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] text-stone-400 font-en-body tracking-wide">SECS</span>
              </div>
            </div>
            <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-line rounded-md text-[11px] font-medium text-taupe uppercase tracking-widest font-en-body">
              <span className="w-1.5 h-1.5 rounded-full bg-taupe animate-ping" />
              D - {timeLeft.days}
            </div>
          </div>
        ) : (
          <div className="bg-white border border-line px-6 py-4 rounded-2xl">
            <p className="font-kr-title text-stone-700 font-medium text-sm leading-relaxed">
              🎉 두 사람의 새로운 여정이 시작되었습니다. 🎉<br />
              많은 예쁜 축복에 가슴 깊이 감사드립니다.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
