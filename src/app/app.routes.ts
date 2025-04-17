import { Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { thanksGuard } from './guards/thanks.guard';
import { UpdateJobComponent } from './components/dashboard/update-job/update-job.component';
import { AddJobCategoryComponent } from './components/dashboard/add-job-category/add-job-category.component';
import { UpdateJobCategoryComponent } from './components/dashboard/update-job-category/update-job-category.component';
import { AddRequirementComponent } from './components/dashboard/add-requirement/add-requirement.component';
import { UpdateRequirementComponent } from './components/dashboard/update-requirement/update-requirement.component';

export const routes: Routes = [
  {
    path: 'thanks',
    canActivate: [thanksGuard],
    loadComponent: () =>
      import('./components/thanks/thanks.component').then(
        (m) => m.ThanksComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/app-layout/app-layout.component').then(
        (m) => m.AppLayoutComponent
      ),
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'public-law',
        loadComponent: () =>
          import('./components/public-law/public-law.component').then(
            (m) => m.PublicLawComponent
          ),
      },
      {
        path: 'stats',
        loadComponent: () =>
          import('./components/stats/stats.component').then(
            (m) => m.StatsComponent
          ),
      },
      {
        path: 'talk',
        loadComponent: () =>
          import('./components/talk/talk.component').then(
            (m) => m.TalkComponent
          ),
      },
      {
        path: 'compass',
        children: [
          { path: '', redirectTo: 'events', pathMatch: 'full' },
          {
            path: 'events',
            loadComponent: () =>
              import(
                './components/compass-events/compass-events.component'
              ).then((m) => m.CompassEventsComponent),
          },
          {
            path: 'jobs',
            loadComponent: () =>
              import('./components/compass-jobs/compass-jobs.component').then(
                (m) => m.CompassJobsComponent
              ),
          },
          {
            path: 'arms',
            loadComponent: () =>
              import('./components/compass-arms/compass-arms.component').then(
                (m) => m.CompassArmsComponent
              ),
          },
        ],
      },
      {
        path: 'presenters',
        loadComponent: () =>
          import('./components/presenters/presenters.component').then(
            (m) => m.PresentersComponent
          ),
      },
      {
        path: 'providers',
        loadComponent: () =>
          import('./components/providers/providers.component').then(
            (m) => m.ProvidersComponent
          ),
      },
      {
        path: 'my-profile',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./components/my-profile/my-profile.component').then(
                (m) => m.MyProfileComponent
              ),
          },
          {
            path: 'my-wallet',
            loadComponent: () =>
              import('./components/my-wallet/my-wallet.component').then(
                (m) => m.MyWalletComponent
              ),
          },
        ],
      },
      {
        path: 'my-ebraj',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./components/my-ebraj/my-ebraj.component').then(
            (m) => m.MyEbrajComponent
          ),
      },
      {
        path: 'white-paper',
        loadComponent: () =>
          import('./components/white-paper/white-paper.component').then(
            (m) => m.WhitePaperComponent
          ),
      },
      {
        path: 'faqs',
        loadComponent: () =>
          import('./components/faqs/faqs.component').then(
            (m) => m.FaqsComponent
          ),
      },
      {
        path: 'e-page',
        loadComponent: () =>
          import('./components/e-page/e-page.component').then(
            (m) => m.EPageComponent
          ),
      },
      {
        path: 'disclosures',
        loadComponent: () =>
          import(
            './components/footer-disclosures/footer-disclosures.component'
          ).then((m) => m.FooterDisclosuresComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        canActivate: [noAuthGuard],
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        canActivate: [noAuthGuard],
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        canActivate: [noAuthGuard],
      },
      {
        path: 'career',
        loadComponent: () =>
          import('./components/career/career.component').then(
            (m) => m.CareerComponent
          ),
      },
      {
        path: 'add-career',
        loadComponent: () =>
          import('./components/add-career/add-career.component').then(
            (m) => m.AddCareerComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    loadComponent: () =>
      import(
        './components/dashboard/dashboard-layout/dashboard-layout.component'
      ).then((m) => m.DashboardLayoutComponent),
    children: [
      { path: '', redirectTo: 'manage-user', pathMatch: 'full' },
      {
        path: 'feedback',
        loadComponent: () =>
          import(
            './components/dashboard/feedback-users/feedback-users.component'
          ).then((m) => m.FeedbackUsersComponent),
      },
      {
        path: 'manage-user',
        loadComponent: () =>
          import(
            './components/dashboard/manage-users/manage-users.component'
          ).then((m) => m.ManageUsersComponent),
      },
      {
        path: 'pages',
        loadComponent: () =>
          import('./components/dashboard/pages/pages.component').then(
            (m) => m.PagesComponent
          ),
      },
      {
        path: 'add-page',
        loadComponent: () =>
          import('./components/dashboard/add-page/add-page.component').then(
            (m) => m.AddPageComponent
          ),
      },
      {
        path: 'add-page/:id',
        loadComponent: () =>
          import('./components/dashboard/add-page/add-page.component').then(
            (m) => m.AddPageComponent
          ),
      },
      {
        path: 'sidetab/:id',
        loadComponent: () =>
          import('./components/dashboard/side-tab/side-tab.component').then(
            (m) => m.SideTabComponent
          ),
      },
      {
        path: 'add-sidetab/:id',
        loadComponent: () =>
          import(
            './components/dashboard/add-side-tab/add-side-tab.component'
          ).then((m) => m.AddSideTabComponent),
      },
      {
        path: 'add-sidetab/:pageId/:sideTabId',
        loadComponent: () =>
          import(
            './components/dashboard/add-side-tab/add-side-tab.component'
          ).then((m) => m.AddSideTabComponent),
      },
      {
        path: 'add-faq-sidetab',
        loadComponent: () =>
          import(
            './components/dashboard/faqside-tab/faqside-tab.component'
          ).then((m) => m.FAQSideTabComponent),
      },
      {
        path: 'edit-faq-sidetab/:id',
        loadComponent: () =>
          import(
            './components/dashboard/faqside-tab/faqside-tab.component'
          ).then((m) => m.FAQSideTabComponent),
      },
      {
        path: 'add-faq/:faqSideTabId',
        loadComponent: () =>
          import('./components/dashboard/add-faqs/add-faqs.component').then(
            (m) => m.AddFaqsComponent
          ),
      },
      {
        path: 'edit-faq/:faqId/:faqSideTabId',
        loadComponent: () =>
          import('./components/dashboard/add-faqs/add-faqs.component').then(
            (m) => m.AddFaqsComponent
          ),
      },
      {
        path: 'faqs',
        loadComponent: () =>
          import('./components/dashboard/faqs/faqs.component').then(
            (m) => m.FaqsComponent
          ),
      },
      {
        path: 'careers',
        loadComponent: () =>
          import('./components/dashboard/careers/careers.component').then(
            (m) => m.CareersComponent
          ),
      },
      {
        path: 'add-job/:id',
        loadComponent: () =>
          import('./components/dashboard/add-job/add-job.component').then(
            (m) => m.AddJobComponent
          ),
      },
      {
        path: 'update-job/:id/:categoryId',
        loadComponent: () =>
          import('./components/dashboard/update-job/update-job.component').then(
            (m) => UpdateJobComponent
          ),
      },
      {
        path: 'add-job-category',
        loadComponent: () =>
          import(
            './components/dashboard/add-job-category/add-job-category.component'
          ).then((m) => AddJobCategoryComponent),
      },
      {
        path: 'update-job-category/:id',
        loadComponent: () =>
          import(
            './components/dashboard/update-job-category/update-job-category.component'
          ).then((m) => UpdateJobCategoryComponent),
      },
      {
        path: 'add-requirement/:id',
        loadComponent: () =>
          import(
            './components/dashboard/add-requirement/add-requirement.component'
          ).then((m) => AddRequirementComponent),
      },
      {
        path: 'update-requirement/:id',
        loadComponent: () =>
          import(
            './components/dashboard/update-requirement/update-requirement.component'
          ).then((m) => UpdateRequirementComponent),
      },
    ],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];
