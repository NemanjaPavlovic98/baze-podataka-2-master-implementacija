import { Component, OnInit } from '@angular/core';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.scss'],
})
export class ProizvodiComponent implements OnInit {
  displayedColumns = {
    naziv: 'Naziv',
    opis: 'Opis',
    jacina: 'Jacina',
    br_lab_analize: 'Br. Lab. Analize',
    naziv_jm: 'Jedinica mere',
    aktuelna_cena: 'Aktuelna cena',
  };
  displayedColumnsFull= {...this.displayedColumns, actions: 'Akcije'};
  dataSource = [];

  constructor(private preduzeceService: PreduzeceService) {}

  objectKeys(obj) {
    return Object.keys(obj);
 }

  ngOnInit(): void {
    this.preduzeceService.getPonude().subscribe((res) => {
      this.dataSource = res;
    });
  }
}
