import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Kupac, KupacPost, Mesto, Ulica, UlicaTable } from '../models/porudzbine.model';

@Injectable({
  providedIn: 'root',
})
export class PorudzbineService {
  private readonly URL_MESTA = `${environment.apiUrl}/mesto`;
  private readonly URL_KUPCI = `${environment.apiUrl}/kupac`;

  
  constructor(private http: HttpClient) {}

  getUlice() {
    return this.http.get<UlicaTable[]>(`${this.URL_MESTA}/getUlica`);
  }

  getUliceForMesto(mestoId: number) {
    return this.http.get<UlicaTable[]>(`${this.URL_MESTA}/getUlicaZaMesto/${mestoId}`);
  }

  postUlica(ulica: Partial<Ulica>){
    return this.http.post(`${this.URL_MESTA}/postUlica`, ulica);
  }

  updateUlica(id: number, mesto: number, ulica: Partial<Ulica>){
    return this.http.put(`${this.URL_MESTA}/updateUlica/${id}`, {mesto: mesto, ulica: ulica});
  }

  deleteUlica(id: number, mesto: number){
    return this.http.post(`${this.URL_MESTA}/deleteUlica/${id}`, {mesto: mesto});
  }

  getMesta(naziv?: string) {
    let params = naziv ? {naziv: naziv} : {}
    return this.http.get<Mesto[]>(`${this.URL_MESTA}/getMesta`, {
      params: params,
    });
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
