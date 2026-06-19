import { useEffect, useState, FormEvent } from "react";
import { MessageSquare, Trash2, Heart, ShieldCheck, Lock, Send, X, Loader2, Phone, MessageCircle } from "lucide-react";
import { GuestMessage } from "../types";
import { weddingData } from "../data";

export default function MessageSection() {
  const [messages, setMessages] = useState<GuestMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  // Deleting State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletePass, setDeletePass] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Load Messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      } else {
        setError("메시지를 불러오는 데 실패했습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("서버 케이블 점검 혹은 네트워크 상태를 확인하세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Post Message
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          content: content.trim(),
          password: password.trim() ? password.trim() : undefined,
        }),
      });

      if (res.ok) {
        const newMessage = await res.json();
        setMessages((prev) => [newMessage, ...prev]);
        setName("");
        setContent("");
        setPassword("");
      } else {
        const errData = await res.json();
        setError(errData.error || "메시지 등록 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error(err);
      setError("서버 연결 실패. 네트워크 연결 상태를 확인하고 다시 시도하세요.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Action submit
  const handleDeleteSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!deletingId) return;

    setDeleting(true);
    setDeleteError("");

    try {
      const res = await fetch(`/api/messages/${deletingId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: deletePass }),
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== deletingId));
        setDeletingId(null);
        setDeletePass("");
      } else {
        const errData = await res.json();
        setDeleteError(errData.error || "메시지 삭제 중 오류가 발생했습니다.");
      }
    } catch (err) {
      console.error(err);
      setDeleteError("서버 연결 실패. 비밀번호를 다시 확인하세요.");
    } finally {
      setDeleting(false);
    }
  };

  // Format date readable
  const formatDate = (isoStr: string) => {
    try {
      const date = new Date(isoStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hh = String(date.getHours()).padStart(2, "0");
      const mm = String(date.getMinutes()).padStart(2, "0");
      return `${year}.${month}.${day} ${hh}:${mm}`;
    } catch (e) {
      return "";
    }
  };

  return (
    <section id="message-section" className="bg-white px-6 py-16 flex flex-col items-center relative">
      {/* Editorial Header */}
      <div className="text-center mb-8">
        <span className="font-en-title text-4xl text-taupe block mb-1 select-none tracking-wide">
          Guest Book
        </span>
        <h2 className="font-kr-title text-xl text-ink tracking-widest font-medium uppercase font-kr-title">
          축하 메시지
        </h2>
        <div className="w-8 h-[1px] bg-taupe/40 mx-auto mt-4" />
      </div>

      <p className="text-xs text-stone-500 font-kr-body text-center leading-relaxed max-w-sm mb-10 px-4">
        신랑 신부에게 마음을 전하는 소중한 공간입니다.<br />
        남겨주신 축복 가득한 한마디 한마디 깊이 감사히 읽겠습니다.
      </p>

      {/* Input Message Form */}
      <div className="w-full max-w-md bg-cream border border-line p-6 rounded-2xl shadow-xs transition-all duration-300 mb-10 font-kr-body">
        <h3 className="font-kr-title text-sm font-semibold tracking-wider text-stone-700 mb-4 flex items-center gap-1.5 justify-center">
          <Heart className="w-4 h-4 text-taupe fill-taupe animate-pulse" />
          축복 메시지 남기기
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] font-kr-body text-stone-400 font-semibold uppercase tracking-wider block mb-1.5 pl-1">
                이름 (Name)
              </label>
              <input
                required
                type="text"
                placeholder="홍길동"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                className="w-full bg-white border border-line text-stone-700 font-kr-body px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-taupe transition-colors"
              />
            </div>
            <div>
              <label className="text-[10px] font-kr-body text-stone-400 font-semibold uppercase tracking-wider block mb-1.5 pl-1 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-stone-400" />
                삭제 비밀번호 (Pass)
              </label>
              <input
                type="password"
                placeholder="4자리 숫자"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={10}
                className="w-full bg-white border border-line text-stone-700 font-kr-body px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-taupe transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-kr-body text-stone-400 font-semibold uppercase tracking-wider block mb-1.5 pl-1">
              축하 메시지 (Wishes)
            </label>
            <textarea
              required
              rows={4}
              placeholder="따뜻한 축하의 메시지를 남겨주세요."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={450}
              className="w-full bg-white border border-line text-ink font-kr-body p-3.5 rounded-xl text-xs focus:outline-none focus:border-taupe resize-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || !name.trim() || !content.trim()}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-ink hover:bg-stone-800 disabled:bg-stone-300 text-white font-kr-body text-xs font-semibold rounded-md tracking-wider transition-all shadow-xs cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                전송 중...
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                등록하기
              </>
            )}
          </button>
        </form>

        {error && (
          <p className="mt-3 text-center text-[11px] text-taupe font-kr-body leading-relaxed">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* Guest Feed / wishing list */}
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-3 mb-6">
          <span className="text-xs font-kr-title font-bold text-stone-700 flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-taupe" />
            등록된 메시지 ({messages.length})
          </span>
          <button
            onClick={fetchMessages}
            className="text-[10px] font-kr-body text-stone-400 hover:text-stone-700 font-semibold tracking-wider flex items-center gap-1 cursor-pointer"
          >
            새로고침
          </button>
        </div>

        {loading && messages.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-taupe" />
            <span className="text-xs text-stone-400 font-kr-body">메시지 노트를 불러오고 있습니다...</span>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 bg-cream border border-dashed border-line rounded-2xl">
            <Heart className="w-6 h-6 text-stone-300 mx-auto mb-2" />
            <p className="text-xs text-stone-400 font-kr-body leading-relaxed">
              아직 등록된 축하 메시지가 없습니다.<br />
              첫 번째 따뜻한 마음의 주인공이 되어주세요.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="bg-cream hover:bg-[#faf6f1] border border-line p-5 rounded-2xl relative shadow-xs transition-all duration-300 group"
              >
                {/* Header card info */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-kr-title font-semibold text-ink">
                      {msg.name}
                    </span>
                    <span className="text-[9px] font-en-body text-stone-400 font-semibold">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  {/* Delete button (only show on interaction or for touch compatibility) */}
                  <button
                    onClick={() => {
                      setDeletingId(msg.id);
                      setDeletePass("");
                      setDeleteError("");
                    }}
                    className="p-1 px-2 border border-transparent rounded-lg hover:bg-taupe/10 text-stone-300 hover:text-taupe hover:border-taupe/10 transition-colors cursor-pointer"
                    title="메시지 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content body with line breaks */}
                <p className="text-xs font-kr-body text-stone-600 leading-relaxed whitespace-pre-line text-left">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dynamic Couple Contact Section with calling & messaging */}
      <div className="w-full max-w-md mt-12 pt-8 border-t border-line text-center">
        <h3 className="font-kr-title text-sm font-semibold tracking-wider text-stone-700 mb-4">
          신랑 & 신부에게 축하 인사 전하기
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {/* Groom Contact Button card */}
          <div className="bg-cream/40 border border-line p-5 rounded-2xl flex flex-col items-center justify-between">
            <div className="text-center mb-3">
              <span className="text-[10px] font-en-body bg-blue-50 text-blue-600 font-medium px-2 py-0.5 rounded-full inline-block mb-1"> Groom </span>
              <p className="text-sm font-semibold text-stone-700">신랑 {weddingData.groom.name}</p>
            </div>
            <div className="flex gap-2 w-full justify-center">
              <a
                href={`tel:${weddingData.groom.phone}`}
                className="flex-1 py-2 bg-white border border-line hover:bg-cream text-taupe rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5 text-xs font-semibold"
                title="신랑에게 전화하기"
              >
                <Phone className="w-3.5 h-3.5" />
                전화
              </a>
              <a
                href={`sms:${weddingData.groom.phone}`}
                className="flex-1 py-2 bg-white border border-line hover:bg-cream text-stone-500 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5 text-xs font-semibold"
                title="신랑에게 메시지하기"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                문자
              </a>
            </div>
          </div>

          {/* Bride Contact Button card */}
          <div className="bg-cream/40 border border-line p-5 rounded-2xl flex flex-col items-center justify-between">
            <div className="text-center mb-3">
              <span className="text-[10px] font-en-body bg-pink-50 text-pink-600 font-medium px-2 py-0.5 rounded-full inline-block mb-1"> Bride </span>
              <p className="text-sm font-semibold text-stone-700">신부 {weddingData.bride.name}</p>
            </div>
            <div className="flex gap-2 w-full justify-center">
              <a
                href={`tel:${weddingData.bride.phone}`}
                className="flex-1 py-2 bg-white border border-line hover:bg-cream text-taupe rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5 text-xs font-semibold"
                title="신부에게 전화하기"
              >
                <Phone className="w-3.5 h-3.5" />
                전화
              </a>
              <a
                href={`sms:${weddingData.bride.phone}`}
                className="flex-1 py-2 bg-white border border-line hover:bg-cream text-stone-500 rounded-xl transition-colors cursor-pointer shadow-xs flex items-center justify-center gap-1.5 text-xs font-semibold"
                title="신부에게 메시지하기"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                문자
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Delete Overlay Prompt Inside Module */}
      {deletingId && (
        <div className="fixed inset-0 bg-stone-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-xs p-6 shadow-2xl border border-line animate-scale-up font-kr-body">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <span className="text-xs font-kr-title font-bold text-stone-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-taupe" />
                축합글 비밀번호 확인
              </span>
              <button
                onClick={() => setDeletingId(null)}
                className="text-stone-400 hover:text-stone-700 p-0.5 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDeleteSubmit} className="space-y-4">
              <p className="text-[11px] text-stone-500 font-kr-body leading-relaxed text-left">
                글 작성 시 설정하신 삭제 비밀번호를 입력해주세요. 비밀번호가 설정되지 않은 글은 바로 삭제를 도와드립니다.
              </p>

              <div>
                <label className="text-[9px] font-kr-body block mb-1">
                  비밀번호 입력
                </label>
                <input
                  type="password"
                  required
                  placeholder="비밀번호"
                  value={deletePass}
                  onChange={(e) => setDeletePass(e.target.value)}
                  className="w-full bg-stone-50 border border-line text-stone-700 font-kr-body px-3.5 py-2 rounded-xl text-xs focus:outline-none focus:border-taupe transition-all"
                  autoFocus
                />
              </div>

              {deleteError && (
                <p className="text-[10px] text-taupe font-kr-body text-left leading-relaxed">
                  ⚠️ {deleteError}
                </p>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingId(null)}
                  className="flex-1 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-xl text-xs font-medium cursor-pointer transition-colors font-kr-body"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={deleting}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2 bg-taupe hover:bg-taupe/90 text-white rounded-xl text-xs font-medium cursor-pointer transition-colors disabled:bg-stone-300 font-kr-body"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      삭제 중
                    </>
                  ) : (
                    "삭제완료"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
