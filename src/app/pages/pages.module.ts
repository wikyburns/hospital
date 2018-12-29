import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { DonutComponent } from '../components/graficos/donut/donut.component';


import { SharedModule } from '../shared/shared.module';

// Rutas
import { PAGES_ROUTES } from './pages.routes';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      PagesComponent,
      IncrementadorComponent,
      DonutComponent,
      AccountSettingComponent,
      ProfileComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
      SharedModule,
      PAGES_ROUTES,
      FormsModule,
      ChartsModule,
      BrowserModule,
      PipesModule
    ]
  })
  export class PagesModule {}