import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersModule } from '../users.module';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit{
  userId:any;
  userDetails:any;
  mobilePattern ="^[0-9_-]{10}$";
  userPattern = "^[a-z0-9_-]{6,15}$";
  editUserForm:FormGroup = new FormGroup({})
  constructor(private activatedRoute: ActivatedRoute,private route:Router, private userservice:UserService, private fb:FormBuilder, private snackbar:MatSnackBar){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data=>{
      this.userId = data.get('id')
      console.log(this.userId)
    });
    if(this.userId !==''){
      this.userservice.viewUser(this.userId).toPromise().then(data=>{
        this.userDetails = data;
        Object.assign(this.userDetails,data);
        console.log(this.userDetails);

        //build the edit form
        this.editUserForm = this.fb.group({
          'fullname':new FormControl(this.userDetails.name,[Validators.required, Validators.minLength(6)]),
          'uname':new FormControl(this.userDetails.username,[Validators.required, Validators.minLength(6), Validators.pattern(this.userPattern)]),
          'emailid':new FormControl(this.userDetails.email,[Validators.required, Validators.email]),
          'phone':new FormControl(this.userDetails.phone, [Validators.required, Validators.pattern(this.mobilePattern), Validators.maxLength(10)]),
          'company':new FormControl(this.userDetails.company.name, [Validators.required]),
          'add':new FormControl(this.userDetails.address.city,[Validators.required])
         
        })
        console.log(this.editUserForm.value)
      })
      .catch(err=>{
        this.snackbar.open("Error Occurred While Editing the User")
      })
    }
  }
  updateUser(){
    this.userservice.updateUser(this.userId,this.editUserForm.value).subscribe(()=>{
        this.snackbar.open("User Updated Successfully");
        console.log(this.editUserForm.value)
        this.route.navigate(['/users/list'])   
    },err=>{
      this.snackbar.open("Error Occured while updating the User","OK",{duration:2000});
    })
     

  }
}
