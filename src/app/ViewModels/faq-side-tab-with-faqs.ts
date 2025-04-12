import { FAQ } from '../models/faq';

export interface FaqSideTabWithFaqs {
  id?: string;
  title: string;
  content: string;
  order: number;
  faQs: FAQ[];
}
