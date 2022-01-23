import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Zaposleni } from '../models/proizvodi.model';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-zaposleni',
  templateUrl: './zaposleni.component.html',
  styleUrls: ['./zaposleni.component.scss'],
})
export class ZaposleniComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  editMode = false;
  updateZaposleni: Zaposleni;

  displayedColumns = {
    ime: 'Ime',
    prezime: 'Prezime',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['zaposleni_id'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['zaposleni_id'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private preduzeceService: PreduzeceService,
    private toastService: ToastService
  ) {}

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  private getZaposleni() {
    this.preduzeceService.getZaposleni().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getZaposleni();

    this.form = new FormGroup({
      ime: new FormControl(null),
      prezime: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.preduzeceService.postZaposleni(this.form.value).subscribe((res) => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Zaposleni uspesno dodat!');
        this.getZaposleni();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.preduzeceService
        .updateZaposleni(this.updateZaposleni.zaposleni_id, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Zaposleni uspesno azuriran!');
          this.editMode = false;
          this.getZaposleni();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete zaposlenog?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.preduzeceService.deleteZaposleni(id).subscribe(() => {
          Swal.fire('Zaposleni obrisan!', '', 'success');
          this.getZaposleni();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateZaposleni = this.dataSource.find((zap) => {
      return zap.zaposleni_id === id;
    });
    this.form.patchValue({
      ime: this.updateZaposleni.ime,
      prezime: this.updateZaposleni.prezime,
    });
  }
}
