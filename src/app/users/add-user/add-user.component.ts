import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { validateHeaderName } from 'http';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit {
  usersList:any;
  umobilePattern = "^[0-9_-]{10}$";
  unamePattern = "^[a-z0-9_-]{6,15}$";
  submitted:boolean=false;
  addUserForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder, private userService:UserService, private route:Router, private _snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      //name:['',[Validators.required]],
      name: new FormControl('', [Validators.required, Validators.minLength(6)]),
      //username:['',[Validators.required]],
      username: new FormControl('',[Validators.required, Validators.minLength(6), Validators.pattern(this.unamePattern)]),
      //email:['',[Validators.required, Validators.email]],
      email: new FormControl('',[Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(this.umobilePattern),Validators.maxLength(10)]),
      company: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required])
      //  mobile:['',[Validators.required]],
      //company:['', [Validators.required]],
      //address:['',[Validators.required]],
    });

    this.userService.listUsers().subscribe(res2=>{
      this.usersList=res2;
      console.log(this.usersList);
    })
  }
  createuser() {
    console.log(this.addUserForm.value);
    this.userService.addUsers(this.addUserForm.value).subscribe(res=>{
      if(this.addUserForm.value.username === "" || this.addUserForm.value.email === "" || this.addUserForm.value.name === "" ||this.addUserForm.value.mobile === "" ||this.addUserForm.value.company === "" || this.addUserForm.value.address === ""){
        this._snackBar.open("Please Enter The User Details");
      }else{
        this.submitted = true;
        this._snackBar.open("User Created Successfully");
        this.usersList.push(res);
      }
    

     // this.route.navigate(['/users/list'])
     // console.log(this.usersList);
     
    },err=>{
      this._snackBar.open("Error Occured While  Creating the User",'Warning',{duration:2000});
    })
  }
}
