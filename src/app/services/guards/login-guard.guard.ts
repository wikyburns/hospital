import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService){}

  canActivate(): boolean {
    
    if ( this._usuarioService.estaLogueado() ) {
      console.log('paso el guard');
      return true;
    } else {
      console.log('bloquado');
      return false;
    }
  }
}
