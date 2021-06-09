import { Injectable } from '@angular/core';

/* Interfaces */
import { Menu } from 'src/app/general/interfaces/nemu.interface';

const MENUITEMS = [
  {
    state: 'statistics',
    name: 'Dashboard',
    type: 'link',
    icon: 'speed',
    roles: ['0,0,0']
  },
  {
    state: 'admin',
    name: 'Administrations',
    type: 'sub',
    icon: 'settings',
    children: [
      { state: 'catalogs', name: 'Catalogs', type: 'link', roles: [] },
      { state: 'establishment', name: 'Establishment', type: 'link', roles: [] },
      { state: 'parameters', name: 'Parameters', type: 'link', roles: [] },
      { state: 'patients', name: 'Patients', type: 'link', roles: [] },
      { state: 'proc-estab', name: 'Proc. Estab.', type: 'link', roles: [] }
    ],
    roles: ['0,0,0']
  },
  {
    state: 'security',
    name: 'Security',
    type: 'sub',
    icon: 'admin_panel_settings',
    children: [
      { state: 'roles-estab', name: 'Roles Estab.', type: 'link', roles: [] },
      { state: 'users', name: 'Users', type: 'link', roles: [] }
    ],
    roles: ['0,0,0']
  },
  {
    state: 'dynamic-forms',
    name: 'Forms',
    type: 'sub',
    icon: 'list_alt',
    children: [
      { state: 'lst-resp-forms', name: 'Patient forms', type: 'link', roles: ['0,1,0'] },
      { state: 'lst-resp-forms', name: 'My QR code', type: 'link', roles: ['0,1,0'] },
      { state: 'lst-resp-forms', name: 'Create form', type: 'link', roles: ['0,4,0'] },
      { state: 'lst-resp-forms', name: 'Medical dashboard', type: 'link', roles: ['0,2,0'] }
    ],
    roles: ['0,1,0','0,2,0','0,4,0']
  },
  {
    state: 'consents',
    name: 'Consents',
    type: 'sub',
    icon: 'spellcheck',
    children: [
      { state: 'signature-house', name: 'Sign consent', type: 'link', roles: ['0,5,0'] }
    ],
    roles: ['0,1,0','0,5,0']
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
