export interface AccountInfo {
  bank: string;
  number: string;
  holder: string;
}

export interface AccountDetail {
  role: string;
  bank: string;
  number: string;
  holder: string;
}

export interface CoupleDetails {
  name: string;
  englishName: string;
  phone: string;
  father: string;
  mother: string;
  fatherDeceased?: boolean;
  motherDeceased?: boolean;
}

export interface WeddingData {
  groom: CoupleDetails;
  bride: CoupleDetails;
  dateStr: string; // "2026년 9월 5일 토요일 오후 12시 30분"
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

export interface GuestMessage {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}
