import { Component, OnInit, Inject } from '@angular/core';
import { CrearUsuariosService } from 'src/app/servicios/crear-usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'util';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  documentType = ['Cedulda de Ciudadania', 'Cedula Extrangeria', 'NIT'];
  rol = ['Apoyo Almacen', 'Jefe Almacen', 'Auxiliar Almacen'];
  validForm = true;
  user;
  name;
  document;
  document_type;
  email;
  password;
  user_rol;
  title = '';
  titleCargando = '';
  id = this.activate.snapshot.paramMap.get('id');
  public ApplicantForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<UsuarioComponent>,
    private service: CrearUsuariosService, private router: Router, public formBuilder: FormBuilder,
    private activate: ActivatedRoute) { }

  ngOnInit() {

    if (this.data.id !== 'nuevo') {
      this.title = 'Editar Usuario';
      this.titleCargando = 'Editando usuario ...';
      this.service.consultarUsuario(this.data.id).subscribe(resp => {

        this.email = resp['email'];
        this.name = resp['name'];
        this.document = resp['document'];
        this.document_type = resp['documentType'];
        this.password = resp['password'];
        this.user_rol = resp['user_rol'];
        this.user = resp;

      },(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
      }));
    } else {
      this.title = 'Crear Usuario';
      this.titleCargando = 'Creando usuario ...';
    }


    this.ApplicantForm = this.formBuilder.group({
      documentType: ['', Validators.compose([Validators.required])],
      user_rol: ['', Validators.compose([Validators.required])],
      document: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(6), Validators.maxLength(12)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('[ÑA-Zña-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'), Validators.minLength(4), Validators.maxLength(70)])],
      name: ['', Validators.compose([Validators.required, Validators.pattern('[A-ZÑa-zñÀ-ÿ]+[A-ZÑa-zñÀ-ÿ ]*'), Validators.minLength(3), Validators.maxLength(45)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],

    }
    );

  }

  dirtyApplicantForm() {
    const controls = this.ApplicantForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        if (/^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/.test(name)) {
          $(`#${name}`).addClass('is-invalid');
          continue;
        }
        controls[name].markAsTouched({ onlySelf: true });
      }
    }
    this.validForm = false;
  }


  sendCodeValidateOTP() {
    if (!this.ApplicantForm.valid) {
      this.dirtyApplicantForm();

    } else {
      this.validForm = true;
      this.onSubmit();
    }

  }

  onSubmit() {
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if (this.data.id !== 'nuevo') {
      this.service.getUsuario(this.data.id, this.ApplicantForm.value).subscribe(resp => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Usuario actualizado con exito',
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close();
      });
    } else {
      this.service.saveApplicant(this.ApplicantForm.value).subscribe((data: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.dialogRef.close();
      }, (error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
        });
      }));
    }
  }
}
