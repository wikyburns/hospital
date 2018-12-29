import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  recuerdame: boolean = false;
  email: string;
  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
  }

  ingresar( form: NgForm ) {
    console.log(form.valid);
    console.log(form.value);

    if( !form.valid ) {
      return;
    }
    
    let usuario = new Usuario(null, form.value.email, form.value.password);

    this._usuarioService.login( usuario, form.value.recuerdame )
        .subscribe( login => this.router.navigate(['/dashboard']) );
    // this.router.navigate(['/dashboard']);
  }

}
