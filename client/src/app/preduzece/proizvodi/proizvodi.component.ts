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
    p_info: 'Opis-Jacina-Br analize',
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
    this.preduzeceService.getProizvodi().subscribe((res) => {
      this.dataSource = res;
      // res.forEach(row =>{
      //   console.log(row?.p_info)
      // })
    });
  }
}
