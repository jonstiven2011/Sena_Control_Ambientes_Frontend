import { Component, OnInit } from '@angular/core';
import { CrearUsuariosService } from 'src/app/servicios/crear-usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user_rol;
  users_menu = true;
  users_name;

  constructor(private service: CrearUsuariosService, private router: Router) {
    this.user_rol = this.service.rolUsuario();
    console.log(this.user_rol);
    
    if (this.user_rol === 'Auxiliar Almacen') {
      this.users_menu = false;
    }
  }

  ngOnInit() {
    this.users_name = this.service.nombreUsuario();
  }

  salir() {
    this.service.logout();
    this.router.navigateByUrl('/login');
  }
}
