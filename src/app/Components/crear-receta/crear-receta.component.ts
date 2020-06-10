import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/Services/receta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/Services/image.service';
import { URL_API } from 'src/app/Cons/cons';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
import { RecetaModel } from 'src/app/Models/RecetaModel';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-crear-receta',
  templateUrl: './crear-receta.component.html',
  styleUrls: ['./crear-receta.component.css']
})
export class CrearRecetaComponent implements OnInit {
  imagename: string = '';
  nombreIcono: string;
  comentarios: [{}];
  filePath: any;
  Imgsrc: any;
  Imgpreview: any;

  constructor(private receta:RecetaService, private sanitizer:DomSanitizer, private imageS:ImageService, private router:Router, private routerEdit:ActivatedRoute, private storage:AngularFireStorage) { }

  id;
  editar:boolean = false;
  conImage:boolean = true;
  titulo="";
  subtitulo=""
  categoria="Comidas";
  cuerpo="";
  fecha;
  mg=0;
  ncomen=0;
  img="";
  nombreImage="";
  file;
  ext="";
  visible:boolean=false;
  tags;
  items:any[]=[];
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
    this.routerEdit.params.subscribe(event => {
      this.id = event.id;
     });
     this.receta.getRecetaById(this.id).subscribe((data:RecetaModel)=>{
      this.editar=true;
      this.fecha=data.fecha;
      this.cuerpo = data.cuerpo;
      this.subtitulo=data.subtitulo;
      this.titulo=data.titulo;
      this.categoria=data.categoria;
      console.log('data tags: '+data.tags);
      //this.tags=data.tags;
      this.comentarios=data.comentarios;
      this.imagename=data.img;
      this.img=data.img;
      console.log('Imagen: '+this.imagename);
      if (data.img == null) {
        this.conImage = false;
        console.log(this.conImage)
      }
     })
    //console.log(this.visible);
  }

  subirReceta(){
    if (this.titulo == null || this.titulo == '' || this.Imgpreview == null || this.Imgpreview == '') {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Asegúrate de haber escrito al menos el título y una imagen',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      Swal.fire({
        position: 'top-end',
        title: 'Cargando...',
        showConfirmButton: false,
      })
      Swal.showLoading();
      console.log(this.titulo)
      if (this.editar == false && this.imagename == '' || this.conImage == false || this.editar == true && this.file != null) {
        console.log('enta');
        this.nombreIcono = `${this.titulo.trim().replace('?','').replace('<','').replace('>','')}`;
        this.imagename =URL_API+`images/images/download/${this.nombreIcono}`;
        if (this.Imgpreview != null || this.Imgpreview != undefined) {
          this.filePath = this.nombreIcono;
          const fileRef = this.storage.ref(this.filePath);
          this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
            fileRef.getDownloadURL().subscribe((url) => {
        
              setTimeout(() => {
                console.log("console.log(Este wao)");
                this.imagename = url;
                this.subirImagen();
              }, 500);
            })
          })
        }
        //this.subirImagen();
      }
    }
  }

  /*handleFileSelect(evt){
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
  }*/

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

  actualizarReceta() {
    if (this.titulo == null || this.titulo == '') {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Asegúrate de haber escrito al menos el título',
        showConfirmButton: false,
        timer: 1500
      })
    }else {
      Swal.fire({
        position: 'top-end',
        title: 'Cargando...',
        showConfirmButton: false,
      })
      Swal.showLoading();
      this.filePath = this.titulo;
      const fileRef = this.storage.ref(this.filePath);
      if (this.Imgpreview == null) {
        let recetaModel={
          titulo:this.titulo.replace('<','').replace('>',''),
          subtitulo:this.subtitulo,
          categoria:this.categoria,
          cuerpo:this.cuerpo,
          img:this.imagename,
          tags:this.items,
          comentarios:[],
          fecha:this.fecha,
          mg:this.mg,
          mgs:[],
          ncomen:this.ncomen
        }
        this.receta.putRecetaById(this.id, recetaModel).subscribe((resp)=>{
          Swal.close();
          Swal.fire(
            '¡Receta actualizada!',
            'Pulsa OK para continuar cocinando',
            'success'
          )
          this.router.navigate(['/Receta/'+this.id]);
          //alert('Receta creada');
        },(err)=>{
          Swal.fire(
            '¡Error!',
            'Error al actualizar la receta',
            'error'
          )
          //alert('Error al editar la receta: \n'+err);
        });
      }
      this.storage.upload(this.filePath, this.Imgpreview).then(result=>{
        fileRef.getDownloadURL().subscribe((url) => {
        setTimeout(() => {
          var imagename=''
          imagename = url;
          let recetaModel={
            titulo:this.titulo.replace('<','').replace('>',''),
            subtitulo:this.subtitulo,
            categoria:this.categoria,
            cuerpo:this.cuerpo,
            img:this.imagename,
            tags:this.items,
            comentarios:[],
            fecha:this.fecha,
            mg:this.mg,
            mgs:[],
            ncomen:this.ncomen
          }
          this.receta.putRecetaById(this.id, recetaModel).subscribe((resp)=>{
            Swal.close();
            Swal.fire(
              '¡Receta actualizada!',
              'Pulsa OK para continuar cocinando',
              'success'
            )
            this.router.navigate(['/Receta/'+this.id]);
            //alert('Receta creada');
          },(err)=>{
            Swal.fire(
              '¡Error!',
              'Error al actualizar la receta',
              'error'
            )
            //alert('Error al editar la receta: \n'+err);
          });
        }, 500);
      })
      })
    }
  }

  subirImagen(){
    if (this.editar == true && this.tags != null || this.editar == false && this.tags != null) {
      for (let itm of this.tags) {
        console.log(itm);
        if (this.tags != null) {
          this.items.push(itm.value);
        }
      }
    }

    let f:Date = new Date();
    console.log(f);
    let fe = f.getDate()+'/'+(f.getMonth()+1)+'/'+f.getUTCFullYear();
    this.fecha = fe;
    console.log(this.fecha);
    console.log('subiendo tags:'+this.items);
    let recetaModel={
      titulo:this.titulo.replace('<','').replace('>',''),
      subtitulo:this.subtitulo,
      categoria:this.categoria,
      cuerpo:this.cuerpo,
      img:this.imagename,
      tags:this.items,
      comentarios:[],
      fecha:this.fecha,
      mg:this.mg,
      mgs:[],
      ncomen:this.ncomen
    }
    if (this.editar == false) {
      this.receta.postReceta(recetaModel).subscribe((resp)=>{
        Swal.close();
        Swal.fire(
          '¡Receta creada!',
          'Pulsa OK para continuar cocinando',
          'success'
        )
        this.router.navigate(['/Lista/Ultimas']);
        //alert('Receta creada');
      },(err)=>{
        Swal.fire(
          '¡Error!',
          'Error al crear la receta',
          'error'
        )
        //alert('Error al crear la receta: \n'+err);
      });
    }else {
      this.receta.putRecetaById(this.id, recetaModel).subscribe((resp)=>{
        Swal.close();
        Swal.fire(
          '¡Receta actualizada!',
          'Pulsa OK para continuar cocinando',
          'success'
        )
        this.router.navigate(['/Receta/'+this.id]);
        //alert('Receta creada');
      },(err)=>{
        Swal.fire(
          '¡Error!',
          'Error al actualizar la receta',
          'error'
        )
        //alert('Error al editar la receta: \n'+err);
      });
    }
  }

}