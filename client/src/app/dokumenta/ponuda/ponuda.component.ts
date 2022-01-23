import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import Swal from 'sweetalert2';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-ponuda',
  templateUrl: './ponuda.component.html',
  styleUrls: ['./ponuda.component.scss'],
})
export class PonudaComponent implements OnInit {
  form: FormGroup;

  displayedColumns = {
    datum: 'Datum',
    opis: 'Opis',
    naziv: 'Naziv',
    pib: 'PIB',
    mb: "Maticni broj",
    telefon: 'Telefon',
    postanski_broj: 'Postanski broj',
    naziv_mesta: 'Naziv mesta',
    naziv_ulice: 'Naziv mesta',
    broj: 'Broj',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      route: '/dokumenta/ponuda/edit-ponuda',
      param: ['ponuda_id'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['ponuda_id', 'datum'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(private ponudaService: PonudaService) {}

  getPonude() {
    this.ponudaService.getPonude().subscribe((res) => {
      this.dataSource = res;
    console.log(res)
    });
  }
  ngOnInit(): void {
    this.getPonude();

    this.form = new FormGroup({
      pretraga: new FormControl(null, Validators.required),
    });
  }

  onClickAction(data){
    if(data.action_type === ActionType.DELETE){
      this.onDelete(data.data_id, data.datum)
    }
  }

  onSearch() {
    this.ponudaService.getPonude(this.form.value.pretraga).subscribe((res) => {
      this.dataSource = res;
    });
  }

  onDelete(id: number, datum: string) {
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
