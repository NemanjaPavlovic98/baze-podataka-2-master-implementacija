import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];
  mesta = [];
  ulice = [];

  constructor(
    private porudzbineService: PorudzbineService,
    private toastService: ToastService
  ) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  private getKlijent() {
    this.porudzbineService.getKupci().subscribe((res) => {
      this.dataSource = res;
    });
  }

  getMesta() {
    this.porudzbineService.getMesta().subscribe((res) => {
      this.mesta = res;
    });
  }

  getUlice() {
    this.porudzbineService.getUlice().subscribe((res) => {
      this.ulice = res;
    });
  }

  ngOnInit(): void {
    this.getKlijent();
    this, this.getMesta();
    this.getUlice();
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

  onAddNew() {
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
        })
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Kupac uspesno azuriran!');
          this.editMode = false;
          this.getKlijent();
          this.getUlice();
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
    const ulicaFind = this.ulice.find((ulc: Partial<Kupac>) => {
      return ulc.ulica_id === this.updateKlijent.ulica_id;
    });

    this.form.patchValue({
      naziv: this.updateKlijent.naziv,
      pib: this.updateKlijent.pib,
      mb: this.updateKlijent.mb,
      telefon: this.updateKlijent.telefon,
      mesto: this.updateKlijent.mesto_id,
      ulica: ulicaFind.naziv_ulice,
      broj: this.updateKlijent.broj,
    });
  }
}
