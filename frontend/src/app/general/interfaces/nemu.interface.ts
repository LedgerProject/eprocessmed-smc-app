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
    roles: string[];
  }
  export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
    roles: string[];
  }
  