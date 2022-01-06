import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { JedinicaMere, Proizvod, Zaposleni } from '../models/proizvodi.model';

@Injectable({
  providedIn: 'root',
})
export class PreduzeceService {
  private readonly URL_PROIZVODI = `${environment.apiUrl}/proizvod`;
  private readonly URL_JEDINICE = `${environment.apiUrl}/jedinica-mere`;
  private readonly URL_ZAPOSLENI = `${environment.apiUrl}/zaposleni`;
  
  constructor(private http: HttpClient) {}

  getProizvodi() {
    return this.http.get<Proizvod[]>(`${this.URL_PROIZVODI}/getProizvodi`);
  }

  postProizvodi(proizvod: Proizvod){
    return this.http.post(`${this.URL_PROIZVODI}/postProizvod`, proizvod);
  }

  getJediniceMere() {
    return this.http.get<JedinicaMere[]>(`${this.URL_JEDINICE}/getJediniceMere`);
  }

  postJediniceMere(jedinica_mere: JedinicaMere) {
    return this.http.post(`${this.URL_JEDINICE}/postJediniceMere`, jedinica_mere);
  }

  getZaposleni(){
    return this.http.get<Zaposleni[]>(`${this.URL_ZAPOSLENI}/getZaposleni`);
  }

  postZaposleni(zaposleni: Zaposleni){
    return this.http.post(`${this.URL_ZAPOSLENI}/postZaposleni`, zaposleni);
  }
}
