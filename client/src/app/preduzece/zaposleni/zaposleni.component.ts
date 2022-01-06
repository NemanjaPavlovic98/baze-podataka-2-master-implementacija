import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.scss'],
})
export class ZaposleniComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;
  
  form: FormGroup;
  error: string;

  displayedColumns = {
    ime: 'Ime',
    prezime: 'Prezime',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  constructor(
    private preduzeceService: PreduzeceService,
    private toastService: ToastService
  ) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  private getZaposleni() {
    this.preduzeceService.getZaposleni().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getZaposleni();

    this.form = new FormGroup({
      ime: new FormControl(null, Validators.required),
      prezime: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (this.form.invalid) {
      return;
    }
    this.preduzeceService.postZaposleni(this.form.value).subscribe((res) => {
      this.form.reset();
      this.formDirective.resetForm();
      this.toastService.fireToast('success', 'Zaposleni uspesno dodat!');
      this.getZaposleni();
    });
  }
}
