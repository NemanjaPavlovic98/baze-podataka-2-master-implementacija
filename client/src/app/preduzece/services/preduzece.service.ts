import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proizvod } from '../models/proizvodi.model';

@Injectable({
  providedIn: 'root',
})
export class PreduzeceService {
  private readonly API_URL = 'http://localhost:3002/proizvod/getProizvodi';

  constructor(private http: HttpClient) {}

  getPonude() {
    return this.http.get<Proizvod[]>(this.API_URL);
  }
}
