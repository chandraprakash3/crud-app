import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit{
  userId:any;
  userDetails:any;
constructor(private userService:UserService, private activatedRouter:ActivatedRoute){}
  ngOnInit(): void {
   this.activatedRouter.paramMap.subscribe(params=>{
    this.userId = params.get('id');
    console.log(this.userId);

    this.userService.viewUser(this.userId).subscribe(data=>{
      console.log(data);
      this.userDetails=data;
    })
   })
  }
}
