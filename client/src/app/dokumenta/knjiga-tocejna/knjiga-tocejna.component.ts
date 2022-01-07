import { Component, OnInit } from '@angular/core';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-knjiga-tocejna',
  templateUrl: './knjiga-tocejna.component.html',
  styleUrls: ['./knjiga-tocejna.component.scss']
})
export class KnjigaTocejnaComponent implements OnInit {

  displayedColumns = {
    oznaka: 'Oznaka',
    izdanje: 'Izdanje',
    datum: 'Datum',
    ponuda_id: 'Ponuda id',
    opis: 'Ponuda naziv',
    nalog_izdao: 'Nalog izdao',
    nalog_primio: 'Nalog primio',
  };
  displayedColumnsFull= {...this.displayedColumns, actions: 'Akcije'};
  dataSource = [];

  constructor(private ponudaService: PonudaService) {}

  objectKeys(obj) {
    return Object.keys(obj);
 }

  ngOnInit(): void {
    this.ponudaService.getKnjigeTocenja().subscribe(res =>{
      this.dataSource = res;
      console.log(res)
    })
  }

}
