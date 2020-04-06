import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent implements OnInit {

  constructor(private http:HttpClient, private userservice:UserService) { }

  datos:[any]=[{}];
  mail: String;
  username:String;
  pass1:String;
  pass2:String;

  ngOnInit() {
  }

  submit(){
    let tmp = {
      realm : 'user',
      rol: 'user',
      icono:'https://www.carniceriarivas.com/images/mobile/ico-usuario.png',
      username : this.username,
      password : this.pass1,
      email : this.mail,
      emailVerified : false
    }
    this.userservice.postUser(tmp);
    
  }
}
