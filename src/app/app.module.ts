import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { Http } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
//To use ngModel
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
//to import datatables
import { DataTablesModule } from 'angular-datatables';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthenticationService } from './authentication.service';
import { AuthGuardService } from './auth-guard.service';
import { HttpErrorHandlerService } from './http-error-handler.service';
import { MessageService } from './message.service';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
//Bootstrap Modals
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ProductoItemComponent } from './producto/producto-list/producto-item/producto-item.component';

//Routes
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  {path: 'categoria', component: CategoriaComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'presentacion/:id', component: PresentacionComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductoComponent,
    CategoriaComponent,
    PresentacionComponent,
    HeaderComponent,
    FooterComponent,
    ProductoListComponent,
    ProductoItemComponent
  ],
  imports: [
    BrowserModule,
    //HttpModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes),
    DataTablesModule,
    AngularFontAwesomeModule
  ],
  providers: [AuthenticationService, AuthGuardService, HttpErrorHandlerService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
