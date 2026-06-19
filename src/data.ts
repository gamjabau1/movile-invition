import { WeddingData } from "./types";
 
export const weddingData: WeddingData = {
  groom: {
    name: "방지원",
    englishName: "Ji-won",
    phone: "010-1234-5678",
    father: "방봉수",
    mother: "이선숙"
  },
  bride: {
    name: "유선주",
    englishName: "you sun ju",
    phone: "010-9876-5432",
    father: "유영식",
    mother: "박복임"
  },
  dateStr: "2027년 4월 18일 일요일 오후 12시 30분",
  year: 2027,
  month: 4,
  day: 18,
  hour: "12:30",
  venueName: "더베일리하우스 삼성점",
  venueHall: "2F 단독홀",
  address: "서울특별시 강남구 영동대로 506",
  phone: "02-539-2956",
  images: {
    cover: "https://raw.githubusercontent.com/gamjabau1/mobile-invite/9b36323d80294dae246d21260f0ceb82d46c3fd5/HO_00385_%EC%88%98%EC%A0%95.jpg",
    detail: "/src/assets/images/wedding_hand_hold_1781833609106.jpg",
    cheers: "/src/assets/images/wedding_cheers_1781833622217.jpg"
  },
  transportation: {
    subway: [
      "2호선 [삼성역] 8번 출구 앞",
      "삼성역 공사중으로 지하철 입구가 변동 될 수 있습니다."
    ],
    bus: [],
    parking: "2시간 무료 주차 가능합니다. 주차권은 1층 인포데스크에서 받아주시길 바랍니다."
  },
  groomAccount: {
    bank: "우리은행",
    number: "1234",
    holder: "방지원"
  },
  groomFatherAccount: {
    bank: "신한은행",
    number: "1234",
    holder: "방봉수"
  },
  brideAccount: {
    bank: "카카오뱅크",
    number: "5678",
    holder: "유선주"
  },
  brideFatherAccount: {
    bank: "국민은행",
    number: "5678",
    holder: "유영식"
  },
  groomAccounts: [
    { role: "혼주 방봉수", bank: "신한은행", number: "1234", holder: "방봉수" },
    { role: "혼주 이선숙", bank: "우리은행", number: "1234", holder: "이선숙" },
    { role: "신랑 방지원", bank: "우리은행", number: "1234", holder: "방지원" }
  ],
  brideAccounts: [
    { role: "혼주 유영식", bank: "국민은행", number: "5678", holder: "유영식" },
    { role: "혼주 박복임", bank: "카카오뱅크", number: "5678", holder: "박복임" },
    { role: "신부 유선주", bank: "카카오뱅크", number: "5678", holder: "유선주" }
  ]
};
