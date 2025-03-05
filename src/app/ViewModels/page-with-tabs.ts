import { SideTab } from '../models/side-tab';

export interface PageWithTabs {
  name: string;
  description: string;
  sideTabs: Omit<SideTab, 'pageId'>[];
}
