import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor( 
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params
      .subscribe( params => {
        let termino  = params['termino'];
        this.buscar(termino);
      })
  }

  ngOnInit() {
  }

  buscar( termino: string ) {
    let url = URL_SERVICES + '/busqueda/todo/' + termino;

    this.http.get(url)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.hospitales = resp.hospitales;
        this.medicos = resp.medicos;
        this.usuarios = resp.usuarios;
      });
  }

}
