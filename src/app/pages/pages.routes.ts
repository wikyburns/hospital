import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { LoginGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

const pagesRoutes: Routes = [
    {path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},
    {path: 'progress', component: ProgressComponent, data: {title: 'Progress'}},
    {path: 'graficas1', component: Graficas1Component, data: {title: 'Graficas'}},
    {path: 'account-settings', component: AccountSettingComponent, data: {title: 'Ajuste de cuenta'}},
    {path: 'profile', component: ProfileComponent, data: {title: 'User Profile'}},
    // Mantenimientos
    {path: 'usuarios', component: UsuariosComponent, data: {title: 'Manteniemiento de usuarios'}},
    {path: 'hospitales', component: HospitalComponent, data: {title: 'Manteniemiento de hospitales'}},
    {path: 'medicos', component: MedicosComponent, data: {title: 'Manteniemiento de medicos'}},
    {path: 'medico/:id', component: MedicoComponent, data: {title: 'Actualizar médico'}},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)