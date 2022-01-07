export interface Ponude {
    ponuda_id: number;
    datum: string;
    naziv: string;
    pib: number;
    mb: number;
    telefon: string;
    naziv_mesta: string;
    postanski_broj: number;
    naziv_ulice: string;
    broj: number;
  }

  export interface KnjigaTocenja {
    oznaka: number,
    izdanje: string,
    datum: string,
    ponuda_id: number,
    opis: string,
    izdao_ime: string,
    izdao_prezime: string,
    primio_ime: string,
    primio_prezime: string
  }