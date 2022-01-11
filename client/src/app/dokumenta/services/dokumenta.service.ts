import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  KnjigaTocenja,
  KnjigaTocenjaOsnovno,
  Otpremnica,
  Ponude,
  Racun,
  StavkaRacuna,
} from '../models/ponuda.model';
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

  postPonuda(ponuda: Partial<Ponude>) {
    return this.http.post(`${this.API_URL}/ponuda/postPonuda`, ponuda);
  }

  deletePonuda(id: number, datum: string) {
    return this.http.post(`${this.API_URL}/ponuda/deletePonuda`, {
      ponuda_id: id,
      datum: datum,
    });
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

  getKnjigeTocenjaSingle(id: number) {
    return this.http
      .get(`${this.API_URL}/knjiga-tocenja/getKnjigaTocenja/${id}`)
      .pipe(
        map((res: KnjigaTocenja[]) => {
          return res.map((knjiga: KnjigaTocenja) => {
            const novi = {
              ...knjiga,
              datum: this.datepipe.transform(knjiga.datum, 'yyyy-MM-dd'),
            };
            return novi;
          });
        })
      );
  }

  getKnjigeTocenjaOsnovno() {
    return this.http.get<KnjigaTocenjaOsnovno[]>(
      `${this.API_URL}/knjiga-tocenja/getKnjigaTocenjaOsnovno`
    );
  }

  postKnjigaTocenja(knjigaTocenja: Partial<KnjigaTocenja>) {
    return this.http.post(
      `${this.API_URL}/knjiga-tocenja/postKnjigaTocenja`,
      knjigaTocenja
    );
  }

  updateKnjigaTocenja(oznaka, knjiga_tocenja) {
    return this.http.put(
      `${this.API_URL}/knjiga-tocenja/updateKnjigaTocenja/${oznaka}`,
      knjiga_tocenja
    );
  }

  deleteKnjigaTocenja(id: number) {
    return this.http.delete(
      `${this.API_URL}/knjiga-tocenja/deleteKnjigaTocenja/${id}`
    );
  }

  getRacuni() {
    return this.http.get<Racun[]>(`${this.API_URL}/racun/getRacuni`).pipe(
      map((res) => {
        res.forEach((racun: Racun) => {
          racun.datum = this.datepipe.transform(racun.datum, 'yyyy-MM-dd');
        });
        return res;
      })
    );
  }

  postRacun(racun: Partial<Racun>) {
    return this.http.post(`${this.API_URL}/racun/postRacun`, racun);
  }

  getStavkeRacuna(id: number) {
    return this.http.get<StavkaRacuna[]>(
      `${this.API_URL}/racun/getStavkeRacuna/${id}`
    );
  }

  deleteRacun(id: number) {
    return this.http.delete(`${this.API_URL}/racun/deleteRacun/${id}`);
  }

  deleteStavkaRacuna(broj_racuna: number, sifra_stavke: number) {
    return this.http.post(`${this.API_URL}/racun/deleteStavkaRacuna`, {
      broj_racuna: broj_racuna,
      sifra_stavke: sifra_stavke,
    });
  }

  getOtpremnice() {
    return this.http
      .get<Otpremnica[]>(`${this.API_URL}/otpremnica/getOtpremnice`)
      .pipe(
        map((res) => {
          res.forEach((otpremnica: Otpremnica) => {
            otpremnica.datum = this.datepipe.transform(
              otpremnica.datum,
              'yyyy-MM-dd'
            );
          });
          return res;
        })
      );
  }

  postOtpremnica(otpremnica: Partial<Otpremnica>) {
    return this.http.post(
      `${this.API_URL}/otpremnica/postOtpremnica`,
      otpremnica
    );
  }
}
