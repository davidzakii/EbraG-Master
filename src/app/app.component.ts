import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  title = 'EbrajGR-master';
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}
  ngOnInit(): void {
    const sub = this.languageService.language$.subscribe((value) => {
      this.translate.use(value);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
