import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {
  ActionType,
  EmitAction,
  TableActions,
} from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Otpremnica } from '../models/ponuda.model';
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
  editMode = false;
  updateOtpremnica: Partial<Otpremnica>;

  displayedColumns = {
    broj_otpremnice: 'Broj otpremnice',
    mesto_izdavanja: 'Mesto izdavanja',
    datum: 'Datum',
    tekuci_racun: 'Tekuci racun',
    oznaka: 'Oznaka knjige tocenja',
    izdanje: 'Izdanje knjige tocenja',
  };

  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['broj_otpremnice'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['broj_otpremnice'],
      type: 'delete',
    },
  ];

  dataSource = [];

  constructor(
    private toastService: ToastService,
    private ponudaService: PonudaService,
    private datepipe: DatePipe
  ) {}

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

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onAddNew() {
    if (!this.editMode) {
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
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }

      this.ponudaService
        .updateOtpremnica(
          this.updateOtpremnica.broj_otpremnice,
          this.form.value
        )
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast(
            'success',
            'Otpremnica je uspesno azurirana!'
          );
          this.editMode = false;
          this.getOtpremnice();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete otpremnicu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ponudaService.deleteOtpremnica(id).subscribe(() => {
          Swal.fire('Otpremnica je obrisana!', '', 'success');
          this.getOtpremnice();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateOtpremnica = this.dataSource.find((otpr) => {
      return otpr.broj_otpremnice === id;
    });

    this.form.patchValue({
      mesto_izdavanja: this.updateOtpremnica.mesto_izdavanja,
      datum: this.updateOtpremnica.datum,
      tekuci_racun: this.updateOtpremnica.tekuci_racun,
      oznaka: this.updateOtpremnica.oznaka,
    });
  }
}
