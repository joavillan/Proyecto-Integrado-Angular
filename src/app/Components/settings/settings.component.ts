import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { URL_API } from 'src/app/Cons/cons';
import { ImageService } from 'src/app/Services/image.service';
import Swal from 'sweetalert2';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  filePath: any;
  Imgsrc: any;
  Imgpreview: any;
  
  constructor(private user:UserService, private image:ImageService, private storage:AngularFireStorage) { }

  file: any;
  ext: any;
  img: string;
  antpass:string;
  newpass1:string;
  newpass2:string;
  showSpinner:boolean = false;
  nombreIcono:string;
  iconoEx:string;
  userid;
  userObj;
  icono;

  ngOnInit() {
    this.obtenerIcono();
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

  cambiarPassword(){
    if(this.newpass1==this.newpass2){
      this.user.changePassword(this.newpass1,this.antpass).subscribe((res)=>{
        /*alert('Contraseña cambiada');
        window.location.reload();*/
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Contraseña cambiada!',
          showConfirmButton: false,
          timer: 1500
        })
      },(err)=>{
        //alert('Ha ocurrido un error al cambiar la contraseña: \n'+err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Vaya, parece que ha habido algún error',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      })
    }

  }

  cambiarImagen(){
    Swal.fire({
      position: 'top-end',
      title: 'Cargando...',
      showConfirmButton: false,
    })
    Swal.showLoading();
    this.user.obtenerUsuario().subscribe((resp:any)=>{
      this.nombreIcono = resp.id;
      this.iconoEx = resp.icono.slice((resp.icono.lastIndexOf("/") - 1 >>> 0) + 2);
      this.userObj = {
        "username":resp.username,
        "password": JSON.parse(localStorage.getItem('pass')),
        "realm":resp.realm,
        "icono": "",
        "email":resp.email,
        "rol":resp.rol,
        "emailVerified":resp.emailVerified
      };
      if (this.file != null) {
        this.image.removeImageById(this.iconoEx).subscribe();
        this.subirImagen();
        this.userObj.icono = `${URL_API}images/images/download/${this.nombreIcono}`;
        this.user.putUser(this.userObj);
        //location.reload();
      }else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Asegúrate de haber seleccionado una imagen',
          showConfirmButton: false,
          timer: 1500
        })
      }
      /*Swal.fire(
        '¡Imagen cambiada!',
        'Pulsa OK para continuar cocinando',
        'success'
      )*/
    });
    

  }
  handleFileSelect(evt){
    var files = evt.target.files;
    this.file = files[0];
    this.ext=this.file.name;
    this.ext = this.ext.slice((this.ext.lastIndexOf(".") - 1 >>> 0) + 2);
    if (files && this.file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(this.file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.img= btoa(binaryString);
    console.log(btoa(binaryString));
  }

  subirImagen(){
    this.nombreIcono/* = this.nombreIcono+'.'+this.ext*/;
    
    this.image.uploadImage(this.img, this.nombreIcono).subscribe(
      (res) => {
        //alert('Se ha actualizado el icono correctamente');
        Swal.close();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Icono cambiado!',
          showConfirmButton: false,
          timer: 1500
        })
        console.log('Se ha actualizado el icono correctamente');
        window.location.reload();
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Vaya, parece que ha habido algún error',
          showConfirmButton: false,
          timer: 1500
        })

        //alert('Ha ocurrido un error en la subida de la imagen:'+err.err);
        console.log('Ha ocurrido un error en la subida de la imagen:'+err.err);
      })
  }

  cambiaPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader;
      reader.onload = (e:any) => {
        this.Imgsrc=e.target.result
      }
      reader.readAsDataURL(event.target.files[0])
      this.Imgpreview=event.target.files[0]
    }else{
      this.Imgpreview=null;
    }
  }

  firebase() {
    Swal.fire({
      position: 'top-end',
      title: 'Cargando...',
      showConfirmButton: false,
    })
    Swal.showLoading();
    this.user.obtenerUsuario().subscribe((resp:any)=>{
      this.nombreIcono = resp.id;
      this.userObj = {
        "username":resp.username,
        "password": JSON.parse(localStorage.getItem('pass')),
        "realm":resp.realm,
        "icono": "lleno",
        "email":resp.email,
        "rol":resp.rol,
        "emailVerified":resp.emailVerified
      };
      if (this.Imgpreview != null || this.Imgpreview != undefined) {
        this.filePath = this.nombreIcono;
        const fileRef = this.storage.ref(this.filePath);
        this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
          fileRef.getDownloadURL().subscribe((url) => {
      
            setTimeout(() => {
              var imagename=''
              imagename = url;
              console.log(imagename);
              this.userObj.icono = imagename;
              console.log("Imagen "+this.userObj.icono)
              Swal.close();
              Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '¡Icono cambiado!',
              showConfirmButton: false,
              timer: 1500
            })
            console.log('Se ha actualizado el icono correctamente');

            this.user.putUser(this.userObj);

            window.location.reload();
            }, 1000);

          })
        })
        console.log(this.userObj);
        //location.reload();
      }else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Asegúrate de haber seleccionado una imagen',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }
  
}
