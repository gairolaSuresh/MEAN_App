import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  public isAdminExist: Boolean = false;
  newUserForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: UserService,
    private router: Router
  ) {
    this.newUserForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9]{2,}(?:[._]{1}[a-zA-Z0-9]+){0,2}@[a-zA-Z]{2,20}[.]{1}[a-zA-Z]{2,4}(?:[.]{1}[a-zA-Z]+){0,1}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ],
      ],
      type: ['Content-Writer', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAdminStatus();
  }

  getAdminStatus() {
    this.service.adminStatus().subscribe((status: any) => {
      this.isAdminExist = status.exist;
    });
  }

  /**
   * registertation of a new user
   *
   */
  registerUser() {
    if (this.newUserForm.invalid) {
      return;
    } else {
      this.service.register(this.newUserForm.value).subscribe(
        (registeration: any) => {
          if (registeration.success) {
            this.service.saveToken(registeration.token);
            this.toastr.success('', registeration.msg);
            this.router.navigate(['/login']);
          } else {
            this.toastr.error('', registeration.msg);
          }
        },
        (error: Error) => {
          this.toastr.error('', 'Something went Wrong');
        }
      );
    }
  }
}
