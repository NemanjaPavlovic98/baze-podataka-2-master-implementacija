import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.scss'],
})
export class ProizvodiComponent implements OnInit {
  displayedColumns = {
    naziv: 'Naziv',
    p_info: 'Opis-Jacina-Br analize',
    naziv_jm: 'Jedinica mere',
    aktuelna_cena: 'Aktuelna cena',
  };
  displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  dataSource = [];

  constructor(private preduzeceService: PreduzeceService) {}

  objectKeys(obj) {
    return Object.keys(obj);
  }

  getProizvodi() {
    this.preduzeceService.getProizvodi().subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    this.getProizvodi();
  }

  onDelete(id: number) {
    console.log(id);
    Swal.fire({
      title: 'Da li zelite da obrisete proizvod?',
      showCancelButton: true,
      confirmButtonText: 'Da',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.preduzeceService.deleteProizvod(id).subscribe(() => {
          Swal.fire('Proizvod obrisan!', '', 'success');
          this.getProizvodi();
        });
      }
    });
  }
}
