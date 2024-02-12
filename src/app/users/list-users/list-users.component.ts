import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  id: number;
  username: string;
  email: string;
  company: string;
  address: string;
}

const USER_DATA: User[] = [
  //{id: 1, name: 'Hydrogen', username: '', email: 'H',company:"", address:''},
];
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent implements OnInit {
  //listOfUsers!:Observable<object>;
  listOfUsers: User[] = [];
  students$:any;
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'mobile',
    'company',
    'address',
    'actions'
  ];
  dataSource = USER_DATA;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userService.listUsers().subscribe((data) => {
      this.listOfUsers = data;
      this.students$=data;
    });
  }
}
