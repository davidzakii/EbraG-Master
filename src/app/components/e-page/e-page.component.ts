import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-e-page',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './e-page.component.html',
  styleUrl: './e-page.component.scss',
})
export class EPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  ePageType = '';
  ePageId = '';
  services = [
    {
      name: 'Web developer',
      by: 'UCN',
      cost: '$2,000',
      startDate: 'Apr 24 - 2024',
      barcode: '',
      status: 'Arrived',
    },
    {
      name: 'Content maker',
      by: 'Mosan',
      cost: '$700',
      startDate: 'May 9 - 2024',
      barcode: '',
      status: 'Canceled',
    },
    {
      name: 'Video maker',
      by: 'Uale',
      cost: '$900',
      startDate: 'Apr 24 - 2024',
      barcode: '',
      status: 'Delayed',
    },
    {
      name: 'Translate',
      by: 'Feds',
      cost: '$1,300',
      startDate: 'May 9 - 2024',
      barcode: '',
      status: 'Active',
    },
    {
      name: 'Logo',
      by: 'Rox',
      cost: '$500',
      startDate: 'Apr 24 - 2024',
      barcode: '',
      status: 'On time',
    },
  ];

  productionLinesFinalProductAccordionItems = [
    { title: 'Services - $2000' },
    { title: 'Tools & Equipments - $6000' },
    { title: 'Places - $34000' },
    { title: 'Values - $1000' },
  ];
  activeIndex: number | null = null;
  workName = '<Name of Work>';
  description = '<xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>';
  securityNumber = '<5456>';
  openWorkInfo = true;
  openRoundsLines = true;
  openWorkStatus = true;
  tabWorkStatus = 'preparing';
  tabProductionLine = 'document';
  openFinalProductServices: boolean = true; // Toggle for table visibility
  isModalOpen: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private darkModeService: DarkModeService
  ) {}
  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.ePageId = this.route.snapshot.queryParamMap.get('ePageId') ?? '';
    this.ePageType = this.route.snapshot.queryParamMap.get('ePageType') ?? '';
  }
  collapseOrOpen(type: string) {
    if (type == 'work-info') {
      this.openWorkInfo = !this.openWorkInfo;
    }
    if (type == 'rounds-lines') {
      this.openRoundsLines = !this.openRoundsLines;
    }
    if (type == 'work-status') {
      this.openWorkStatus = !this.openWorkStatus;
    }
  }

  selectWorkStatusTab(tab: string) {
    this.tabWorkStatus = tab;
  }

  selectProductionLineTab(tab: string) {
    this.tabProductionLine = tab;
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  ngOnDestroy() {}
}
