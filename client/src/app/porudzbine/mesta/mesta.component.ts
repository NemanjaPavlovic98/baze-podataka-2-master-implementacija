import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActionType, TableActions } from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { Mesto } from '../models/porudzbine.model';
import { PorudzbineService } from '../services/porudzbine.service';

@Component({
  selector: 'app-mesta',
  templateUrl: './mesta.component.html',
  styleUrls: ['./mesta.component.scss'],
})
export class MestaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  form: FormGroup;
  formSearch: FormGroup;
  editMode = false;
  updateMesto: Mesto;

  displayedColumns = {
    postanski_broj: 'Postanski broj',
    naziv_mesta: 'Naziv mesta',
  };

  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['mesto_id'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['mesto_id'],
      type: 'delete',
    },
  ];
  dataSource = [];

  constructor(
    private porudzbineService: PorudzbineService,
    private toastService: ToastService
  ) {}

  private getMesta() {
    this.porudzbineService.getMesta().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getMesta();

    this.form = new FormGroup({
      postanski_broj: new FormControl(null),
      naziv_mesta: new FormControl(null),
    });

    this.formSearch = new FormGroup({
      pretraga: new FormControl(null, Validators.required),
    });
  }

  onClickAction(data) {
    if (data.action_type === ActionType.EDIT) {
      this.onEdit(data.data_id);
    } else if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id);
    }
  }

  onSearch() {
    this.porudzbineService
      .getMesta(this.formSearch.value.pretraga)
      .subscribe((res) => {
        this.dataSource = res;
      });
  }

  onAddNew() {
    if (!this.editMode) {
      this.porudzbineService.postMesto(this.form.value).subscribe((res) => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Mesto uspesno dodato!');
        this.getMesta();
      });
    } else {
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }

      this.porudzbineService
        .updateMesto(this.updateMesto.mesto_id, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.formDirective.resetForm();
          this.toastService.fireToast('success', 'Mesto uspesno azurirano!');
          this.editMode = false;
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
        this.porudzbineService.deleteMesto(id).subscribe(() => {
          Swal.fire('Mesto obrisano!', '', 'success');
          this.getMesta();
        });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.updateMesto = this.dataSource.find((mest) => {
      return mest.mesto_id === id;
    });
    this.form.patchValue({
      postanski_broj: this.updateMesto.postanski_broj,
      naziv_mesta: this.updateMesto.naziv_mesta,
    });
  }
}
