import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PonudaService } from '../services/dokumenta.service';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.scss'],
})
export class RacunComponent implements OnInit {
  displayedColumns = {
    broj_racuna: 'Broj racuna',
    mesto_izdavanja: 'Mesto izdavanja',
    datum: 'Datum izdavanja',
    poziv_na_broj: 'Poziv na broj',
    broj_otpremnice: 'Broj otpremnice',
    oznaka: 'Oznaka otpremnice',
    tekuci_racun: 'Za racun',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  constructor(private ponudaService: PonudaService) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }
  getRacuni() {
    this.ponudaService.getRacuni().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getRacuni();
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Da li zelite da obrisete racun?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ponudaService.deleteRacun(id).subscribe(() => {
          Swal.fire('Racun je obrisan!', '', 'success');
          this.getRacuni();
        });
      }
    });
  }
}
