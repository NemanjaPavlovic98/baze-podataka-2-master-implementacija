import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import { JedinicaMere } from '../../models/proizvodi.model';
import { PreduzeceService } from '../../services/preduzece.service';

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
    private route: ActivatedRoute,
    private toastService: ToastService
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
    this.preduzeceService.postProizvodi(this.form.value).subscribe((res) => {
      this.toastService.fireToast('success', 'Proizvod dodat!');
      this.router.navigate(['../'], { relativeTo: this.route });
    });
  }
}
