import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { Observable, Subscription } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NgIf, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  loading$!: Observable<boolean>;
  title = 'EbrajGR-master';
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide();
      }
    });
  }
  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$;
    this.cdr.markForCheck();
    const sub = this.languageService.language$.subscribe((value) => {
      this.translate.use(value);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
