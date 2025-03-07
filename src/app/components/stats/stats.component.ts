import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TableCell } from '../../models/table-cell';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';
import { PageWithTabs } from '../../ViewModels/page-with-tabs';
import { PageService } from '../../services/page.service';
import { ToastrService } from 'ngx-toastr';
import { SideTab } from '../../models/side-tab';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, TranslateModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss',
})
export class StatsComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  darkMode: boolean = false;
  page: PageWithTabs = {
    description: '',
    name: '',
    sideTabs: [{ title: '', order: 0, content: '' }],
  };
  selectedTab: string = this.page.sideTabs[0].title;
  searchTerm = '';
  tableHeaders = [
    { label: 'Services', count: 325 },
    { label: 'Tools', count: 439 },
    { label: 'Places', count: 359 },
    { label: 'Values', count: 453 },
  ];
  tableData: TableCell[][] = [
    [
      { label: 'Law', value: 29 },
      { label: 'Furniture', value: 327 },
      { label: 'Hospitals', value: 24 },
      { label: 'NFTs', value: 2 },
    ],
    [
      { label: 'Medical', value: 234 },
      { label: 'Oil', value: 4 },
      { label: 'Hotels', value: 87 },
      { label: 'Patented', value: 234 },
    ],
    [
      { label: 'IT', value: 234 },
      { label: 'Wood', value: 76 },
      { label: 'Farms', value: 75 },
      { label: 'Paint Art', value: 234 },
    ],
    [
      { label: 'Driver', value: 234 },
      { label: 'Metal', value: 65 },
      { label: 'Offices', value: 57 },
      { label: 'Intellectual Property Rights', value: 33 },
    ],
    [
      { label: 'Engineering', value: 32 },
      { label: 'Chemicals', value: 234 },
      { label: 'Apartments', value: 234 },
      {},
    ],
    [
      { label: 'Law', value: 234 },
      { label: 'Gold', value: 234 },
      { label: 'Ports', value: 76 },
      {},
    ],
    [{}, { label: 'Gas', value: 44 }, { label: 'Colleges', value: 23 }, {}],
    [{}, {}, { label: 'Factors', value: 26 }, {}],
    [{}, {}, { label: 'Laboratory', value: 20 }, {}],
  ];
  totalProjects = 32134;

  isModalOpen: boolean = false;
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  types: string[] = ['Type 1', 'Type 2', 'Type 3'];
  details: string[] = ['Detail 1', 'Detail 2', 'Detail 3'];
  cities: string[] = ['City 1', 'City 2', 'City 3'];
  states: string[] = ['State 1', 'State 2', 'State 3'];
  countries: string[] = ['Country 1', 'Country 2', 'Country 3'];
  providerFields = [
    { label: 'All', selected: false },
    { label: 'Services - In general', selected: false },
    { label: 'Services - Auxiliary arm', selected: false },
    { label: 'Services - Sub services', selected: false },
    { label: 'Tools & Equipments', selected: false },
    { label: 'Places', selected: false },
  ];
  filters = {
    category: '',
    type: '',
    details: '',
    searchQuery: '',
    city: '',
    state: '',
    country: '',
    costFrom: '',
    costTo: '',
    daysFrom: '',
    daysTo: '',
  };
  totalResults: number = 493;

  loadingMore = false;

  constructor(
    private darkModeService: DarkModeService,
    private pageService: PageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
    this.getPage();
  }
  getPage() {
    const sub = this.pageService.getPageByName('Stats').subscribe({
      next: (response) => {
        if (response.isPass) {
          this.page = response.data;
          const firstTab = this.page.sideTabs.find((tab) => tab.order === 1);
          this.selectedTab = firstTab
            ? firstTab.title
            : this.page.sideTabs[0].title;
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
  }
  sortPageBySidetabsOrder(
    sideTabs: Omit<SideTab, 'pageId'>[]
  ): Omit<SideTab, 'pageId'>[] {
    return sideTabs.sort((a, b) => a.order - b.order);
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  clearFilters() {
    this.filters = {
      category: '',
      type: '',
      details: '',
      searchQuery: '',
      city: '',
      state: '',
      country: '',
      costFrom: '',
      costTo: '',
      daysFrom: '',
      daysTo: '',
    };
    this.providerFields.forEach((field) => (field.selected = false));
  }
  selectedProviderFields() {
    var res = '';
    this.providerFields.forEach((element) => {
      if (element.selected) {
        res += element.label + ', ';
      }
    });
    return res.substring(0, res.length - 2);
  }

  submitFilters() {
    this.closeModal();
  }
  onProviderFieldChange(option: any) {
    // Logic for "All" checkbox
    if (option.label === 'All' && option.selected) {
      this.providerFields.forEach((field) => {
        if (field.label !== 'All') field.selected = false;
      });
    } else {
      const allOption = this.providerFields.find(
        (field) => field.label === 'All'
      );
      if (allOption) allOption.selected = false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
