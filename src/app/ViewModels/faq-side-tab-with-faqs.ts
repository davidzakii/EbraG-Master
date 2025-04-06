import { FAQ } from '../models/faq';
import { SideTab } from '../models/side-tab';

export interface FaqSideTabWithFaqs {
  id?: string;
  title: string;
  content: string;
  order: number;
  faQs: FAQ[];
}
