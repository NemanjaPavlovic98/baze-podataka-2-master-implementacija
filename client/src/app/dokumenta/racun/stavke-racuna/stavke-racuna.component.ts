import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Proizvod } from 'src/app/preduzece/models/proizvodi.model';
import { PreduzeceService } from 'src/app/preduzece/services/preduzece.service';
import {
  ActionType,
  EmitAction,
  TableActions,
} from 'src/app/shared/table/table.model';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { PonudaService } from '../../services/dokumenta.service';

@Component({
  selector: 'app-stavke-racuna',
  templateUrl: './stavke-racuna.component.html',
  styleUrls: ['./stavke-racuna.component.scss'],
})
export class StavkeRacunaComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  racunId: number;
  proizvodi: Proizvod[];
  sifraStavkeEdit: number;

  displayedColumns = {
    broj_racuna: 'Redni broj racuna',
    sifra_stavke: 'Sifra stavke',
    kolicina: 'Kolicina',
    iznos: 'Iznos',
    proizvod_id: 'Proizvod ID',
    naziv: 'Naziv proizvoda',
  };
  dataSource = [];

  actions: TableActions[] = [
    {
      name: 'edit',
      icon: 'edit',
      emit: true,
      param: ['sifra_stavke'],
      type: 'edit',
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['sifra_stavke'],
      type: 'delete',
    },
  ];

  form: FormGroup;
  editMode = false;

  constructor(
    private dokumentaService: PonudaService,
    private preduzeceService: PreduzeceService,
    private toastService: ToastService,
    private route: ActivatedRoute,
  ) {}

  private getStavkeRacuna() {
    this.dokumentaService.getStavkeRacuna(this.racunId).subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    this.racunId = +this.route.snapshot.paramMap.get('broj_racuna');
    this.getStavkeRacuna();

    this.preduzeceService.getProizvodi().subscribe((res) => {
      this.proizvodi = res;
    });

    this.form = new FormGroup({
      kolicina: new FormControl(null),
      iznos: new FormControl(null),
      proizvod: new FormControl(null),
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
    for (const key in this.form.value) {
      if (this.form.value[key] === '') {
        this.form.value[key] = null;
      }
    }

    this.dokumentaService
      .updateStavkaRacuna({
        ...this.form.value,
        sifra_stavke: this.sifraStavkeEdit,
        broj_racuna: this.racunId,
      })
      .subscribe(() => {
        this.form.reset();
        this.formDirective.resetForm();
        this.toastService.fireToast('success', 'Stavka uspesno azurirana!');
        this.editMode = false;
        this.getStavkeRacuna();
      });
  }

  onDelete(sifra_stavke: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete stavku za racun?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dokumentaService
          .deleteStavkaRacuna(this.racunId, sifra_stavke)
          .subscribe(() => {
            Swal.fire('Stavka je obrisana!', '', 'success');
            this.getStavkeRacuna();
          });
      }
    });
  }

  onEdit(id: number) {
    this.editMode = true;
    this.sifraStavkeEdit = id;
    const updateStavka = this.dataSource.find((stavka) => {
      return stavka.sifra_stavke === id;
    });

    this.form.patchValue({
      kolicina: updateStavka.kolicina,
      iznos: updateStavka.iznos,
      proizvod: updateStavka.proizvod_id,
    });
  }
}
