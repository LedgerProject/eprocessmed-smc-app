import { session } from '../global/data/session';

export interface User {
  idUser?: number | null;
  dni?: string;
  name?: string;
  lastname?: string;
  login?: string;
  password?: string;
  mail?: string;
  codePhone?: any;
  phone?: string;
  idGoogle?: string;
  idHashAlastria?: string;
  idCatRoluser?: any;
  userStructure: any;
  idCatAccesstype?: any;
  idEstablishment?: number | null;
  idSpecialist?: number | null;
  idCatNotification?: any;
  regStatus?: string;
  keyZoom?: string;
  codeOtp?: number | null;
}