import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// Para evitar que typescript me marque error
// declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})

export class UsuariosComponent implements OnInit {
  
  usuarios: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = false;

  totalRegistros: number = 0;

  constructor( 
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit() {

    this.cargarUsuarios();
    this._modalUploadService.notificion
      .subscribe( resp => {
        this.cargarUsuarios();
      });

  }

  mostrarModal( usuario_id: string) {
    this._modalUploadService.mostrarModal('usuarios', usuario_id);
  }

  cargarUsuarios() {

    this.cargando = true;

    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( (resp: any) => {

          this.cargando = false;

          this.usuarios = resp.usuarios;
          this.totalRegistros = resp.total;

        });
  }

  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuarioService.buscarUsuarios( termino )
        .subscribe( (resp: Usuario[])  => {
          this.usuarios = resp;
          this.cargando = false;
        });

  } 

  borrarUsuario( usuario: Usuario ) {
    
    if ( usuario._id === this._usuarioService.usuario._id ) {
      swal('No puede borrar usuario', 'No te puede eliminar a ti mismo', 'error');
      return;
    }
  

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
      })
      .then(borrar => {
      
        if (borrar) {
          this._usuarioService.borrarUsuario( usuario )
            .subscribe( borrado => {
              console.log(borrado);
              this.cargarUsuarios();
            });
        }
      });
  }

  guardarUsuario( usuario: Usuario ) {

    this._usuarioService.actualizar( usuario )
      .subscribe();

  }

}
