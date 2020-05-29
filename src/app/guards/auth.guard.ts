import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CrearUsuariosService } from '../servicios/crear-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: CrearUsuariosService, private router: Router) {

  }
  canActivate(): boolean {
    if (this.service.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
