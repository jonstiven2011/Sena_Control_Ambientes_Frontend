import { Component, OnInit } from '@angular/core';
import { CrearUsuariosService } from 'src/app/servicios/crear-usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AmbienteComponent } from '../ambiente/ambiente.component';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {
  columnsToDisplay = [
    'id',
    'nombre',
    'estado',
    'usabilidad',
    // 'tools'

  ];
  loading = false;
  usuariosLista;
  
  dataSource: MatTableDataSource<any>;

  constructor(private service: CrearUsuariosService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.listaUsuarios();
    this.dataSource = new MatTableDataSource();
  }

  listaUsuarios() {
    this.loading = true;

    this.service.consultarApiAmbientes().subscribe((enviroments: any) => {
      this.dataSource.data = enviroments;

      if (enviroments.length >= 1) {
        this.usuariosLista = false;
      } else {
        this.usuariosLista = true;
      }

      this.loading = false;

      if (enviroments.length >= 1) {
        this.usuariosLista = false;
      } else {
        this.usuariosLista = true;
      }
      this.loading = false;

    }, (error) => {
      this.loading = false;
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se produjo un error al consultar los ambientes, por favor intentelo de nuevo mas tarde.',
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
