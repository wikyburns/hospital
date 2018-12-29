import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    
  token: string;
  usuario: Usuario;
  constructor(
    public http: HttpClient,
    public router: Router
    ) { 
    this.cargarStorage();
  }

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    
    if ( recordar ) {
      localStorage.setItem('email', usuario.email);
    }

    let url = URL_SERVICES + '/login';
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        
        this.token = resp.token;

        localStorage.setItem( 'id', resp.id );
        localStorage.setItem( 'token', resp.token );
        localStorage.setItem( 'usuario', JSON.stringify(resp.usuario) );
        
        return true;
      })
    );
  }

  estaLogueado () {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
      this.router.navigate(['/login']);
    }
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICES + '/usuario';

    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }));
  }

  
}
