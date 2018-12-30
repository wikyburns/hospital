import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    
  token: string;
  usuario: Usuario;
  constructor(
    public _subirArchivoService: SubirArchivoService,
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

        this.guardarStorage(resp.id, resp.token, resp.usuario);
        
        return true;
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario) { 
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
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

  actualizar ( usuario: Usuario ){
    
    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    
    return this.http.put( url, usuario )
        .pipe(
          map( (resp: any) => {
            
            if ( usuario._id === this.usuario._id ) {
              let usuarioDB: Usuario = resp.usuario;
              this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
            } 

            swal('Usuario actualziado', usuario.nombre, 'success');

            return true;
          })
        );
  }

  cambiarImagen( file: File, id: string ) {
    
    this._subirArchivoService.subirArchivo(file, 'usuarios', id)
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal('Imagen actualizada', this.usuario.nombre, 'success');
          this.guardarStorage( id, this.token, this.usuario );
        })
        .catch( resp => {
          console.log(resp);
        });

  }

  cargarUsuarios( desde: number = 0 ) {

    let url = URL_SERVICES + '/usuario?desde=' + desde;
    
    return this.http.get( url );

  }

  buscarUsuarios( termino: string ) {

    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.usuarios;
      })
    );
    
  }

  borrarUsuario( usuario: Usuario ) {

    let url = URL_SERVICES + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.delete( url ).pipe(
      map( resp => {
        swal('Usuario eliminado ', 'correctamente', 'success');
        return true;
      })
    )

  }
}
