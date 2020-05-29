import { Component, OnInit, Inject } from '@angular/core';
import { CrearUsuariosService } from 'src/app/servicios/crear-usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import * as $ from 'jquery';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  styleUrls: ['./ambiente.component.css']
})
export class AmbienteComponent implements OnInit {
  public ApplicantForm: FormGroup;

  validForm = true;
  title = '';
  rowUpdate = 0;
  titleCargando = '';
  list_ambients;
  list_users;
  furnitures_name;
  equipment_name;
  furnitures_description;
  equipment_description;
  furnitures_quantity;
  equipment_quantity;
  name;
  novelty;
  cuentadante;
  usability;
  state;
  furnitures = [];
  equipment = [];
  state_ambients = false;


  muebles;
  // fieldArray: any = [{ id: 0, name: '', description: '', quantity: '1' }];

  private fieldArrayFurnitures: Array<any> = [];
  private fieldArrayEquipment: Array<any> = [];
  private newAttributeFurnitures: any = {};
  private newAttributeEquipment: any = {};



  id = this.activate.snapshot.paramMap.get('id');


  constructor(@Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<AmbienteComponent>,
    private service: CrearUsuariosService, private router: Router, public formBuilder: FormBuilder,
    private activate: ActivatedRoute) { }

  ngOnInit() {

    this.service.consultarApiAmbientes().subscribe(ambients => {
      this.list_ambients = ambients;
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se produjo un error al consultar los ambientes, por favor intentelo de nuevo mas tarde.',
      });
    });


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



    if (this.data.id !== 'nuevo') {
      this.title = 'Editar Ambiente';
      this.state_ambients = true;
      this.titleCargando = 'Editando ambiente ...';
      this.service.consultarAmbiente(this.data.id).subscribe(resp => {

        this.name = resp['name'];
        this.cuentadante = resp['cuentadante'];
        this.usability = resp['usability'];
        this.state = resp['state'];
        this.novelty = resp['novelty'];


        for (let i = 0; i <= resp['furnitures'].length; i++) {
          this.fieldArrayFurnitures = JSON.parse(resp['furnitures']);
          this.ApplicantForm.controls.furnitures.setValue(this.fieldArrayFurnitures);
        }

        for (let i = 0; i <= resp['equipment'].length; i++) {
          this.fieldArrayEquipment = JSON.parse(resp['equipment']);
          this.ApplicantForm.controls.equipment.setValue(this.fieldArrayEquipment);
        }

      });
    } else {
      this.title = 'Crear Ambiente';
      this.titleCargando = 'Creando ambiente ...';
    }


    this.ApplicantForm = this.formBuilder.group({
      cuentadante: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      usability: ['', Validators.compose([Validators.required])],
      state: ['', Validators.compose([Validators.required])],
      furnitures: ['', Validators.compose([Validators.required])],
      equipment: ['', Validators.compose([Validators.required])],
      novelty: [''],
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


  addFurnitures() {
    this.fieldArrayFurnitures.push(this.newAttributeFurnitures);
    this.newAttributeFurnitures = {};

    console.log(this.fieldArrayFurnitures);
    this.ApplicantForm.controls.furnitures.setValue(this.fieldArrayFurnitures);
  }

  deleteFurnitures(index) {
    this.fieldArrayFurnitures.splice(index, 1);
  }



  addEquipment() {
    this.fieldArrayEquipment.push(this.newAttributeEquipment);
    this.newAttributeEquipment = {};
    this.ApplicantForm.controls.equipment.setValue(this.fieldArrayEquipment);
  }

  deleteEquipment(index) {
    this.fieldArrayEquipment.splice(index, 1);
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
      this.service.getEnviroments(this.data.id, this.ApplicantForm.value).subscribe(resp => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Ambiente actualizado con exito',
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
      this.service.saveEnviroments(this.ApplicantForm.value).subscribe((data: any) => {
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
