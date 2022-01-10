import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.scss']
})

export class PonudaComponent implements OnInit {
  form: FormGroup;

  displayedColumns: string[] = ['datum', 'opis', 'naziv', 'pib', 'telefon', 'postanski_broj', 'naziv_mesta', 'naziv_ulice', 'broj'];
  displayedColumnsFull: string[] = [...this.displayedColumns, 'actions'];
  dataSource = [];

  constructor(private ponudaService: PonudaService) { }

  getPonude(){
    this.ponudaService.getPonude().subscribe(res => {
      this.dataSource = res
    });
  }
  ngOnInit(): void {
   this.getPonude();

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

  onDelete(id: number, datum: string) {
    console.log(id)
    console.log(datum)
    Swal.fire({
      title: 'Da li zelite da obrisete ponudu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ponudaService.deletePonuda(id, datum).subscribe(() => {
          Swal.fire('Ponuda je obrisana!', '', 'success');
          this.getPonude();
        });
      }
    });
  }
}
