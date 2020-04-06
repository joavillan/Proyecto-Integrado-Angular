import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/Services/receta.service';
import { RecetaModel } from 'src/app/Models/RecetaModel';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  constructor(private router:ActivatedRoute,private receta:RecetaService, private user:UserService) { }

  config = {
    "editable": true,
    "spellcheck": true,
    "height": "auto",
    "minHeight": "250",
    "width": "auto",
    "minWidth": "0",
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

  comentarioDummy;
  id;
  idu="";
  recetaPage:RecetaModel;

  ngOnInit() {
    this.router.params.subscribe(event => {
      this.id = event.id;
    });
    this.obtenerReceta();
  }

  obtenerReceta(){
    console.log(this.id);
    this.receta.getRecetaById(this.id).subscribe((res)=>{
      console.log(res);
      let dummy:any = res;
      console.log(dummy.img);
      this.recetaPage = dummy;
    },(err)=>{
      console.log(err);
      alert('Ha ocurrido un error al obtener el post: \n'+err.err)
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
        'iduser':this.idu,
        'nick': nick,
        'icono':icono,
        'cuerpo':this.comentarioDummy
      }
      this.recetaPage.comentarios.push(dummy);
    this.receta.putRecetaById(this.id,this.recetaPage).subscribe((res)=>{
      alert('¡Comentario subido!');
    },(err)=>{
      alert('Error al subir comentario: \n'+err.err);
    })
    }); 
  }

}
