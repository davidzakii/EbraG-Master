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
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, NgIf, AsyncPipe, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  isModalOpen = true;
  userAgree = true;
  darkMode: boolean = false;
  loading$!: Observable<boolean>;
  title = 'EbrajGR-master';
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private router: Router,
    private loaderService: LoaderService,
    private cdr: ChangeDetectorRef,
    private darkModeService: DarkModeService
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
    const sub1 = this.darkModeService.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
    this.subscription.add(sub);
    this.subscription.add(sub1);
  }

  closeModal() {
    this.isModalOpen = false;
    this.router.navigate(['/home']);
  }
  isUserDisagree() {
    this.userAgree = false;
    this.isModalOpen= false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
