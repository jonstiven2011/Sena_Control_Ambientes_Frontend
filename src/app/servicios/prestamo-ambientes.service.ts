import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PrestamoModel } from '../models/prestamo.model';

@Injectable({
  providedIn: 'root'
})
export class PrestamoAmbientesService {

  private httpOptions: any;
  private httpHeaders: any;
  private urlMaster = environment.serverUrl.concat('/api/v1');

  usertoken: string;
  userol: string;
  username: string;

  constructor(private http: HttpClient) {
    this.leerToken();
    this.leerRol();
    this.leerName();

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'apikey': '$2b$04$XlUUFqE8Gumb8DSXJiXoYOgX3JPgMrQvkI0XlmQgbAHjJp9JvSIb.'
      })
    };
   }
   //
   logout() {
    localStorage.removeItem('token');
  }

  saveApplicant(request) {
    return this.http.post(`${this.urlMaster}/prestamo/create`, request, this.httpOptions);
  }

  consultar(login) {
    return this.http.post(`${this.urlMaster}/user/login`, login, this.httpOptions).pipe(map(resp => {
      this.guardarName(resp['name']);
      this.guardarRol(resp['user_rol']);
      this.guardarToken(resp['token'].token);
      return resp;
    }));
  }

  private guardarToken(token: string) {
    this.usertoken = token;
    localStorage.setItem('token', token);
  }

  private guardarRol(rol: string) {
    this.userol = rol;
    localStorage.setItem('user_rol', rol);

  }

  private guardarName(name: string) {
    this.username = name;
    localStorage.setItem('name', name);

  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.usertoken = localStorage.getItem('token');
    } else {
      this.usertoken = '';
    }

    return this.usertoken;
  }

  leerRol() {
    if (localStorage.getItem('user_rol')) {
      this.userol = localStorage.getItem('user_rol');
    } else {
      this.userol = '';
    }

    return this.userol;
  }

  leerName() {
    if (localStorage.getItem('name')) {
      this.username = localStorage.getItem('name');
    } else {
      this.username = '';
    }

    return this.userol;
  }

  estaAutenticado(): boolean {
    return this.usertoken.length > 2;
  }

  rolUsuario(){
    return this.userol;
  }

  nombreUsuario(){
    return this.username;
  }
  //*************** */
  consultarUsuarios() {
    return this.http.get(`${this.urlMaster}/user/listUser`);
  }

  consultarUsuario(id: any) {
    return this.http.get(`${this.urlMaster}/user/${id}`);
  }

  getUsuario(id: any, request) {
    return this.http.patch(`${this.urlMaster}/user/edit/${id}`, request, this.httpOptions);
  }


  savePrestamo(request) {
    return this.http.post(`${this.urlMaster}/prestamo/create`, request, this.httpOptions);
  }
  //Consultar Ambientes de Enviroments
  consultarEnviromensAmbi() {
    return this.http.get(`${this.urlMaster}/enviroments/listEnviroments`);
  }

  //Lista de prestamos
  consultarPrestamos() {
    return this.http.get(`${this.urlMaster}/prestamo/listPrestamo`);
  }

  //Consulta de prestamo
  consultarPrestamo(id: any) {
    return this.http.get(`${this.urlMaster}/prestamo/${id}`);
  }

  //Eliminar prestamo
  eliminarPrestamo(id: any) {
    return this.http.delete(`${this.urlMaster}/prestamo/${id}`);
  }

  //Mostrar prestamos
  getPrestamos(id: any, request) {
    return this.http.patch(`${this.urlMaster}/prestamo/edit/${id}`, request, this.httpOptions);
  }

  //Trae los datos de la api
  consultarApiAmbientes() {
    return this.http.get('https://cronode.herokuapp.com/api/gestec/ambients', this.httpHeaders);
  }

  consultarApiUsuario() {
    return this.http.get('https://cronode.herokuapp.com/api/gestec/users', this.httpHeaders);
  }    

}
