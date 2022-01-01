import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: UserService,
    private router : Router
  ) {
    this.loginform = this.formBuilder.group({
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
      type: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  loginUser() {
    if (this.loginform.invalid) {
      return;
    } else {
      this.service.login(this.loginform.value).subscribe(
        (login: any) => {
          if (login.success) {
            this.service.saveToken(login.token);
            this.toastr.success('', login.msg);
            const data=this.service.getUserDetails()
            if(data.type === 'Admin'){
              this.router.navigate(['/user-view']);
            }else{
              this.router.navigate(['/create-post']);
            }
            
          } else {
            this.toastr.error('', login.msg);
          }
        },
        (error: Error) => {
          this.toastr.error('', 'something went wrong');
        }
      );
    }
  }
}
