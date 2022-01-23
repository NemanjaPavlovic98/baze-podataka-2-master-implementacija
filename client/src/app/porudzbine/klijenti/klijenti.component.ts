import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Kupac } from '../models/porudzbine.model';
import { PorudzbineService } from '../services/porudzbine.service';

@Component({
  selector: 'app-klijenti',
  templateUrl: './klijenti.component.html',
  styleUrls: ['./klijenti.component.scss'],
})
export class KlijentiComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateKlijent: Partial<Kupac>;

  displayedColumns = {
    naziv: 'Kupac',
    mb: 'Maticni broj',
    pib: 'PIB',
    telefon: 'Telefon',
    postanski_broj: 'Postanski broj',
    naziv_mesta: 'Mesto',
    naziv_ulice: 'Ulica',
    broj: 'Broj ulice',
  };

  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['kupac_id'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['kupac_id'],
      type: 'delete',
    },
  ];

  dataSource = [];
  mesta = [];
  ulice = [];

  constructor(
    private porudzbineService: PorudzbineService,
    private toastService: ToastService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getKlijent() {
    this.porudzbineService.getKupci().subscribe((res) => {
      console.log(res);
      this.dataSource = res;
    });
  }

  getMesta() {
    this.porudzbineService.getMesta().subscribe((res) => {
      this.mesta = res;
    });
  }

  getUlice(mesto_id: number) {
    this.porudzbineService.getUliceForMesto(mesto_id).subscribe((res) => {
      this.ulice = res;
    });
  }

  ngOnInit(): void {
    this.getKlijent();
    this.getMesta();
    this.form = new FormGroup({
      naziv: new FormControl(null),
      pib: new FormControl(null),
      mb: new FormControl(null),
      telefon: new FormControl(null),
      mesto: new FormControl(null),
      ulica: new FormControl(null),
      broj: new FormControl(null),
    });
  }
  getUliceZaMesto(mesto_id: number) {
    this.getUlice(mesto_id);
  }

  onAddNew() {
    console.log(this.form.value);
    if (!this.editMode) {
      this.porudzbineService.postKupac(this.form.value).subscribe((res) => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Klijent uspesno dodat!');
        this.getKlijent();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }

      this.porudzbineService
        .updateKupac(this.updateKlijent.kupac_id, {
          ...this.form.value,
          adresa_id: this.updateKlijent.adresa_id,
          ulica_id: this.updateKlijent.ulica_id,
          mesto_id: this.updateKlijent.mesto_id,
        })
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Kupac uspesno azuriran!');
          this.editMode = false;
          this.getKlijent();
          // this.getUlice();
          this.getMesta();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete mesto?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.porudzbineService.deleteKupci(id).subscribe(() => {
          Swal.fire('Klijent obrisan!', '', 'success');
          this.getKlijent();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateKlijent = this.dataSource.find((mest) => {
      return mest.kupac_id === id;
    });
    this.getUlice(this.updateKlijent.mesto_id);

    this.form.patchValue({
      naziv: this.updateKlijent.naziv,
      pib: this.updateKlijent.pib,
      mb: this.updateKlijent.mb,
      telefon: this.updateKlijent.telefon,
      mesto: this.updateKlijent.mesto_id,
      ulica: this.updateKlijent.ulica_id,
      broj: this.updateKlijent.broj,
    });
  }
}
