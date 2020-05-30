import { Component, OnInit, Inject } from '@angular/core';
import { PrestamoAmbientesService } from 'src/app/servicios/prestamo-ambientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.css']
})
export class PrestamoComponent implements OnInit {
  public ApplicantForm: FormGroup;

  validForm = true;
  title = '';
  rowUpdate = 0;
  titleCargando = '';
  list_ambients;
  list_users;
  name;
  cuentadante;
  hora_start;
  hora_end;
  initial_novelty;
  final_novelty;
  state = 'inactivo';
  state_ambients = false;


  dia =  new Date().getDate();
  mes = new Date().getMonth();
  year = new Date().getFullYear();
  date = this.dia + " / " + this.mes + " / " + this.year;

  id = this.activate.snapshot.paramMap.get('id');


  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PrestamoComponent>,
  private service: PrestamoAmbientesService, private router: Router, public formBuilder: FormBuilder,
  private activate: ActivatedRoute) { }

  ngOnInit() {
    //date
    this.date;

    //Para mostrar en un select
    this.service.consultarEnviromensAmbi().subscribe(ambients => {
      this.list_ambients = ambients;
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se produjo un error al consultar los ambientes, por favor intentelo de nuevo mas tarde.',
      });
    });

    //Para mostrar en un select
    this.service.consultarApiUsuario().subscribe(users => {
      this.list_users = users;
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se produjo un error al consultar los usuarios, por favor intentelo de nuevo mas tarde.',
      });
    });

    //Crear
    if (this.data.id !== 'nuevo') {
      this.title = 'Entregar Ambiente';
      this.state_ambients = true;
      this.state = 'activo';
      console.log(this.state);
      this.titleCargando = 'Entregando Ambiente ...';
      this.service.consultarPrestamo(this.data.id).subscribe(resp => {

        this.name = resp['name'];
        this.cuentadante = resp['cuentadante'];
        // this.hora_start = resp['hora_start'];
        // this.hora_end = resp['hora_end'];
        this.state = 'activo';
        this.initial_novelty = resp['initial_novelty'];
        this.final_novelty = resp['final_novelty'];

      });
    } else {
      this.title = 'Crear Prestamo';
      this.titleCargando = 'Creando Prestamo ...';
    }
    
    this.ApplicantForm = this.formBuilder.group({
      cuentadante: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      // hora_start: ['', Validators.compose([Validators.required])],
      // hora_end: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      initial_novelty: [''],
      final_novelty: [''],
      
    }
    );
  }

  //Validadores
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


  sendForm() {

    console.log(this.ApplicantForm.status);

    if (!this.ApplicantForm.valid) {
      this.dirtyApplicantForm();

    }
    if (this.ApplicantForm.status === 'INVALID') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe proporcionar todos los datos del formulario',
      });

    } else {
      this.validForm = true;
      this.onSubmit();
    }

  }

  //Enviar
    onSubmit() {
      Swal.fire({
        title: 'Espere',
        text: 'Guardando información',
        icon: 'info',
        allowOutsideClick: false
      });
      Swal.showLoading();
      
      if (this.data.id !== 'nuevo') {
        this.ApplicantForm.value.initial_novelty = this.initial_novelty;
        this.service.getPrestamos(this.data.id, this.ApplicantForm.value).subscribe(resp => {
          this.state = 'activo';
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Ambiente recibido con exito',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialogRef.close();
        }, (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message,
          });
        });
      } else {
        this.service.savePrestamo(this.ApplicantForm.value).subscribe((data: any) => {
          this.state;
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
