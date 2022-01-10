import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/shared/toast.service';
import Swal from 'sweetalert2';
import { PonudaService } from '../../services/dokumenta.service';

@Component({
  selector: 'app-stavke-racuna',
  templateUrl: './stavke-racuna.component.html',
  styleUrls: ['./stavke-racuna.component.scss']
})
export class StavkeRacunaComponent implements OnInit {

  racunId: number;

  displayedColumns = {
    broj_racuna: 'Redni broj racuna',
    sifra_stavke: 'Sifra stavke',
    kolicina: 'Kolicina',
    iznos: 'Iznos',
    proizvod_id: 'Proizvod ID',
    naziv: 'Naziv proizvoda',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  constructor(
    private dokumentaService: PonudaService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  private getStavkeRacuna() {
    this.dokumentaService.getStavkeRacuna(this.racunId).subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.racunId = +this.route.snapshot.paramMap.get('broj_racuna');
    this.getStavkeRacuna();
  }

  onDelete(sifra_stavke: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete stavku za racun?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.dokumentaService.deleteStavkaRacuna(this.racunId, sifra_stavke).subscribe(() => {
          Swal.fire('Stavka je obrisana!', '', 'success');
          this.getStavkeRacuna();
        });
      }
    });
  }

}
