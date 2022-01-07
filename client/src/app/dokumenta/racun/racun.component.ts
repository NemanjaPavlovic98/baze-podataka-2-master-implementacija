import { Component, OnInit } from '@angular/core';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.scss']
})
export class RacunComponent implements OnInit {
  displayedColumns = {
    naziv: 'Naziv',
    p_info: 'Opis-Jacina-Br analize',
    naziv_jm: 'Jedinica mere',
    aktuelna_cena: 'Aktuelna cena',
  };
  displayedColumnsFull= {...this.displayedColumns, actions: 'Akcije'};
  dataSource = [];

  constructor(private ponudaService: PonudaService) {}

  objectKeys(obj) {
    return Object.keys(obj);
 }

  ngOnInit(): void {
    // this.preduzeceService.getProizvodi().subscribe((res) => {
    //   this.dataSource = res;
    // });
  }

}
