import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apiURL: string = environment.apiEndPoint;
  private token: any;
  constructor(private http: HttpClient, private router: Router) {}

  public saveBlog(obj: any) {
    return this.http.post<any>(this.apiURL + 'user/saveBlog', obj);
  }

  public getAllBlogs(id: any, type: string) {
    return this.http.get<any>(
      this.apiURL + 'user/getBlog?id=' + id + '&type=' + type
    );
  }

  public approveBlog(blogId: any) {
    return this.http.get<any>(
      this.apiURL + 'user/approveBlog?id=' + blogId + '&status=' + true
    );
  }

  public removeBlog(blogId: any) {
    return this.http.get<any>(this.apiURL + 'user/removeBlog?blogId=' + blogId);
  }
}
