import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
    ) { }

  matchStrings( campo1: string, campo2: string){

    return ( group: FormGroup) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2) {
        return null;
      }

      return {
        match: true
      }
    }

  }

  ngOnInit() {
    init_plugins();

    this.form = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators : this.matchStrings('password', 'password2')});

    this.form.setValue({
      nombre: 'Sebas',
      correo: 'sebas@gmail.com',
      password: 'test',
      password2: 'test',
      condiciones: true
    });
  }

  registrarUsuario() {
    
    if ( this.form.invalid ) {
      return;
    }

    if ( !this.form.value.condiciones ){
      swal('Importante! ', ' debe acceptar las condiciones', 'warning');
      return;
    }

    let usuario = new Usuario (
      this.form.value.nombre,
      this.form.value.correo,
      this.form.value.password
    );

    this._usuarioService.crearUsuario( usuario )
        .subscribe( resp => this.router.navigate(['/login']));

    // console.log('formulario es: ', this.form.valid);
    // console.log( this.form.value);
  }

}
