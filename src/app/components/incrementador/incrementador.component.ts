import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progress: number = 50;

  @Output() OcambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log(this.leyenda);
    console.log(this.progress);
   }

  ngOnInit() {
  }

  onChanges(newValue: number) {

    if (newValue >= 100) {
      this.progress = 100;
    } else if ( newValue <= 0 ){
      this.progress = 0;
    } else {
      this.progress = newValue;
    }

    this.txtProgress.nativeElement.value = this.progress;
    this.OcambioValor.emit(this.progress);

  }

  cambiarValor( valor: number ) {
    if ( this.progress + valor > 100 ) {
      return;
    }

    if ( this.progress + valor < 0 ) {
      return;
    }

    this.progress = this.progress + valor;
    this.OcambioValor.emit(this.progress);

    this.txtProgress.nativeElement.focus();
  }

}
