import { Component, OnInit } from '@angular/core';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.scss']
})
export class RacunComponent implements OnInit {
  displayedColumns = {
    broj_racuna: 'Broj racuna',
    mesto_izdavanja: 'Mesto izdavanja',
    datum: 'Datum izdavanja',
    poziv_na_broj: 'Poziv na broj',
    broj_otpremnice: 'Broj otpremnice',
    oznaka: 'Oznaka otpremnice',
    tekuci_racun: 'Za racun',
  };
  displayedColumnsFull= {...this.displayedColumns, actions: 'Akcije'};
  dataSource = [];

  constructor(private ponudaService: PonudaService) {}

  objectKeys(obj) {
    return Object.keys(obj);
 }

  ngOnInit(): void {
    this.ponudaService.getRacuni().subscribe((res) => {
      this.dataSource = res;
    });
  }

}
