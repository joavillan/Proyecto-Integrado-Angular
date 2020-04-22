import { Component, OnInit } from '@angular/core';
import { RecetaModel } from 'src/app/Models/RecetaModel';
import { RecetaService } from 'src/app/Services/receta.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private router:ActivatedRoute,private receta:RecetaService,private user:UserService) { }

  idElim: any;
  idU: any;
  categoria;
  recetas:RecetaModel[]=[];
  titulo;
  rol;
  p:number=1;
  searchArgs:string;
  tpp = 10;
  recetaPage:RecetaModel;
  likeado:boolean;

  ngOnInit() {
    this.load();
  }

  load(){
    this.receta.getReceta().subscribe((res:any)=>{
      this.recetas = res;
      this.recetas.reverse();
    })
  }

  buscar(args:string){
    if(args == ''){
      this.load();
      this.p = 1;
    }else{
    this.receta.search(args).subscribe((res:any)=>{
      this.recetas = res;
      this.p = 1;
    },(err)=>{
      this.recetas = []
      alert('¡Vaya!, parece que hemos tenido un problema')
    })
    }
  }

  megusta(id){
    /*let idUsu = 'a';
    let datos;
    this.user.obtenerUsuario().subscribe((data)=>{
      datos = data;
      console.log(datos.id);
      idUsu = datos.id;
      console.log(idUsu);
    },(err)=>{
      alert('Error al obtener usuario');
    })*/
    //console.log(this.recetas);

    let u = JSON.parse(localStorage.getItem('token'));
    let idUsu:string = u.userId;
    let i = -1;
    let ya:boolean = false;

    for (let r of this.recetas) {
      if (r.id == id) {
        for (let m of r.mgs) {
          //console.log(m);
          i++;
          if (m == idUsu) {
            console.log(r.mg);
            r.mg--;
            console.log(r.mg);
            console.log('Hola holita vecinito');
            //console.log(r.mgs[i]);
            r.mgs.splice(i,1);
            ya = true;
            console.log(ya)
          }
        }
        this.receta.putRecetaById(r.id,r).subscribe((response)=>{
          //window.location.reload();
        },(error)=>{
          console.log(`error con el mg`);
        });
      }
    }
    for (let r of this.recetas) {
      if (r.id == id && ya != true) {
        console.log(u.userId);
        console.log(idUsu);
        r.mg++;
        r.mgs.push(idUsu);
        ya = true;
        this.receta.putRecetaById(r.id,r).subscribe((response)=>{
          //window.location.reload();
        },(error)=>{
          console.log(`error con el mg`);
        });
      }
    }
  }
}
