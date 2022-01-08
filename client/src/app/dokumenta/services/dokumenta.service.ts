import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KnjigaTocenja, KnjigaTocenjaOsnovno, Ponude } from '../models/ponuda.model';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PonudaService {
  private readonly API_URL = 'http://localhost:3002';

  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getPonude(godina?: number) {
    return this.http
      .get<Ponude[]>(`${this.API_URL}/ponuda/getPonude`, {
        params: { year: godina ? godina : '' },
      })
      .pipe(
        map((res) => {
          res.forEach((ponuda: Ponude) => {
            ponuda.datum = this.datepipe.transform(ponuda.datum, 'yyyy-MM-dd');
          });
          return res;
        })
      );
  }

  getKnjigeTocenja() {
    return this.http
      .get(`${this.API_URL}/knjiga-tocenja/getKnjigaTocenja`)
      .pipe(
        map((res: KnjigaTocenja[]) => {
          return res.map((knjiga: KnjigaTocenja) => {
            const novi = {
              oznaka: knjiga.oznaka,
              izdanje: knjiga.izdanje,
              datum: this.datepipe.transform(knjiga.datum, 'yyyy-MM-dd'),
              ponuda_id: knjiga.ponuda_id,
              opis: knjiga.opis,
              nalog_izdao: knjiga.izdao_ime + ' ' + knjiga.izdao_prezime,
              nalog_primio: knjiga.primio_ime + ' ' + knjiga.primio_prezime,
            };
            return novi;
          });
        })
      );
  }

  getKnjigeTocenjaOsnovno() {
    return this.http.get<KnjigaTocenjaOsnovno[]>(`${this.API_URL}/knjiga-tocenja/getKnjigaTocenjaOsnovno`);
  }

  postKnjigaTocenja(knjigaTocenja: Partial<KnjigaTocenja>) {
    return this.http.post(
      `${this.API_URL}/knjiga-tocenja/postKnjigaTocenja`,
      knjigaTocenja
    );
  }
}
