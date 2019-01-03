import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  
  medicos: Medico[] = [];
  constructor(
    public _medicoService: MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicoService.cargarMedicos()
      .subscribe( medicos => {
        this.medicos = medicos;
      });
  }

  buscarMedico( termino: string) {
    if ( termino.length > 0 ) {
      this._medicoService.buscarMedicos( termino )
      .subscribe( medicos => {
        this.medicos = medicos;
      });
    } else {
      this.cargarMedicos();
    }
   
  }
  
  borrarMedico( medico: Medico) {
    
    this._medicoService.borrarMedico( medico )
      .subscribe( resp => this.cargarMedicos());
  }

}
