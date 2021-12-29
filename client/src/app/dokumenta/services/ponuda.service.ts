import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ponude } from '../models/ponuda.model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PonudaService {
  private readonly API_URL = 'http://localhost:3002/ponuda/getPonude';

  constructor(private http: HttpClient,
    private datepipe: DatePipe) {}

  getPonude() {
    return this.http.get<Ponude[]>(this.API_URL)
    .pipe(
      map((res) => {
        res.forEach( (ponuda: Ponude) => {
          ponuda.datum = this.datepipe.transform(ponuda.datum, 'yyyy-MM-dd');
        })
        return res;
      })
      
    );
  }
}
