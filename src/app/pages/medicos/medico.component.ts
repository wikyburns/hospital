import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/hospital.model';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/services/service.index';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','','','','');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService, 
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRouter.params.subscribe( params => {
      let id = params['id'];

      if ( id !== 'nuevo') {
        this.cargarMedico( id );
      }
    });
  }

  ngOnInit() {
     this._hospitalService.cargarHospitales()
        .subscribe( (hospitales: Hospital[]) => this.hospitales = hospitales );

      this._modalUploadService.notificion
        .subscribe( resp => {
            this.medico.img = resp.usuario.img;
        })

  }

  guardarMedico( f: NgForm) {

    if( f.invalid ){
      return;
    }

    this._medicoService.guardarMedico(this.medico)
    .subscribe( medico => {
        this.medico._id = medico._id;
        this.router.navigate(['/medico', medico._id]);
    });

  }

  cargarMedico( id: string ) {

    this._medicoService.cargarMedico( id )
      .subscribe( medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      })
  }

  cambioHospital ( id: string ) {
    if( id === ""){
      return;
    }
    this._hospitalService.obtenerHospital( id )
      .subscribe( (hospital: any) => {
        this.hospital = hospital.hospital;
      })
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );
  }


}
