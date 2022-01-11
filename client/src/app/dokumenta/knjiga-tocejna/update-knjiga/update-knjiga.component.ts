import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Zaposleni } from 'src/app/preduzece/models/proizvodi.model';
import { PreduzeceService } from 'src/app/preduzece/services/preduzece.service';
import { ToastService } from 'src/app/shared/toast.service';
import { KnjigaTocenja, Ponude } from '../../models/ponuda.model';
import { PonudaService } from '../../services/dokumenta.service';

@Component({
  selector: 'app-update-knjiga',
  templateUrl: './update-knjiga.component.html',
  styleUrls: ['./update-knjiga.component.scss']
})
export class UpdateKnjigaComponent implements OnInit {

  form: FormGroup;
  oznaka_knjige: number;
  knjiga_tocenja: any;
  zaposleni: Zaposleni[];
  ponude: Ponude[];

  constructor(
    private ponudaService: PonudaService,
    private preduzeceService: PreduzeceService,
    private router: Router,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) 
  {}

  ngOnInit(): void {
    this.oznaka_knjige = +this.route.snapshot.paramMap.get('id');

    forkJoin({
      obs1: this.preduzeceService.getZaposleni(),
      obs2: this.ponudaService.getPonude()
    }).subscribe(res => {
      this.zaposleni = res.obs1;
      this.ponude = res.obs2
    });

    this.ponudaService.getKnjigeTocenjaSingle(this.oznaka_knjige).subscribe(res => {
      this.knjiga_tocenja = res;

      this.form = new FormGroup({
        izdanje: new FormControl(this.knjiga_tocenja[0].izdanje),
        datum: new FormControl(this.knjiga_tocenja[0].datum),
        nalog_izdao: new FormControl(this.knjiga_tocenja[0].nalog_izdao),
        nalog_primio: new FormControl(this.knjiga_tocenja[0].nalog_primio),
        ponuda: new FormControl(this.knjiga_tocenja[0].ponuda_id),
      });

    })
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }

    this.form.value.datum = this.datepipe.transform(this.form.value.datum, 'yyyy-MM-dd');
    this.ponudaService.updateKnjigaTocenja(this.oznaka_knjige, this.form.value).subscribe(res => {
      this.toastService.fireToast('success', 'Rekord knjige tocenja azuriran!');
      this.router.navigate(['../../'], { relativeTo: this.route });
    })
  }

}
