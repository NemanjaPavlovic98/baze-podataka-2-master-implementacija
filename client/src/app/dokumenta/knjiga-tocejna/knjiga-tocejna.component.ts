import { Component, OnInit } from '@angular/core';
import { KnjigaTocenjaOsnovno } from '../models/ponuda.model';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-knjiga-tocejna',
  templateUrl: './knjiga-tocejna.component.html',
  styleUrls: ['./knjiga-tocejna.component.scss'],
})
export class KnjigaTocejnaComponent implements OnInit {
  detaljniPrikaz = false;

  displayedColumns = {
    oznaka: 'Oznaka',
    izdanje: 'Izdanje',
    datum: 'Datum',
    ponuda_id: 'Ponuda id',
    opis: 'Ponuda naziv',
    nalog_izdao: 'Nalog izdao',
    nalog_primio: 'Nalog primio',
  };

  displayedColumnsOsnovno = {
    oznaka: 'Oznaka',
    izdanje: 'Izdanje'
  };

  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  displayedColumnsOsnovnoFull = { ...this.displayedColumnsOsnovno, actions: 'Akcije' };
  dataSource = [];
  dataSourceOsnovno = [];

  constructor(private ponudaService: PonudaService) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  ngOnInit(): void {
    this.ponudaService.getKnjigeTocenjaOsnovno().subscribe((res: KnjigaTocenjaOsnovno[]) => {
      this.dataSourceOsnovno = res;
    })
    this.ponudaService.getKnjigeTocenja().subscribe((res) => {
      this.dataSource = res;
    });
  }

  onDetaljniPrikaz() {
    this.detaljniPrikaz = !this.detaljniPrikaz;
  }
}
