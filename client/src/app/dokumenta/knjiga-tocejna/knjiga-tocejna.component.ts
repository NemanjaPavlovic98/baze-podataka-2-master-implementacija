import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

  getKnjigaTocenjaOsnovno(){
    this.ponudaService.getKnjigeTocenjaOsnovno().subscribe((res: KnjigaTocenjaOsnovno[]) => {
      this.dataSourceOsnovno = res;
    })
  }

  getKnjigaTocenja(){
    this.ponudaService.getKnjigeTocenja().subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    this.getKnjigaTocenjaOsnovno(); 
    this.getKnjigaTocenja();
    
  }

  onDetaljniPrikaz() {
    this.detaljniPrikaz = !this.detaljniPrikaz;
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete rekord knjige tocenja?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ponudaService.deleteKnjigaTocenja(id).subscribe(() => {
          Swal.fire('Klijent obrisan!', '', 'success');
          this.detaljniPrikaz = false;
          this.getKnjigaTocenjaOsnovno();
          this.getKnjigaTocenja();
        });
      }
    });
  }
}
