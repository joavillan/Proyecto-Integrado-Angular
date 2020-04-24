import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { SigInComponent } from './Components/sig-in/sig-in.component';
import { LoginComponent } from './Components/login/login.component';
import { ListaComponent } from './Components/lista/lista.component';
import { CrearRecetaComponent } from './Components/crear-receta/crear-receta.component';
import { RecetaComponent } from './Components/receta/receta.component';
import { SafePipe } from './Pipes/safePipe';
import { VerifyComponent } from './Components/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigInComponent,
    LoginComponent,
    ListaComponent,
    CrearRecetaComponent,
    SafePipe,
    RecetaComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TooltipModule.forRoot(),
    NgxEditorModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
