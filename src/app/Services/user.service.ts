import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../Cons/cons';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  postUser(data:{}){
    let a:any = data;
    this.http.post(`${URL_API}users`,data).subscribe(
      (response)=>{
        /*if(a.rol == 'user'){
        //this.loginUser(data);
        }*/
        console.log('okay');
        alert('¡Usuario Creado!')
    },(error) =>
      alert('Error, por favor asegurese de que los datos introducidos son válidos'));
  }

  loginUser(user){
    this.http.post(`${URL_API}users/login`,user).subscribe(
      (response)=>{
        localStorage.setItem('token',JSON.stringify(response));
        localStorage.setItem('pass',JSON.stringify(user.password));
        console.log('Correct login');
        this.guardarRol();
        window.location.reload();
        //JSON.parse() para convertir el string almacenado en un JSON.
      },(error) => {
        console.log('error',error.error.error.message)
        alert('Usuario o contraseña incorrectos')
      }
      ); 
  }

  guardarRol(){
    let local = JSON.parse(localStorage.getItem('token'));
    let id = local.userId;
    let token = local.id;
    let datos;
    this.http.get(`${URL_API}users/${id}?access_token=${token}`).subscribe((data)=>{
       datos = data;
       localStorage.setItem('rol',JSON.stringify(datos.rol));
    });
  }

  obtenerUsuario(){
    let local = JSON.parse(localStorage.getItem('token'));
    let id = local.userId;
    let token = local.id;
    console.log(token);
    return this.http.get(`${URL_API}users/${id}?access_token=${token}`)
  }
}
