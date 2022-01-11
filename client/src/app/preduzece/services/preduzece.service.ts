import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { CeneProizvod, FullProizvod, JedinicaMere, Proizvod, Zaposleni } from '../models/proizvodi.model';

@Injectable({
  providedIn: 'root',
})
export class PreduzeceService {
  private readonly URL_PROIZVODI = `${environment.apiUrl}/proizvod`;
  private readonly URL_JEDINICE = `${environment.apiUrl}/jedinica-mere`;
  private readonly URL_ZAPOSLENI = `${environment.apiUrl}/zaposleni`;
  
  constructor(private http: HttpClient, private datepipe: DatePipe) {}

  getProizvodi() {
    return this.http.get<Proizvod[]>(`${this.URL_PROIZVODI}/getProizvodi`);
  }

  getProizvod(id: number) {
    return this.http.get<Proizvod>(`${this.URL_PROIZVODI}/getProizvod/${id}`);
  }

  postProizvodi(proizvod: Proizvod){
    return this.http.post(`${this.URL_PROIZVODI}/postProizvod`, proizvod);
  }

  updateProizvod(id: number, proizvod: FullProizvod){
    return this.http.put(`${this.URL_PROIZVODI}/updateProizvod/${id}`, proizvod);
  }

  getJediniceMere() {
    return this.http.get<JedinicaMere[]>(`${this.URL_JEDINICE}/getJediniceMere`);
  }

  postJediniceMere(jedinica_mere: JedinicaMere) {
    return this.http.post(`${this.URL_JEDINICE}/postJediniceMere`, jedinica_mere);
  }

  deleteJediniceMere(id: number){
    return this.http.delete(`${this.URL_JEDINICE}/deleteJedinicaMere/${id}`);
  }

  getZaposleni(){
    return this.http.get<Zaposleni[]>(`${this.URL_ZAPOSLENI}/getZaposleni`);
  }

  postZaposleni(zaposleni: Zaposleni){
    return this.http.post(`${this.URL_ZAPOSLENI}/postZaposleni`, zaposleni);
  }

  updateZaposleni(id: number, zaposleni){
    return this.http.put(`${this.URL_ZAPOSLENI}/updateZaposleni/${id}`, zaposleni);
  }

  deleteZaposleni(id: number){
    return this.http.delete(`${this.URL_ZAPOSLENI}/deleteZaposleni/${id}`);
  }

  getCeneZaProizvod(id: number){
    return this.http.get<CeneProizvod[]>(`${this.URL_PROIZVODI}/getCenaZaProizvod/${id}`)
    .pipe(
      map((res) => {
        res.forEach( (cenaProizvod: CeneProizvod) => {
          cenaProizvod.datum = this.datepipe.transform(cenaProizvod.datum, 'yyyy-MM-dd');
          cenaProizvod.iznos = cenaProizvod.iznos + ' din'
        })
        return res;
      })
    );
  }

  postCenaZaProizvod(cenaProizvod: CeneProizvod){
    return this.http.post(`${this.URL_PROIZVODI}/postCenaZaProizvod`, cenaProizvod);
  }

  deleteProizvod(id: number){
    return this.http.delete(`${this.URL_PROIZVODI}/deleteProizvod/${id}`);
  }

  deleteCenaZaProizvod(id: number, datum: string){
    return this.http.post(`${this.URL_PROIZVODI}/deleteCenaZaProizvod`, {proizvod_id: id, datum: datum});
  }
}