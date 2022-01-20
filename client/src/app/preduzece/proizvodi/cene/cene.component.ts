import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { PreduzeceService } from '../../services/preduzece.service';

@Component({
  selector: 'app-cene',
  templateUrl: './cene.component.html',
  styleUrls: ['./cene.component.scss']
})
export class CeneComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  proizvodId: number;
  form: FormGroup;
  error: string;

  displayedColumns = {
    datum: 'Datum',
    iznos: 'Cena',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  constructor(
    private preduzeceService: PreduzeceService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  private getCeneZaProizvod() {
    this.preduzeceService.getCeneZaProizvod(this.proizvodId).subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.proizvodId = +this.route.snapshot.paramMap.get('id');
    this.getCeneZaProizvod();

    this.form = new FormGroup({
      datum: new FormControl(null, Validators.required),
      cena: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (this.form.invalid) {
      return;
    }
    this.form.value.datum = this.datepipe.transform(this.form.value.datum, 'yyyy-MM-dd');
    const cenaProizvod = {
      proizvod_id: this.proizvodId,
      ...this.form.value
    }
    this.preduzeceService.postCenaZaProizvod(cenaProizvod).subscribe((res) => {
      this.form.reset();
      this.formDirective.resetForm();
      this.toastService.fireToast('success', 'Cena uspesno dodata!');
      this.getCeneZaProizvod();
    });
  }

  onDelete(datum: string) {
    Swal.fire({
      title: 'Da li zelite da cenu za proizvod?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.preduzeceService.deleteCenaZaProizvod(this.proizvodId, datum).subscribe(() => {
          Swal.fire('Cena obrisana!', '', 'success');
          this.getCeneZaProizvod();
        });
      }
    });
  }

}
