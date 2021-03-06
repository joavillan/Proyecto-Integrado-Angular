import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { SigInComponent } from './Components/sig-in/sig-in.component';
import { LoginComponent } from './Components/login/login.component';
import { ListaComponent } from './Components/lista/lista.component';
import { CrearRecetaComponent } from './Components/crear-receta/crear-receta.component';
import { RecetaComponent } from './Components/receta/receta.component';
import { IsloggedService } from './Services/islogged.service';
import { VerifyComponent } from './Components/verify/verify.component';
import { SettingsComponent } from './Components/settings/settings.component';


const routes: Routes = [
  { path: 'Home', component: HomeComponent
  },
  { path: 'SigIn', component: SigInComponent
  },
  { path: 'LogIn', component: LoginComponent, canActivate:[IsloggedService]
  },
  { path: 'Lista/:categoria', component: ListaComponent
  },
  { path: 'CrearReceta', component: CrearRecetaComponent
  },
  { path: 'EditarReceta/:id', component: CrearRecetaComponent
  },
  { path: 'Receta/:id', component: RecetaComponent
  },
  { path: 'Settings', component: SettingsComponent
  },
  { path: 'Verify/:id', component: VerifyComponent
  },
  {path: '', redirectTo: 'Lista/Ultimas',pathMatch: 'full'},
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
