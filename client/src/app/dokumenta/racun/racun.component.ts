import { Component, OnInit } from '@angular/core';
import {
  ActionType,
  EmitAction,
  TableActions,
} from 'src/app/shared/table/table.model';
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
    ukupan_iznos: 'Ukupan iznos',
  };
  dataSource = [];
  actions: TableActions[] = [
    {
      name: 'pregled stavki',
      icon: 'attach_file',
      route: '/dokumenta/racun/stavke-racuna',
      param: ['broj_racuna'],
    },
    {
      name: 'edit',
      icon: 'edit',
      route: '/dokumenta/racun/azurira-racun',
      param: ['broj_racuna'],
    },
    {
      name: 'delete',
      icon: 'delete',
      emit: true,
      param: ['broj_racuna', 'mesto_izdavanja'],
      type: 'delete',
    },
  ];

  constructor(private ponudaService: PonudaService) {}

  getRacuni() {
    this.ponudaService.getRacuni().subscribe((res) => {
      this.dataSource = res;
    });
  }
  ngOnInit(): void {
    this.getRacuni();
  }

  onClickAction(data) {
    if (data.action_type === ActionType.DELETE) {
      this.onDelete(data.data_id)
    }
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
