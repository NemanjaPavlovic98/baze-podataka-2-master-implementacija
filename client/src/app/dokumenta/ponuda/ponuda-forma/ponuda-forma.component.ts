import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Kupac } from 'src/app/porudzbine/models/porudzbine.model';
import { PorudzbineService } from 'src/app/porudzbine/services/porudzbine.service';
import { ToastService } from 'src/app/shared/toast.service';
import { PonudaService } from '../../services/dokumenta.service';

@Component({
  selector: 'app-ponuda-forma',
  templateUrl: './ponuda-forma.component.html',
  styleUrls: ['./ponuda-forma.component.scss'],
})
export class PonudaFormaComponent implements OnInit {
  form: FormGroup;
  kupci: Kupac[];
  ponuda_id: number;
  edit_mode = false;
  // ponude: Ponude[];

  constructor(
    private ponudaService: PonudaService,
    private router: Router,
    private porudzbineService: PorudzbineService,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      datum: new FormControl(null),
      opis: new FormControl(null),
      klijent: new FormControl(null),
    });

    this.ponuda_id = +this.route.snapshot.paramMap.get('id');
    if(this.ponuda_id){
      this.ponudaService.getPonuda(this.ponuda_id).subscribe(res => {
        this.edit_mode = true;
        
        this.form.patchValue({
          datum: res[0].datum,
          opis: res[0].opis,
          klijent: res[0].kupac_id,
        });
      })
    }

    this.porudzbineService.getKupci().subscribe((res) => {
      this.kupci = res;
    });
  }

  onSignup() {
    if (!this.edit_mode) {
      this.form.value.datum = this.datepipe.transform(
        this.form.value.datum,
        'yyyy-MM-dd'
      );
      this.ponudaService.postPonuda(this.form.value).subscribe((res) => {
        this.toastService.fireToast('success', 'Ponuda uspesno dodata!');
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
    else{
      for (const key in this.form.value) {
        if (this.form.value[key] === '') {
          this.form.value[key] = null;
        }
      }
      this.form.value.datum = this.datepipe.transform(
        this.form.value.datum,
        'yyyy-MM-dd'
      );
      this.ponudaService.updatePonuda(this.ponuda_id, this.form.value)
        .subscribe(() => {
          this.form.reset();
          this.toastService.fireToast('success', 'Ponuda uspesno azurirana!');
          this.edit_mode = false;
          this.router.navigate(['../../'], { relativeTo: this.route });
        });
    }
 
  }
}
