import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    let url = URL_SERVICES + '/medico';

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }

  buscarMedicos(	termino:	string ) {

    let url = URL_SERVICES + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.medicos;
      })
    );

  }

  borrarMedico ( medico: Medico ) {
    let url = URL_SERVICES + '/medico/' + medico._id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.delete( url ).pipe(
      map( resp => {
        swal('Médico se ha eliminado', '', 'success');
        return resp;
      })
    );
  }
}
