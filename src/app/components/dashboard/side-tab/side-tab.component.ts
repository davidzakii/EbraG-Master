import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SideTab } from '../../../models/side-tab';
import { SideTabService } from '../../../services/side-tab.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-tab',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './side-tab.component.html',
  styleUrl: './side-tab.component.scss',
})
export class SideTabComponent {
  private subscription: Subscription = new Subscription();
  sideTabs: SideTab[] = [];
  pageId: string = '';
  constructor(
    private sidTabService: SideTabService,
    private toastr: ToastrService,
    private activetedRoute: ActivatedRoute,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.getPageId();
    this.getsidetabs();
  }
  getPageId() {
    this.pageId = this.activetedRoute.snapshot.paramMap.get('id') || '';
  }
  getsidetabs() {
    const sub = this.sidTabService.getSideTabs(this.pageId).subscribe({
      next: (response) => {
        if (response.isPass) {
          this.sideTabs = response.data;
        } else {
          this.toastr.error(response.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
    this.subscription.add(sub);
  }

  deleteSidetab(id: string) {
    // if (confirm('Are you sure you want to delete this side tab?')) {
    //   const sub = this.sidTabService.deleteSideTab(id).subscribe({
    //     next: (response) => {
    //       if (response.isPass) {
    //         this.toastr.success(response.message);
    //         this.getsidetabs();
    //       } else {
    //         this.toastr.error(response.message);
    //       }
    //     },
    //     error: (err) => {
    //       this.toastr.error(err.message);
    //     },
    //   });
    //   this.subscription.add(sub);
    // }
    this.toastr
      .warning(
        'Are you sure you want to delete this side tab?',
        'Confirm Delete',
        {
          disableTimeOut: false,
          closeButton: true,
          tapToDismiss: false,
          onActivateTick: true,
        }
      )
      .onTap.subscribe(() => {
        const sub = this.sidTabService.deleteSideTab(id).subscribe({
          next: (response) => {
            if (response.isPass) {
              this.toastr.success(response.message);
              this.getsidetabs();
            } else {
              this.toastr.error(response.message);
            }
          },
          error: (err) => {
            this.toastr.error(err.message);
          },
        });
        this.subscription.add(sub);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
