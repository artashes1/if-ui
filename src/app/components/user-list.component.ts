import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService, User } from '../servises/user.service';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'if-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  isLoading = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.isLoading = true;
    this.users = this.userService.getUsers().finally(() => this.isLoading = false);
  }
}
