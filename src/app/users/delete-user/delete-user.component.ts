import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent implements OnInit{
  userId:any;
  constructor(private userService:UserService, private activatedRoute:ActivatedRoute, private _snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data=>{
      this.userId = data.get('id')
    });
    if(this.userId){
      this.userService.deleteUsers(this.userId).subscribe(data2=>{
        this._snackBar.open(`User with ID ${this.userId} deleted successfully`);
      },err=>{
        this._snackBar.open('Error Occurred while deleting the user');
      })
    }
  }
}
