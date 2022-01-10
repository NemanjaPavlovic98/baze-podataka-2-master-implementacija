import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-otpremnica',
  templateUrl: './otpremnica.component.html',
  styleUrls: ['./otpremnica.component.scss'],
})
export class OtpremnicaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  knjigeTocenja = [];

  displayedColumns = {
    broj_otpremnice: 'Broj otpremnice',
    mesto_izdavanja: 'Mesto izdavanja',
    datum: 'Datum',
    tekuci_racun: 'Tekuci racun',
    oznaka: 'Oznaka knjige tocenja',
    izdanje: 'Izdanje knjige tocenja',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  constructor(
    private toastService: ToastService,
    private ponudaService: PonudaService,
    private datepipe: DatePipe
  ) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  private getOtpremnice() {
    this.ponudaService.getOtpremnice().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getOtpremnice();

    this.ponudaService.getKnjigeTocenjaOsnovno().subscribe((res) => {
      this.knjigeTocenja = res;
    });

    this.form = new FormGroup({
      mesto_izdavanja: new FormControl(null),
      datum: new FormControl(null),
      tekuci_racun: new FormControl(null),
      oznaka: new FormControl(null),
    });
  }

  onAddNew() {
    if (this.form.invalid) {
      return;
    }
    this.form.value.datum = this.datepipe.transform(
      this.form.value.datum,
      'yyyy-MM-dd'
    );
    this.ponudaService.postOtpremnica(this.form.value).subscribe((res) => {
      this.form.reset();
      this.formDirective.resetForm();
      this.toastService.fireToast('success', 'Otpremnica uspesno dodata!');
      this.getOtpremnice();
    });
  }
}
