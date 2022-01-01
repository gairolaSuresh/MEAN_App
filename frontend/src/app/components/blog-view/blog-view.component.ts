import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss'],
})
export class BlogViewComponent implements OnInit {
  public user:any;
  public allBlogs: any = [];

  constructor(
    private toastr: ToastrService,
    private service: BlogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
     this.user = this.userService.getUserDetails();
    this.service.getAllBlogs(this.user.id, this.user.type).subscribe(
      (blogs) => {
        if (blogs.success) {
          this.allBlogs = blogs.list;
        } else {
          this.toastr.error('', blogs.msg);
        }
      },
      (error: Error) => {
        this.toastr.error('', 'something went wrong');
      }
    );
  }

  approveBlog(blogId: any) {
    this.service.approveBlog(blogId).subscribe(
      (result) => {
        if (result.success) {
          this.toastr.success('', result.msg);
          this.getBlogs();
        } else {
          this.toastr.error('', result.msg);
        }
      },
      (error: Error) => {
        this.toastr.error('', 'something went wrong');
      }
    );
  }

  deleteBlog(blogId: any) {
    this.service.removeBlog(blogId).subscribe(
      (result) => {
        if (result.success) {
          this.toastr.success('', result.msg);
        } else {
          this.toastr.error('', result.msg);
        }
      },
      (error: Error) => {
        this.toastr.error('', 'something went wrong');
      }
    );
  }
}
