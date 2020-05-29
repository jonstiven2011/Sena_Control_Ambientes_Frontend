import { Component, OnInit, Inject } from '@angular/core';
import { PrestamoAmbientesService } from 'src/app/servicios/prestamo-ambientes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { PrestamoComponent } from '../prestamo/prestamo.component';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {
  columnsToDisplay = [
    'nombre',
    'cuentadante',
    'hora_start',
    'hora_end',
    'state',
    'tools'
  ];
  
  loading = false;
  usuariosLista;

  ambientes;
  equipment;
  nombreAmbiente;
  descripcionAmbiente;
  cantidadAmbiente;
  dia =  new Date().getDate();
  mes = new Date().getMonth();
  year = new Date().getFullYear();
  date = this.dia + " / " + this.mes + " / " + this.year;
  dataSource: MatTableDataSource<any>;

  constructor(private service: PrestamoAmbientesService, private router: Router, public dialog: MatDialog) {
    if (this.service.rolUsuario() === 'Auxiliar Almacen') {
      this.router.navigate(['/menu']);
    }
   }

  ngOnInit() {
    this.date;
    //
    this.listaPrestamos();
    this.dataSource = new MatTableDataSource();
  }
  //Listar
  listaPrestamos() {
  this.loading = true;

    this.service.consultarPrestamos().subscribe((prestamos: any) => {
      this.dataSource.data = prestamos;

      if (prestamos.length >= 1) {
        this.usuariosLista = false;
      } else {
        this.usuariosLista = true;
      }

      this.loading = false;

      if (prestamos.length >= 1) {
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
  //Filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //Borrar Prestamo
  borrarAmbiente(id, name) {
    Swal.fire({
      title: 'Información',
      text: 'Esta seguro que desea eliminar este prestamo ' + name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.service.eliminarPrestamo(id).subscribe(resp => {
          console.log(resp);
          this.listaPrestamos();
        });
        Swal.fire(
          'Información',
          'El prestamo ambiente "' + name + '" se elimino con exito',
          'success'
        );
      }
    });
  }

  //Crear
  crear(idUser) {
    const dialogRef = this.dialog.open(PrestamoComponent, {
      width: '800px',
      height: '900px',
      panelClass: 'modal-delete',
      data: {
        id: idUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaPrestamos();
    });
  }

}
