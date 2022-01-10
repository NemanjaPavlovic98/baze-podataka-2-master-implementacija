export interface Proizvod {
  proizvod_id: number;
  naziv: string;
  // opis: string;
  // jacina: number;
  // br_lab_analize: string;
  p_info: string;
  sifra_jm: number;
  pdv_id: number;
  naziv_jm: string;
  aktuelna_cena: number;
}

export interface JedinicaMere{
  sifra_jm: number;
  naziv_jm: string
}

export interface Zaposleni{
  zaposleni_id?: number;
  ime: string;
  prezime: string;
}


export interface CeneProizvod{
  proizvod_id: number,
  iznos: string,
  datum: string,
  naziv: string
}