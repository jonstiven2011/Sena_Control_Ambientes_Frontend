import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';


import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';




import { ReactiveFormsModule } from '@angular/forms';




import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AmbienteComponent } from './pages/ambiente/ambiente.component';
import { VerAmbientesComponent } from './pages/ver-ambientes/ver-ambientes.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';
import { ExportService } from '../app/servicios/export.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenuComponent,
    NavbarComponent,
    UsuariosComponent,
    UsuarioComponent,
    AmbienteComponent,
    VerAmbientesComponent,
    PrestamoComponent,
    PrestamosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [ExportService],
  bootstrap: [AppComponent]
})
export class AppModule { }
