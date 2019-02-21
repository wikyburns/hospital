import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {
  
  hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {

    this.cargarHospitales();
    this._modalUploadService.notificion
      .subscribe( resp => {
        this.cargarHospitales();
      });

  }

  buscarHospital( termino: string ) {
    
    if ( termino.length > 0 ) {
      this._hospitalService.buscarHospital( termino ).subscribe( (resp: any) => {
        this.hospitales = resp.hospitales;
      });
    }
    
  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital ).subscribe( resp => {
      this.cargarHospitales();
    });
    
  }

  nuevoHospital() {
    
    //TODO: Hay que solventar este error de TypeScript
    // swal({
    //   text: 'Nuevo hospital',
    //   content: 'input',
    //   buttons: ['Cancelar', 'Crear']
    // })
    // .then(nombre => {
    //   this._hospitalService.crearHospital( nombre ).subscribe( resp => {
    //     this.cargarHospitales();
    //   });
    // });
      
  }

  borrarHospital( hospital: Hospital ) {

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
      })
      .then(borrar => {
      
        if (borrar) {
          this._hospitalService.borrarHospital( hospital._id )
            .subscribe( borrado => {
              console.log(borrado);
              this.cargarHospitales();
            });
        }
      });
  }

  mostrarModal( hospital_id: string) {
    this._modalUploadService.mostrarModal('hospitales', hospital_id);
  }

  cargarHospitales() {

    this._hospitalService.cargarHospitales()
    .subscribe( (resp: any) => {
      this.hospitales = resp.hospitales;
    });

  }

  obtenerHospital( id: string ) {
    this._hospitalService.obtenerHospital( id )
    .subscribe( resp => {
      console.log( resp );
    });
  }

  crearHospital( nombre: string ) {

    this._hospitalService.crearHospital( nombre )
    .subscribe( resp => {
      swal('Hospital creado ', nombre, 'success');
      console.log( resp );
    });

  }

  actualizarHospital( hospital: Hospital ) {

    this._hospitalService.actualizarHospital( hospital )
      .subscribe( resp => {
        swal('Hospital actualizado ', hospital.nombre, 'success');
        console.log(resp);
      });
  }



}
