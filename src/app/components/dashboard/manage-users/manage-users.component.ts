import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.scss',
})
export class ManageUsersComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  users: User[] = [];
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    const sub = this.adminService.getNotApprovedUsers().subscribe({
      next: (value) => {
        if (value.isPass) {
          this.users = value.data;
          this.toastr.success(value.message);
        } else {
          this.toastr.warning(value.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
    this.subscription.add(sub);
  }
  approveUser(userId: string) {
    const sub = this.adminService.setApprovedUser(userId).subscribe({
      next: (value) => {
        if (value.isPass) {
          const sub = this.adminService.getNotApprovedUsers().subscribe({
            next: (value) => {
              this.users = value.data;
            },
            error: (err) => {
              this.toastr.error(err.message);
            },
          });
          this.subscription.add(sub);
          this.toastr.success(value.message);
        } else {
          this.toastr.error(value.message);
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      },
    });
    this.subscription.add(sub);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
