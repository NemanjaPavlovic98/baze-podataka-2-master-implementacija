import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { JedinicaMere, Proizvod } from '../models/proizvodi.model';

@Injectable({
  providedIn: 'root',
})
export class PreduzeceService {
  private readonly URL_PROIZVODI = `${environment.apiUrl}/proizvod/getProizvodi`;
  private readonly URL_JEDINICE = `${environment.apiUrl}/jedinica-mere/getJediniceMere`;
  
  constructor(private http: HttpClient) {}

  getPonude() {
    return this.http.get<Proizvod[]>(this.URL_PROIZVODI);
  }

  getJediniceMere() {
    return this.http.get<JedinicaMere[]>(this.URL_JEDINICE);
  }
}
