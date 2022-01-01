import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public userType = '';
  constructor(public service: UserService) {}
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const data = this.service.getUserDetails();
    this.userType = data.type;
  }
}
