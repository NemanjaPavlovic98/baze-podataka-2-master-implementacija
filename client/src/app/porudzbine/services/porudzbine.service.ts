import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Mesto } from '../models/porudzbine.model';

@Injectable({
  providedIn: 'root',
})
export class PorudzbineService {
  private readonly URL_MESTA = `${environment.apiUrl}/mesto`;

  
  constructor(private http: HttpClient) {}

  getMesta() {
    return this.http.get<Mesto[]>(`${this.URL_MESTA}/getMesta`);
  }

  postMesto(mesto: Mesto){
    return this.http.post(`${this.URL_MESTA}/postMesto`, mesto);
  }
}
