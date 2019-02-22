import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor( 
    public _usuarioService: UsuarioService,
    public router: Router
     ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  buscar( termino: string ){
    this.router.navigate(['/busqueda', termino]);
  }

}
