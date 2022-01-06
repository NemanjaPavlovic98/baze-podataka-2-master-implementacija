import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JedinicaMere } from '../../models/proizvodi.model';
import { PreduzeceService } from '../../services/preduzece.service';

export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-forma-proizvod',
  templateUrl: './forma.component.html',
  styleUrls: ['./forma.component.scss'],
})
export class FormaProizvodaComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  error: string;

  jedinice_mere: JedinicaMere[] = [];

  constructor(
    private preduzeceService: PreduzeceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      naziv: new FormControl(null, Validators.required),
      opis: new FormControl(null, Validators.required),
      jacina: new FormControl(null, Validators.required),
      lab: new FormControl(null, Validators.required),
      jedinica: new FormControl('', Validators.required),
    });

    this.preduzeceService.getJediniceMere().subscribe((res) => {
      this.jedinice_mere = res;
    });
  }

  onSignup() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.preduzeceService.postProizvodi(this.form.value).subscribe((res) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
