import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Kupac, KupacPost, Mesto } from '../models/porudzbine.model';

@Injectable({
  providedIn: 'root',
})
export class PorudzbineService {
  private readonly URL_MESTA = `${environment.apiUrl}/mesto`;
  private readonly URL_KUPCI = `${environment.apiUrl}/kupac`;

  
  constructor(private http: HttpClient) {}

  getMesta() {
    return this.http.get<Mesto[]>(`${this.URL_MESTA}/getMesta`);
  }

  postMesto(mesto: Mesto){
    return this.http.post(`${this.URL_MESTA}/postMesto`, mesto);
  }

  getKupci() {
    return this.http.get<Kupac[]>(`${this.URL_KUPCI}/getKupci`);
  }

  postKupac(kupac: KupacPost){
    return this.http.post(`${this.URL_KUPCI}/postKupac`, kupac);
  }
}
