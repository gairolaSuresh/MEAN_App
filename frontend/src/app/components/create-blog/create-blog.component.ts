import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss'],
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: BlogService,
    private userService: UserService,
    private router: Router
  ) {
    this.blogForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      userId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const user = this.userService.getUserDetails();
    this.blogForm.patchValue({ userId: user.id });
  }

  saveBlog() {
    if (this.blogForm.invalid) {
      return;
    } else {
      this.service.saveBlog(this.blogForm.value).subscribe(
        (blog: any) => {
          if (blog.success) {
            this.toastr.success('', blog.msg);
            this.blogForm.reset();
            this.router.navigate(['/blog-view']);
          } else {
            this.toastr.error('', blog.msg);
          }
        },
        (error: Error) => {
          this.toastr.error('', 'something went wrong');
        }
      );
    }
  }
}
