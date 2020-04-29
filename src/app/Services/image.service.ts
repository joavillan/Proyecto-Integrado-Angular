import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_API } from '../Cons/cons';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http:HttpClient) { }

  public uploadImage(image:any, name:string){ 
    console.log(image, name);
    return this.http.post(`${URL_API}/images/FileUpload`,{file:image,name:name});
  }

  removeImageById(file){
    return this.http.post(`${URL_API}/images/FileUnlink`,{file:file});
  }
  
}
