import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast.service';
import { PorudzbineService } from '../services/porudzbine.service';


@Component({
  selector: 'app-mesta',
  templateUrl: './mesta.component.html',
  styleUrls: ['./mesta.component.scss']
})
export class MestaComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm;
  
  form: FormGroup;
  error: string;

  displayedColumns = {
    postanski_broj: 'Postanski broj',
    naziv_mesta: 'Naziv mesta',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  constructor(
    private porudzbineService: PorudzbineService,
    private toastService: ToastService
  ) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  private getMesta() {
    this.porudzbineService.getMesta().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getMesta();

    this.form = new FormGroup({
      postanski_broj: new FormControl(null, Validators.required),
      naziv_mesta: new FormControl(null, Validators.required),
    });
  }

  onAddNew() {
    if (this.form.invalid) {
      return;
    }
    this.porudzbineService.postMesto(this.form.value).subscribe((res) => {
      this.form.reset();
      this.formDirective.resetForm();
      this.toastService.fireToast('success', 'Mesto uspesno dodato!');
      this.getMesta();
    });
  }

}
