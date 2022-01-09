import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proizvod } from 'src/app/preduzece/models/proizvodi.model';
import { PreduzeceService } from 'src/app/preduzece/services/preduzece.service';
import { ToastService } from 'src/app/shared/toast.service';
import { Otpremnica } from '../../models/ponuda.model';
import { PonudaService } from '../../services/dokumenta.service';

@Component({
  selector: 'app-forma-racun',
  templateUrl: './forma-racun.component.html',
  styleUrls: ['./forma-racun.component.scss'],
})
export class FormaRacunComponent implements OnInit {
  form: FormGroup;
  otpremnice: Otpremnica[];
  proizvodi: Proizvod[];
  stavke_racuna = [];
  displayedColumns = {
    proizvod_naziv: 'Proizvod',
    kolicina: 'Kolicina',
    iznos: 'Iznos',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  objectKeys(obj) {
    return Object.keys(obj);
  }

  constructor(
    private ponudaService: PonudaService,
    private preduzeceService: PreduzeceService,
    private router: Router,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      mesto_izdavanja: new FormControl(null),
      datum: new FormControl(null),
      poziv_na_broj: new FormControl(null),
      otpremnica: new FormControl(null),
      proizvod: new FormControl(null),
      kolicina: new FormControl(null),
      iznos: new FormControl(null),
      // stavke_racuna: this.fb.array([this.createItem()]),
    });

    this.ponudaService.getOtpremnice().subscribe((res) => {
      this.otpremnice = res;
    });
    this.preduzeceService.getProizvodi().subscribe((res) => {
      this.proizvodi = res;
    });
  }

  // createItem() {
  //   return this.fb.group({
  //     kolicina: null,
  //     iznos: null,
  //   });
  // }

  addStavka() {
    if (
      this.form.value.proizvod ||
      this.form.value.kolicina ||
      this.form.value.iznos
    ) {
      const proizvod_naziv = this.proizvodi.find(
        (res) => res.proizvod_id == this.form.value.proizvod
      );
      this.stavke_racuna.push({
        proizvod_id: proizvod_naziv?.proizvod_id,
        proizvod_naziv: proizvod_naziv?.naziv,
        kolicina: this.form.value?.kolicina,
        iznos: this.form.value?.iznos,
      });
      this.form.controls['proizvod'].reset();
      this.form.controls['kolicina'].reset();
      this.form.controls['iznos'].reset();
      this.dataSource = [...this.stavke_racuna];
    } else {
      return;
    }
  }

  // addNext() {
  //   (this.form.controls['stavke_racuna'] as FormArray).push(this.createItem());
  // }

  // removeNext(index) {
  //   (this.form.controls['stavke_racuna'] as FormArray).removeAt(index);
  // }

  onDelete(id: number) {
    this.stavke_racuna = this.stavke_racuna.filter((pr) => {
      return pr.proizvod_id !== id;
    });
    this.dataSource = [...this.stavke_racuna];
  }

  onSignup() {
    // if (this.form.invalid) {
    //   return;
    // }
    this.form.value.datum = this.datepipe.transform(
      this.form.value.datum,
      'yyyy-MM-dd'
    );
    const finalData = {
      mesto_izdavanja: this.form.value.mesto_izdavanja,
      datum: this.form.value.datum,
      poziv_na_broj: this.form.value.poziv_na_broj,
      otpremnica_id: this.form.value.otpremnica,
      stavke_racuna: [...this.stavke_racuna],
    };
    console.log(finalData);
    this.ponudaService.postRacun(finalData).subscribe((res) => {
      console.log(res);
      this.toastService.fireToast('success', 'Uspesno unet racun sa stavkama');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
