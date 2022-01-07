import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Zaposleni } from 'src/app/preduzece/models/proizvodi.model';
import { PreduzeceService } from 'src/app/preduzece/services/preduzece.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Ponude } from '../../models/ponuda.model';
import { PonudaService } from '../../services/dokumenta.service';

@Component({
  selector: 'app-forma',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.scss'],
})
export class FormaKnjigeTocenjaComponent implements OnInit {
  form: FormGroup;
  error: string;
  zaposleni: Zaposleni[];
  ponude: Ponude[];

  constructor(
    private ponudaService: PonudaService,
    private router: Router,
    private preduzeceService: PreduzeceService,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) 
  {}

  ngOnInit(): void {
    this.form = new FormGroup({
      oznaka: new FormControl(null),
      izdanje: new FormControl(null),
      datum: new FormControl(null),
      nalog_izdao: new FormControl(null),
      nalog_primio: new FormControl(null),
      ponuda: new FormControl(null),
    });

    forkJoin({
      obs1: this.preduzeceService.getZaposleni(),
      obs2: this.ponudaService.getPonude()
    }).subscribe(res => {
      this.zaposleni = res.obs1;
      this.ponude = res.obs2
    });
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }

    this.form.value.datum = this.datepipe.transform(this.form.value.datum, 'yyyy-MM-dd');
    console.log(this.form.value)
    this.ponudaService.postKnjigaTocenja(this.form.value).subscribe(res => {
      this.toastService.fireToast('success', 'Rekord knjige tocenja zabelezen!');
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }
}
