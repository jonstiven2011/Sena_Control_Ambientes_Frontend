import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';

import { AuthGuard } from './guards/auth.guard';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { AmbienteComponent } from './pages/ambiente/ambiente.component';
import { PrestamoComponent } from './pages/prestamo/prestamo.component';
import { PrestamosComponent } from './pages/prestamos/prestamos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
  { path: 'usuario/:id', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'ambiente/:id', component: AmbienteComponent, canActivate: [AuthGuard] },
  { path: 'prestamos', component: PrestamosComponent, canActivate: [AuthGuard] },
  { path: 'prestamo', component: PrestamoComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
