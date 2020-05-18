import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/Services/receta.service';
import { RecetaModel } from 'src/app/Models/RecetaModel';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';
import { ImageService } from 'src/app/Services/image.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  constructor(private router:ActivatedRoute,private receta:RecetaService, private user:UserService, private image:ImageService, private rout:Router) {
    if(JSON.parse(localStorage.getItem('token'))!=null){
      this.idu = JSON.parse(localStorage.getItem('token')).userId;
      console.log(this.idu);
    }
   }

  config = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "250",
    "width": "auto",
    "minWidth": "0",
    "maxWidth": "250",
    "translate": "yes",
    "enableToolbar": true,
    "showToolbar": true,
    "placeholder": "Enter text here...",
    "imageEndPoint": "",
    "toolbar": [
        ["bold", "italic", "underline", "strikeThrough", "superscript", "subscript"],
        ["fontName", "fontSize", "color"],
        ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull", "indent", "outdent"],
        ["cut", "copy", "delete", "removeFormat", "undo", "redo"],
        ["paragraph", "blockquote", "removeBlockquote", "horizontalLine", "orderedList", "unorderedList"],
        ["link", "unlink", "image", "video"]
    ]
};

  comentarioDummy='';
  id;
  idu="";
  rol;
  recetaPage:RecetaModel;

  ngOnInit() {
    this.router.params.subscribe(event => {
      this.id = event.id;
    });
    this.rol = JSON.parse(localStorage.getItem('rol'));
    console.log(this.rol);
    this.obtenerReceta();
  }

  obtenerReceta(){
    console.log(this.id);
    this.receta.getRecetaById(this.id).subscribe((res)=>{
      console.log(res);
      let dummy:any = res;
      console.log(dummy.img);
      this.recetaPage = dummy;
      console.log(this.recetaPage.img);
      console.log('tagggs '+this.recetaPage.tags);
    },(err)=>{
      console.log(err);
      alert('Ha ocurrido un error al obtener el post: \n'+err.err)
    })
  }

  eliminarReceta() {
    let nom;
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Si lo eliminas no podrás recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí! borrar',
      cancelButtonText: 'No, mejor no'
    }).then((result) => {
      if (result.value) {
        this.receta.removeRecetaById(this.recetaPage.id).subscribe((response)=>{
          //window.location.reload();
          nom = this.recetaPage.img.slice((this.recetaPage.img.lastIndexOf("/") - 1 >>> 0) + 2);
          console.log(nom);
          this.image.removeImageById(nom).subscribe();
          Swal.fire(
            '¡Borrado!',
            'Esta receta ha sido borrada',
            'success'
          )
          this.rout.navigate(['/Lista/Ultimas']);
        },(error)=>{
          /*console.log(`error al eliminar comentario`),
          console.log(this.recetaPage);*/
          Swal.fire(
            '¡Error!',
            'La receta no ha sido borrada',
            'error'
          )
        });
      }
    })
  }

  Comentar(){
    let datos;
    let nick;
    let icono;
    let cuerpo;
    console.log('hasta aquí');
    this.user.obtenerUsuario().subscribe((data)=>{
      datos = data;
      console.log(datos);
      icono = datos.icono;
      console.log(icono)
      nick = datos.username;
      console.log(this.comentarioDummy);
      let dummy = {
        'userId':this.idu,
        'nick': nick,
        'icono':icono,
        'cuerpo':this.comentarioDummy
      }
    if (this.comentarioDummy != '') {
      this.recetaPage.ncomen++;
      this.recetaPage.comentarios.push(dummy);
      this.receta.putRecetaById(this.id,this.recetaPage).subscribe((res)=>{
        //alert('¡Comentario subido!');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '¡Comentario subido!',
          showConfirmButton: false,
          timer: 1500
        })
        this.comentarioDummy = '';
      },(err)=>{
        //alert('Error al subir comentario: \n'+err.err);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: '¡Error! comentario no subido',
          showConfirmButton: false,
          timer: 1500
        })
      })
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: '¡Necesitas escribir algo!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    }); 
  }

  Eliminar(id){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Si lo eliminas no podrás recuperarlo",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí! borrar',
      cancelButtonText: 'No, mejor no'
    }).then((result) => {
      if (result.value) {
        this.recetaPage.comentarios.splice(id,1);
        this.recetaPage.ncomen--;
        this.receta.putRecetaById(this.recetaPage.id,this.recetaPage).subscribe((response)=>{
          //window.location.reload();
          Swal.fire(
            '¡Borrado!',
            'Tu comentario ha sido borrado',
            'success'
          )
        },(error)=>{
          /*console.log(`error al eliminar comentario`),
          console.log(this.recetaPage);*/
          Swal.fire(
            '¡Error!',
            'Tu comentario no ha sido borrado',
            'error'
          )
        });
      }
    })
  }

}
