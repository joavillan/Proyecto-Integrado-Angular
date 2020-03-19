import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent
},
{path: '', redirectTo: '/Home',pathMatch: 'full'},
{
  path        : '**',
  pathMatch   : 'full',
  component   : HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
