import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PublicLawComponent } from './components/public-law/public-law.component';
import { StatsComponent } from './components/stats/stats.component';
import { TalkComponent } from './components/talk/talk.component';
import { RegisterComponent } from './components/register/register.component';
import { CompassEventsComponent } from './components/compass-events/compass-events.component';
import { CompassJobsComponent } from './components/compass-jobs/compass-jobs.component';
import { CompassArmsComponent } from './components/compass-arms/compass-arms.component';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { MyWalletComponent } from './components/my-wallet/my-wallet.component';
import { PresentersComponent } from './components/presenters/presenters.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { FooterDisclosuresComponent } from './components/footer-disclosures/footer-disclosures.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { EPageComponent } from './components/e-page/e-page.component';
import { WhitePaperComponent } from './components/white-paper/white-paper.component';
import { adminGuard } from './guards/admin.guard';
import { DashboardLayoutComponent } from './components/dashboard/dashboard-layout/dashboard-layout.component';
import { FeedbackModalComponent } from './components/feedback-modal/feedback-modal.component';
import { ManageUsersComponent } from './components/dashboard/manage-users/manage-users.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { FeedbackUsersComponent } from './components/dashboard/feedback-users/feedback-users.component';
import { MainDashboardComponent } from './components/dashboard/main-dashboard/main-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'public-law',
        component: PublicLawComponent,
      },
      { path: 'stats', component: StatsComponent },
      {
        path: 'talk',
        component: TalkComponent,
        children: [
          {
            path: '',
            component: TalkComponent,
          },
        ],
      },
      {
        path: 'compass',
        children: [
          { path: '', redirectTo: 'events', pathMatch: 'full' },
          { path: 'events', component: CompassEventsComponent },
          { path: 'jobs', component: CompassJobsComponent },
          { path: 'arms', component: CompassArmsComponent },
        ],
      },
      {
        path: 'presenters',
        component: PresentersComponent,
        children: [],
      },
      {
        path: 'providers',
        component: ProvidersComponent,
        children: [],
      },
      {
        path: 'my-profile',
        canActivate: [authGuard],
        children: [
          { path: '', component: MyProfileComponent },
          { path: 'my-wallet', component: MyWalletComponent },
        ],
      },

      { path: 'white-paper', component: WhitePaperComponent },
      { path: 'faqs', component: FaqsComponent },
      { path: 'e-page', component: EPageComponent },
      {
        path: 'disclosures',
        component: FooterDisclosuresComponent,
      },
      { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [noAuthGuard],
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    component: DashboardLayoutComponent,
    children: [
      { path: '', redirectTo: 'manage-user', pathMatch: 'full' },
      { path: '', component: MainDashboardComponent },
      { path: 'feedback', component: FeedbackUsersComponent },
      { path: 'manage-user', component: ManageUsersComponent },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
