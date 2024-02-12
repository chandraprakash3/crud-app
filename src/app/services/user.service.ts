import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../users/list-users/list-users.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   baseUrl:string ="https://jsonplaceholder.cypress.io"
  constructor(private http:HttpClient) { }

  listUsers():Observable<User[]>{
   return this.http.get<User[]>(`${this.baseUrl}/users`);
   //return this.http.get(this.baseUrl + '/users');
  }
  // listUsers(){
  //   return this.http.get(`${this.baseUrl}/users`);
  //   //return this.http.get(this.baseUrl + '/users');
  //  }

  viewUser(id:any){
    return this.http.get(`${this.baseUrl}/users/${id}`);
    //return this.http.get(this.baseUrl+'/users/'+id)
  }

  addUsers(userObj:any){
    return this.http.post(this.baseUrl+'/users/', userObj);
    //return this.http.post(`${this.baseUrl}/users`,userObj);
  }
  deleteUsers(id:any){
    return this.http.delete(`${this.baseUrl}/users/${id}`);
    //return this.http.delete(this.baseUrl+'/users'+id);
  }

  updateUser(id:any,userObj:any){
    return this.http.put(this.baseUrl+'/users/'+ id,userObj);
   
  }
}
