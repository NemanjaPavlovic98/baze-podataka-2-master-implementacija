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

  export interface KnjigaTocenjaOsnovno {
    oznaka: number,
    izdanje: string,
  }

  export interface Racun{
    broj_racuna: number;
    mesto_izdavanja: string;
    datum: string;
    poziv_na_broj: number;
    broj_otpremnice: number;
    oznaka: number;
    tekuci_racun: number;
  }

  export interface StavkaRacuna{
    broj_racuna: number;
    sifra_stavke: number;
    kolicina: number;
    iznos: number;
    proizvod_id: number;
    naziv: string
  }

  export interface Otpremnica{
    broj_otpremnice: number;
    mesto_izdavanja: string;
    datum: string;
    tekuci_racun: number;
    oznaka: number;
    izdanje: string
  }