import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sig-in',
  templateUrl: './sig-in.component.html',
  styleUrls: ['./sig-in.component.css']
})
export class SigInComponent implements OnInit {

  constructor(private http:HttpClient, private userservice:UserService, private router:Router) { }

  datos:[any]=[{}];
  mail: String;
  username:String;
  pass1:String;
  pass2:String;
  rol;

  ngOnInit() {
    this.rol = JSON.parse(localStorage.getItem('rol'));
    if(localStorage.getItem('token')!=null && this.rol != 'admin'){
      this.router.navigate(['/Lista/Ultimas']);
    }
  }

  submit(){
    let tipo;
    if (this.rol=='admin') {
      tipo = 'admin';
    }else{
      tipo = 'user';
    }
    let tmp = {
      realm : 'user',
      rol: tipo,
      icono:'https://www.carniceriarivas.com/images/mobile/ico-usuario.png',
      username : this.username,
      password : this.pass1,
      email : this.mail,
      emailVerified : false
    }
    this.userservice.postUser(tmp);
  }
}
