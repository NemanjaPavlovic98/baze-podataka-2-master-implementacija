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

    this.porudzbineService.getKupci().subscribe((res) => {
      this.kupci = res;
    });
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }

    this.form.value.datum = this.datepipe.transform(
      this.form.value.datum,
      'yyyy-MM-dd'
    );
    this.ponudaService.postPonuda(this.form.value).subscribe((res) => {
      this.toastService.fireToast('success', 'Ponuda uspesno dodata!');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
