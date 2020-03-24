import { Component, OnInit } from '@angular/core';
import { RecetaService } from 'src/app/Services/receta.service';
import { RecetaModel } from 'src/app/Models/RecetaModel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  constructor(private router:ActivatedRoute,private receta:RecetaService) { }

  id;
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
      let dummy:any = res;
      console.log(dummy);
      this.recetaPage = dummy;

    },(err)=>{
      console.log(err);
      alert('Ha ocurrido un error al obtener el post: \n'+err.err)
    })
  }

}
