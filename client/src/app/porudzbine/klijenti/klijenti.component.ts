import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import { PorudzbineService } from '../services/porudzbine.service';

@Component({
  selector: 'app-klijenti',
  templateUrl: './klijenti.component.html',
  styleUrls: ['./klijenti.component.scss'],
})
export class KlijentiComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  error: string;

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
  ngOnInit(): void {
    this.getKlijent();
    this.porudzbineService.getMesta().subscribe((res) => {
      this.mesta = res;
    });

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
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value);
    this.porudzbineService.postKupac(this.form.value).subscribe((res) => {
      this.form.reset();
      this.formDirective.resetForm();
      this.toastService.fireToast('success', 'Klijent uspesno dodat!');
      this.getKlijent();
    });
  }
}
