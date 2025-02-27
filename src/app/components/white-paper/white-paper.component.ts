import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-white-paper',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './white-paper.component.html',
  styleUrl: './white-paper.component.scss',
})
export class WhitePaperComponent implements OnInit, OnDestroy {
  private ubscription: Subscription = new Subscription();
  darkMode: boolean = false;
  loadingMore: boolean = false;
  selectedTab: string = 'rules';
  selectTab(tap: string) {
    this.selectedTab = tap;
  }
  constructor(private darkModeService: DarkModeService) {}
  ngOnInit(): void {
    const sub = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
  }
  ngOnDestroy(): void {}
}
