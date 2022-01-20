import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { FullProizvod, JedinicaMere } from '../../models/proizvodi.model';
import { PreduzeceService } from '../../services/preduzece.service';

@Component({
  selector: 'app-edit-proizvod',
  templateUrl: './edit-proizvod.component.html',
  styleUrls: ['./edit-proizvod.component.scss'],
})
export class EditProizvodComponent implements OnInit {
  form: FormGroup;
  proizvod_id: number;
  proizvod: FullProizvod;
  jedinice_mere: JedinicaMere[] = [];

  constructor(
    private preduzeceService: PreduzeceService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.proizvod_id = +this.route.snapshot.paramMap.get('id');

    this.preduzeceService.getProizvod(this.proizvod_id).subscribe((res) => {
      let novi_p_info = res[0].p_info?.split(/[(",)]/).filter((elm) => {
        return elm != '';
      });
      const formattedProizvod = {
        ...res[0],
        opis: typeof novi_p_info !== 'undefined' ? novi_p_info[0] : null,
        jacina: typeof novi_p_info !== 'undefined' ? novi_p_info[1] : null,
        br_analize: typeof novi_p_info !== 'undefined' ? novi_p_info[2] : null,
      };

      this.proizvod = formattedProizvod;

      this.form = new FormGroup({
        naziv: new FormControl(this.proizvod.naziv),
        opis: new FormControl(this.proizvod.opis),
        jacina: new FormControl(this.proizvod.jacina),
        lab: new FormControl(this.proizvod.br_analize),
        jedinica: new FormControl(this.proizvod.sifra_jm),
        jedinica_naziv: new FormControl(this.proizvod.naziv_jm),
      });
    });

    this.preduzeceService.getJediniceMere().subscribe((res) => {
      this.jedinice_mere = res;
    });
  }

  onSignup() {
    for (const key in this.form.value) {
      if (this.form.value[key] === '') {
        this.form.value[key] = null;
      }
    }
    this.preduzeceService
      .updateProizvod(this.proizvod_id, this.form.value)
      .subscribe((res) => {
        this.toastService.fireToast('success', 'Proizvod azuriran!');
        this.router.navigate(['../../'], { relativeTo: this.route });
      });
  }
}
