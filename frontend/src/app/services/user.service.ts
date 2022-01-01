import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL: string = environment.apiEndPoint;
  private token: any;
  constructor(private http: HttpClient, private router: Router) {}

  public removeToken() {
    localStorage.removeItem('sdasd923hd9dwe');
  }

  public saveToken(token: string): void {
    localStorage.setItem('sdasd923hd9dwe', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('sdasd923hd9dwe');
    }
    return this.token;
  }

  /*
      fetch user token details
   */
  public getUserDetails(): any {
    const token = this.getToken();
    let payload: any;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /*
          call for check the user session
       */
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('sdasd923hd9dwe');
    this.router.navigateByUrl('');
  }

  public adminStatus(): any {
    return this.http.get<any>(this.apiURL + 'user/isAdminExist');
  }

  public register(obj: any): any {
    return this.http.post<any>(this.apiURL + 'user/userRegisteration', obj);
  }

  public login(obj: any) {
    return this.http.post<any>(this.apiURL + 'user/userLogin', obj);
  }

  public getUser() {
    return this.http.get<any>(this.apiURL + 'user/getAllUser');
  }

  public removeUser(userId: any) {
    return this.http.get<any>(this.apiURL + 'user/removeUser?id=' + userId);
  }
}
