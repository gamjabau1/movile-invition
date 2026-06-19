// 계좌번호 복사 기능에서 공통으로 사용하는 기본 계좌 구조입니다.
export interface AccountInfo {
  bank: string;
  number: string;
  holder: string;
}

// 아코디언 목록에서 역할까지 함께 보여주는 계좌 항목입니다.
export interface AccountDetail {
  role: string;
  bank: string;
  number: string;
  holder: string;
}

// 신랑/신부 개인 정보와 부모님 정보를 표현합니다.
export interface CoupleDetails {
  name: string;
  englishName: string;
  phone: string;
  father: string;
  mother: string;
  fatherDeceased?: boolean;
  motherDeceased?: boolean;
}

// 청첩장 전체에서 공유하는 핵심 데이터 구조입니다.
export interface WeddingData {
  groom: CoupleDetails;
  bride: CoupleDetails;
  dateStr: string; // 화면과 공유 문구에 그대로 표시되는 예식 일시 문장입니다.
  year: number;
  month: number;
  day: number;
  hour: string;
  venueName: string;
  venueHall: string;
  address: string;
  phone: string;
  images: {
    cover: string;
    detail: string;
    cheers: string;
  };
  transportation: {
    subway: string[];
    bus: string[];
    parking: string;
  };
  groomAccount: AccountInfo;
  groomFatherAccount?: AccountInfo;
  brideAccount: AccountInfo;
  brideFatherAccount?: AccountInfo;
  groomAccounts?: AccountDetail[];
  brideAccounts?: AccountDetail[];
}

// 방명록 API와 화면 목록에서 사용하는 축하 메시지 구조입니다.
export interface GuestMessage {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}
