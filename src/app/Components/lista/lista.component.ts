import { Component, OnInit } from '@angular/core';
import { RecetaModel } from 'src/app/Models/RecetaModel';
import { RecetaService } from 'src/app/Services/receta.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor(private router:ActivatedRoute,private receta:RecetaService) { }

  idElim: any;
  categoria;
  recetas:RecetaModel[]=[];
  titulo;
  rol;
  p:number=1;
  searchArgs:string;
  tpp = 10;

  ngOnInit() {
    this.load();
  }

  load(){
    this.receta.getReceta().subscribe((res:any)=>{
      /*for(let re of res){
        this.recetas.push(re);
      }*/
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
}
