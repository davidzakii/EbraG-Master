export interface Feedback {
  name: string;
  email: string;
  message: string;
  reasonIds: string[];
}

export interface FeedbackResponse {
  isPass: boolean;
  data: FeedbackData[];
}

export interface FeedbackData {
  reasonIds: number[];
  [key: string]: any;
}
