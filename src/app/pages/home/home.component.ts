import { Component, OnInit } from '@angular/core';
import { CrearUsuariosService } from 'src/app/servicios/crear-usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { AmbienteComponent } from '../ambiente/ambiente.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  columnsToDisplay = [
    'id',
    'nombre',
    'cuentadante',
    'estado',
    'tools'

  ];
  loading = false;
  usuariosLista;

  ambientes;
  equipment;
  nombreAmbiente;
  descripcionAmbiente;
  cantidadAmbiente;

  dataSource: MatTableDataSource<any>;

  constructor(private service: CrearUsuariosService, private router: Router, public dialog: MatDialog) {
    if (this.service.rolUsuario() === 'Auxiliar Almacen') {
      this.router.navigate(['/menu']);
    }
  }

  ngOnInit() {
    this.listaAmbientes();
    this.dataSource = new MatTableDataSource();
  }

  listaAmbientes() {
    this.loading = true;

    this.service.consultarAmbientes().subscribe((enviroments: any) => {
      this.dataSource.data = enviroments;

      if (enviroments.length >= 1) {
        this.usuariosLista = false;
      } else {
        this.usuariosLista = true;
      }

      this.loading = false;

      for (let i = 0; i < enviroments.length; i++) {
        this.ambientes = JSON.parse(enviroments[i].furnitures);
        for (let i = 0; i < this.ambientes.length; i++) {
          this.nombreAmbiente = this.ambientes[i].nombre;
          this.descripcionAmbiente = this.ambientes[i].description;
          this.cantidadAmbiente = this.ambientes[i].cantidad;

        }
        this.equipment = JSON.parse(enviroments[i].furnitures);
        for (let i = 0; i < this.equipment.length; i++) {
          this.nombreAmbiente = this.equipment[i].nombre;
          this.descripcionAmbiente = this.equipment[i].description;
          this.cantidadAmbiente = this.equipment[i].cantidad;

        }

      }

      if (enviroments.length >= 1) {
        this.usuariosLista = false;
      } else {
        this.usuariosLista = true;
      }
      this.loading = false;
    }, (error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error.message,
      });
    }));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  borrarAmbiente(id, name) {
    Swal.fire({
      title: 'Información',
      text: 'Esta seguro que desea eliminar el ambiete ' + name ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.service.eliminarAmbientes(id).subscribe(resp => {
          console.log(resp);
          this.listaAmbientes();
        });
        Swal.fire(
          'Información',
          'El ambiente "' + name + '" se elimino con exito',
          'success'
        );
      }
    });

  }

  crear(idUser) {
    const dialogRef = this.dialog.open(AmbienteComponent, {
      width: '800px',
      height: '900px',
      panelClass: 'modal-delete',
      data: {
        id: idUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaAmbientes();
    });
  }
}
