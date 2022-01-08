export interface Mesto {
  postanski_broj: number;
  naziv_mesta: string;
}

export interface Kupac{
  kupac_id: number;
  naziv: string;
  pib: number;
  mb: number;
  telefon: string;
  adresa_id: number;
  ulica_id: number;
  mesto_id: number;
  broj: number;
  naziv_mesta: string;
  naziv_ulica: string;
  postanski_broj: number
}

export interface KupacPost{
  naziv: string;
  pib: number;
  mb: number;
  telefon: string;
  mesto: number;
  broj: number;
  naziv_ulica: string;
}