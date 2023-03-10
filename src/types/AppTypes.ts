export type Meeting = {
  image: null | string;
  id: number;
  masterId: number;
  master: boolean;
  title: string;
  content: string;
  category: string;
  startDate: string;
  startTime: string;
  duration: string;
  platform: string;
  maxNum: number;
  secret: boolean;
  password: string;
  attend: boolean;
  attendantsNum: number;
  attendantsList: {
    userId: number;
    userProfileImg: string;
  }[];
};

export type AttendantsList = {
  userId: number;
  userProfileImg: string;
};

export type InitialState = { meetingList: Meeting[] };

export type LoginInputField = { email: string; password: string };

export type HomeState = { home: InitialState };

export type PostForm = {
  title: string;
  category: string;
  startDate: string;
  startTime: string;
  duration: string;
  platform: string;
  link: string;
  content: string;
  maxNum: string;
  secret: boolean;
  password: string;
};

export type Modal = {
  name: string;
  title: string;
  content: string | null;
  isOpen: boolean;
  options: string[] | null;
};

export type SignUp = {
  email: string;
  authNumber?: string;
  username: string;
  password: string;
  passwordCheck?: string;
  emailAuth?: boolean;
  hidePassword?: boolean;
};
export type EmailAuthType = {
  email: string;
  authNumber: string;
};

export type RePasswordType = {
  email: string;
  password: string;
};

export type PostFormData = {
  title: string;
  content: string;
  link: string;
  profileMsg: string;
  username: string;
};
