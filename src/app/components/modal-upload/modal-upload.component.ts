import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  
  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    console.log('Modal listo');
  }

  seleccionaImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }
    
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imagenes!', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;
  
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => {
      
      this.imagenTemp = reader.result.toString();

    };
  }

  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then( resp => {
          this._modalUploadService.notificion.emit( resp );
          this.cerrarModal();
        })
        .catch( err => {
          console.log('Error en la carga');
        });
  }

}
