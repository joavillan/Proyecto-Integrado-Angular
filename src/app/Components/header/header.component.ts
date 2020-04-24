import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:ActivatedRoute,private user:UserService,private auth:AuthService) { }
  
  logged:boolean;
  rol;
  icono;

  ngOnInit() {
   this.inicio();
  }

  inicio(){
    this.role();
    if(localStorage.getItem('token')==null){
      this.logged=false;
    }else if(this.auth.isAuthenticated()){
      this.obtenerIcono();
      this.logged=true;
    }else{
      this.logged=false;
    }
  }

  obtenerIcono(){
    let dato;
    this.user.obtenerUsuario().subscribe((data)=>{
      dato = data;
      this.icono = dato.icono;
    },(error)=>{
      console.log('ha ocurrido un error al obtener datos')
    });
  }

  logout(){
    var a = localStorage.getItem('token');
    this.user.logoutUser(a);
  }

  role(){
    this.rol = JSON.parse(localStorage.getItem('rol'));
  }

}
