import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Ulica, UlicaTable } from '../models/porudzbine.model';
import { PorudzbineService } from '../services/porudzbine.service';

@Component({
  selector: 'app-ulice',
  templateUrl: './ulice.component.html',
  styleUrls: ['./ulice.component.scss'],
})
export class UliceComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  mesta = [];
  form: FormGroup;
  editMode = false;
  updateUlica: Partial<UlicaTable>;

  displayedColumns = {
    naziv_mesta: 'Naziv mesta',
    naziv_ulice: 'Naziv ulice',
  };
  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['ulica_id'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['ulica_id'],
      type: 'delete',
    },
  ];
  dataSource = [];

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

  private getUlice() {
    this.porudzbineService.getUlice().subscribe((res) => {
      this.dataSource = res;
    });
  }

  getMesta() {
    this.porudzbineService.getMesta().subscribe((res) => {
      this.mesta = res;
    });
  }

  ngOnInit(): void {
    this.getUlice();
    this.getMesta();

    this.form = new FormGroup({
      naziv_ulice: new FormControl(null),
      mesto: new FormControl(null),
      naziv_mesta: new FormControl(null),
    });
  }

  onAddNew() {
    if (!this.editMode) {
      this.porudzbineService.postUlica(this.form.value).subscribe((res) => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Ulica uspesno dodata!');
        this.getUlice();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }

      this.porudzbineService
        .updateUlica(
          this.updateUlica.ulica_id,
          this.updateUlica.mesto_id,
          this.form.value
        )
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Ulica uspesno azurirana!');
          this.editMode = false;
          this.getUlice();
        });
    }
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete ulicu?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUlica = this.dataSource.find((ulica) => {
          return ulica.ulica_id === id;
        });
        console.log(deleteUlica);
        this.porudzbineService
          .deleteUlica(deleteUlica.ulica_id, deleteUlica.mesto_id)
          .subscribe(() => {
            Swal.fire('Ulica obrisana!', '', 'success');
            this.getUlice();
          });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateUlica = this.dataSource.find((ulica) => {
      return ulica.ulica_id === id;
    });
    this.form.patchValue({
      naziv_ulice: this.updateUlica.naziv_ulice,
      mesto: this.updateUlica.mesto_id,
      naziv_mesta: this.updateUlica.naziv_mesta,
    });
  }
}
