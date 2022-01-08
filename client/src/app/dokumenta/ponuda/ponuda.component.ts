import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.scss']
})

export class PonudaComponent implements OnInit {
  form: FormGroup;

  displayedColumns: string[] = ['datum', 'naziv', 'pib', 'telefon', 'postanski_broj', 'naziv_mesta', 'naziv_ulice', 'broj'];
  displayedColumnsFull: string[] = [...this.displayedColumns, 'actions'];
  dataSource = [];

  constructor(private ponudaService: PonudaService) { }

  ngOnInit(): void {
    this.ponudaService.getPonude().subscribe(res => {
      this.dataSource = res
    });

    this.form = new FormGroup({
      pretraga: new FormControl(null, Validators.required)
    });
  }

  onSearch(){
    this.ponudaService.getPonude(this.form.value.pretraga).subscribe(res => {
      this.dataSource = res
      console.log(this.dataSource)
    });
  }
}
