import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";


import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
    declarations: [
      BreadcrumsComponent,
      HeaderComponent,
      NopagefoundComponent,
      SidebarComponent,
      ModalUploadComponent
    ],
    exports: [
      BreadcrumsComponent,
      HeaderComponent,
      NopagefoundComponent,
      SidebarComponent,
      ModalUploadComponent
    ],
    imports: [
      RouterModule,
      CommonModule,
      PipesModule
    ],
    providers: [],
    bootstrap: []
  })
  export class SharedModule { }