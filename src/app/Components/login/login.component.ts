import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={
    username:'',
    password:''
  }

  verificar={where:{username:this.user.username}}

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.router.navigate(['/Home']);
    }
  }

  submit(){
    this.userService.loginUser(this.user).subscribe(
      (response)=>{
        localStorage.setItem('token',JSON.stringify(response));
        localStorage.setItem('pass',JSON.stringify(this.user.password));
        console.log('Correct login');
        this.userService.guardarRol();
        //window.location.reload();
        //JSON.parse() para convertir el string almacenado en un JSON.
      },(error) => {
        console.log('error',error.error.error.message)
        alert('Usuario o contraseña incorrectos')
      }
      ); ;
    this.router.navigate(['/Lista/Ultimas']);
  }
}
