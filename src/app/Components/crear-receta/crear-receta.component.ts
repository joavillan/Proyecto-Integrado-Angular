import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/Services/receta.service';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/Services/image.service';
import { URL_API } from 'src/app/Cons/cons';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit {
  imagename: string;
  nombreIcono: string;

  constructor(private receta:RecetaService, private imageS:ImageService, private router:Router) { }

  titulo="";
  subtitulo=""
  categoria="Comidas";
  cuerpo="";
  img="";
  nombreImage="";
  file;
  ext="";
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

  ngOnInit() {
  }

  subirReceta(){
    console.log(this.titulo)
    this.nombreIcono = `${this.titulo.trim().replace('?','').replace('<','').replace('>','')}Img`+'.'+this.ext;
    this.imagename =URL_API+`images/images/download/${this.nombreIcono}`;
    this.subirImagen();
    let recetaModel={
      titulo:this.titulo.replace('<','').replace('>',''),
      subtitulo:this.subtitulo,
      categoria:this.categoria,
      cuerpo:this.cuerpo,
      img:this.imagename,
      comentarios:[]
    }
    this.receta.postReceta(recetaModel).subscribe((resp)=>{
      alert('Receta creada');
    },(err)=>{
      alert('Error al crear la receta: \n'+err);
    });
  }

  handleFileSelect(evt){
    var files = evt.target.files;
    this. file = files[0];
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
    
    this.imageS.uploadImage(this.img, this.nombreIcono).subscribe(
      (res) => {
        
      },
      (err) => {
        alert('Ha ocurrido un error en la subida de la imagen:'+err.err);
      })
  }

}
