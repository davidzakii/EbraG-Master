import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedTab = 'about';
  searchTerm = '';
  darkMode: boolean = false;
  aboutAccordionItems = [
    {
      title: 'Lorem ipsum 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 2',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 3',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 4',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
  ];

  eCurrentAccordionItems = [
    {
      title: 'Lorem ipsum 5',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 6',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 7',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 8',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
  ];

  howToAccordionItems = [
    {
      title: 'Lorem ipsum 9',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 10',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 11',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
    {
      title: 'Lorem ipsum 12',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a urna quam. Ut eget ultrices sapien. Nam dictum pellentesque est quis elementum.',
    },
  ];

  activeIndex: number | null = null;

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
  }
  selectTab(tab: string) {
    this.activeIndex = null;
    this.selectedTab = tab;
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
