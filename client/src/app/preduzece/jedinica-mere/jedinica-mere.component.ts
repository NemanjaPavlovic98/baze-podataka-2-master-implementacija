import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { JedinicaMere } from '../models/proizvodi.model';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-jedinica-mere',
  templateUrl: './jedinica-mere.component.html',
  styleUrls: ['./jedinica-mere.component.scss']
})
export class JedinicaMereComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  
  form: FormGroup;
  error: string;

  displayedColumns = {
    naziv: 'Naziv',
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

  private getJedinica() {
    this.preduzeceService.getJediniceMere()
    .pipe(
      map((response:JedinicaMere[]) => {
        return response.map(arr =>{
           return {sifra_jm: arr.sifra_jm, naziv: arr.naziv_jm}
        })
      })
    )
    .subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getJedinica();

    this.form = new FormGroup({
      naziv: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (this.form.invalid) {
      return;
    }
    this.preduzeceService.postJediniceMere(this.form.value).subscribe((res) => {
      this.form.reset();
      this.formDirective.resetForm();
      this.toastService.fireToast('success', 'Jedinica mere uspesno dodata!');
      this.getJedinica();
    });
  }

  onDelete(id: number){
    console.log(id)
    Swal.fire({
      title: 'Da li zelite da obrisete jedinicu mere?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.preduzeceService.deleteJediniceMere(id).subscribe( () => {
          Swal.fire('Jedinica mere obrisana!', '', 'success')
          this.getJedinica();
        })
      }
    })
  }

}
