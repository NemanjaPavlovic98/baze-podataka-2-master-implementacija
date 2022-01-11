import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Kupac, KupacPost, Mesto, Ulica } from '../models/porudzbine.model';

@Injectable({
  providedIn: 'root',
})
export class PorudzbineService {
  private readonly URL_MESTA = `${environment.apiUrl}/mesto`;
  private readonly URL_KUPCI = `${environment.apiUrl}/kupac`;

  
  constructor(private http: HttpClient) {}

  getUlice() {
    return this.http.get<Ulica[]>(`${this.URL_MESTA}/getUlica`);
  }

  getMesta() {
    return this.http.get<Mesto[]>(`${this.URL_MESTA}/getMesta`);
  }

  postMesto(mesto: Mesto){
    return this.http.post(`${this.URL_MESTA}/postMesto`, mesto);
  }

  deleteMesto(id: number){
    return this.http.delete(`${this.URL_MESTA}/deleteMesto/${id}`);
  }

  getKupci() {
    return this.http.get<Kupac[]>(`${this.URL_KUPCI}/getKupci`);
  }

  postKupac(kupac: KupacPost){
    return this.http.post(`${this.URL_KUPCI}/postKupac`, kupac);
  }

  deleteKupci(id: number){
    return this.http.delete(`${this.URL_KUPCI}/deleteKupac/${id}`);
  }

  updateKupac(id: number, kupac: Partial<Kupac>){
    return this.http.put(`${this.URL_KUPCI}/updateKupac/${id}`, kupac);
  }

  updateMesto(id: number, mesto){
    return this.http.put(`${this.URL_MESTA}/updateMesto/${id}`, mesto);
  }
}
