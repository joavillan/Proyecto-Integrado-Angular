import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/Services/receta.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private user:UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    let datos;
    let nick;
    let icono;
    let emailId = this.route.snapshot.paramMap.get("id")
    this.user.obtenerUsuario().subscribe((data)=>{
      let tmp = {
        realm : datos.realm,
        rol: datos.rol,
        icono: datos.icono,
        username : datos.username,
        password : datos.password,
        email : datos.email,
        emailVerified : true
      }
      this.user.putUserById(emailId, tmp).subscribe((res)=>{
        alert('¡Verificado!');
      },(err)=>{
        alert('Error');
      })
  })
  }
}
