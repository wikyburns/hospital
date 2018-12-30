import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icon: 'mdi mdi-gauge',
      submenu: [ 
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'ProgressBar', url: '/progress'},
        { titulo: 'Graficas', url: '/graficas1'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Hospitales', url: '/hospitales' },
        { titulo: 'Médicos', url: '/medicos' }
      ]
    }
  ];
  
  constructor() { }
}
