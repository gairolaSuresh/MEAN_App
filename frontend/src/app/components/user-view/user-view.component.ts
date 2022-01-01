import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  public allUser: any = [];

  constructor(private service: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.service.getUser().subscribe(
      (result) => {
        if (result.success) {
          this.allUser = result.result;
          this.toastr.success('', result.msg);
        } else {
          this.toastr.error('', 'No User Found');
        }
      },
      (error: Error) => {
        this.toastr.error('', 'something went wrong');
      }
    );
  }

  deleteUser(id: any) {
    this.service.removeUser(id).subscribe(
      (result) => {
        if (result) {
          this.toastr.success('', result.msg);
        } else {
          this.toastr.error('', 'No User Found');
        }
      },
      (error: Error) => {
        this.toastr.error('', 'something went wrong');
      }
    );
  }
}
