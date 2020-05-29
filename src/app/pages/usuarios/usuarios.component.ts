import { Component, OnInit } from '@angular/core';
import { CrearUsuariosService } from 'src/app/servicios/crear-usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  columnsToDisplay = [
    'id',
    'nombre',
    // 'tipo documento',
    'documento',
    'email',
    'rol',
    'tools'

  ];
  loading = false;
  usuariosLista;

  dataSource: MatTableDataSource<any>;

  constructor(private service: CrearUsuariosService, private router: Router, public dialog: MatDialog) {

    if (this.service.rolUsuario() === 'Auxiliar Almacen') {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.listaUsuarios();
  }

  listaUsuarios() {
    this.loading = true;
    this.service.consultarUsuarios().subscribe((users: any) => {

      this.dataSource.data = users;

      if (users.length >= 1) {
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


  borrarUsuario(id, name) {
    Swal.fire({
      title: 'Información',
      text: 'Esta seguro que desea eliminar este usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.service.eliminarUsuarios(id).subscribe(resp => {
          console.log(resp);
          this.listaUsuarios();
        });
        Swal.fire(
          'Información',
          'El usuario "' + name + '" se elimino con exito',
          'success'
        );
      }
     
    });

  }

  crear(idUser) {
    const dialogRef = this.dialog.open(UsuarioComponent, {
      width: '720px',
      height: '600px',
      panelClass: 'modal-delete',
      data: {
        id: idUser
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listaUsuarios();
    });
  }
}
