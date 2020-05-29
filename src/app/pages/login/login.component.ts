import { Component, OnInit } from '@angular/core';
import { CrearUsuariosService } from 'src/app/servicios/crear-usuarios.service';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email;
  password;
  usuario: UsuarioModel;
  loading = false;
  ingresar = true;
  recordarme = false;

  constructor(public service: CrearUsuariosService, private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();

    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {

    if (form.invalid) { return; }

    this.email = this.usuario.email;
    this.password = this.usuario.password;
    const send = { email: this.email, password: this.password };

    this.loading = true;
    this.ingresar = false;

    this.service.consultar(send).subscribe((data: any) => {
      this.loading = false;
      this.ingresar = true;
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigate(['/menu']);
    }, (error => {
      this.loading = false;
      this.ingresar = true;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.message,
      });
    }));
  }

}
