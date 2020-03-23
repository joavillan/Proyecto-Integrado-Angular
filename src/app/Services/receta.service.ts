import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../Cons/cons';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(private http:HttpClient) { }

  postReceta(receta){
    return this.http.post(URL_API+'recetas',receta)
  }
  getReceta(){
    return this.http.get(URL_API+'recetas')
  }
  getRecetaById(id){
    return this.http.get(URL_API+'recetas/',id)
  }
}
