import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  
  public tipo: string;
  public id: string;
  public oculto: string = 'hidden';

  public notificion = new EventEmitter<any>();

  constructor() {
    console.log('ModalUpload listo');
  }

  ocultarModal() {
    this.oculto = 'hidden';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal( tipo: string, id: string ) {
    this.id = id;
    this.tipo = tipo;
    this.oculto = '';
  }
}
