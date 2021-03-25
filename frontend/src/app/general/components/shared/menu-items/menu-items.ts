import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}
export interface SubMenu {
  state: string;
  name: string;
  type: string;
  icon: string;
  saperator?: Saperator[];
  children?: ChildrenItems[];
}
export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

//
const MENUITEMS = [
  {
    state: 'statistics',
    name: 'Dashboard',
    type: 'link',
    icon: 'speed'
  },
  {
    state: 'admin',
    name: 'Settings',
    type: 'sub',
    icon: 'settings',
    children: [
      { state: 'catalogs', name: 'Catalogs', type: 'link' },
      { state: 'users', name: 'Users', type: 'link' },
      { state: 'establishment', name: 'Establishment', type: 'link' },
      { state: 'parameters', name: 'Parameters', type: 'link' },
      { state: 'patients', name: 'Patients', type: 'link' }
    ]
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
