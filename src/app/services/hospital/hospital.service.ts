import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor( 
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService,
    public http: HttpClient,
  ) { }

  cargarHospitales() {

    let url = URL_SERVICES + '/hospital' ;

    return this.http.get( url );

  }

  obtenerHospital( hospital_id: string ) {

    let url = URL_SERVICES + '/hospital/' + hospital_id;
    url += '?token=' + this._usuarioService.token;

    return this.http.get( url );

  }

  borrarHospital(	id:	string	) {
    
    let url = URL_SERVICES + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;
    
    swal('Hospital eliminado', '', 'success');
    return this.http.delete( url );
  }

  crearHospital(	nombre:	string	) {

    let hospital = new Hospital( nombre );

    let url = URL_SERVICES + '/hospital';
    url += '?token=' + this._usuarioService.token;
    
    swal('Hospital creado ', nombre, 'success');

    return this.http.post( url, hospital );

  }

  buscarHospital(	termino:	string ) {

    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url );

  }

  actualizarHospital(	hospital:	Hospital	) {

    let url = URL_SERVICES + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
      
    swal('Hospital actualizado  ', hospital.nombre, 'success');

    return this.http.put( url, hospital );
  
  }


  
}
