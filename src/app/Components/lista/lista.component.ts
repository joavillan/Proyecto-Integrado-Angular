import { Component, OnInit } from '@angular/core';
import { RecetaModel } from 'src/app/Models/RecetaModel';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  constructor() { }

  idElim: any;
  categoria;
  recetas:RecetaModel[]=[];
  titulo;
  rol;
  p:number=1;
  searchArgs:string;
  tpp = 10;

  ngOnInit() {
  }

}
