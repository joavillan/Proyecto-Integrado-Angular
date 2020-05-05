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

  constructor(private router:ActivatedRoute,private receta:RecetaService,private user:UserService, private param:ActivatedRoute) { }

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
    //this.load();
    this.param.params.subscribe(event => {
      this.categoria = event.categoria;
     });
    this.load()
  }

  load(){
    /*this.receta.getReceta().subscribe((res:any)=>{
      this.recetas = res;
      this.recetas.reverse();
    })*/
    switch (this.categoria) {
      case 'Ultimas':
        this.receta.getReceta().subscribe((data:any)=>{
          this.recetas = data;
          this.recetas.reverse();
          /*for(let da of data){
            this.recetas.reverse();
            if(da.categoria=='Comidas'){
              this.recetas.push(da);
            }
          }*/
          console.log(this.receta)
        },(error)=>{
          console.log('algo ha fallado')
        })
        break;
      case 'Comidas':
        this.receta.getReceta().subscribe((data:any)=>{
        
          for(let da of data){
            if(da.categoria=='Comidas'){
              this.recetas.push(da);
            }
          }
          console.log(this.receta)
        },(error)=>{
          console.log('algo ha fallado')
        })
        break;
        case 'Postres':
        this.receta.getReceta().subscribe((data:any)=>{
        
          for(let da of data){
            if(da.categoria=='Postres'){
              this.recetas.push(da);
            }
          }
          console.log(this.receta)
        },(error)=>{
          console.log('algo ha fallado')
        })
        break;
        case 'Comentadas':
        this.receta.getReceta().subscribe((data:any)=>{
        
          /*for(let da of data){
            if(da.categoria=='Postres'){
              this.recetas.push(da);
            }
          }*/
          this.recetas = data.sort(function (a, b){
            return (b.ncomen - a.ncomen)
        })

          console.log(this.receta)
        },(error)=>{
          console.log('algo ha fallado')
        })
        break;
        case 'Megusta':
        this.receta.getReceta().subscribe((data:any)=>{
        
          /*for(let da of data){
            if(da.categoria=='Postres'){
              this.recetas.push(da);
            }
          }*/
          this.recetas = data.sort(function (a, b){
            return (b.mg - a.mg)
        })
          console.log(this.receta)
        },(error)=>{
          console.log('algo ha fallado')
        })
        break;
      }
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
