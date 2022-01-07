import { Component, OnInit } from '@angular/core';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.scss']
})

export class PonudaComponent implements OnInit {
  displayedColumns: string[] = ['datum', 'naziv', 'pib', 'telefon', 'postanski_broj', 'naziv_mesta', 'naziv_ulice', 'broj'];
  displayedColumnsFull: string[] = [...this.displayedColumns, 'actions'];
  dataSource = [];

  constructor(private ponudaService: PonudaService) { }

  ngOnInit(): void {
    this.ponudaService.getPonude().subscribe(res => {
      this.dataSource = res
    });
  }

}
