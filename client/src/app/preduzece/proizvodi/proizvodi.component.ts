import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FullProizvod, Proizvod } from '../models/proizvodi.model';
import { PreduzeceService } from '../services/preduzece.service';

@Component({
  selector: 'app-proizvodi',
  templateUrl: './proizvodi.component.html',
  styleUrls: ['./proizvodi.component.scss'],
})
export class ProizvodiComponent implements OnInit {
  displayedColumns = {
    naziv: 'Naziv',
    opis: 'Opis',
    jacina: 'Jacina',
    br_analize: 'Br lab analize',
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
    this.preduzeceService.getProizvodi().subscribe((res: Proizvod[]) => {
      const formatedData = res.map((el: Proizvod) => {
        let novi_p_info = el.p_info?.split(/[(",)]/).filter((elm) => {
          return elm != '';
        });
        return {
          ...el,
          opis: typeof novi_p_info !== 'undefined' ? novi_p_info[0] : null,
          jacina: typeof novi_p_info !== 'undefined' ? novi_p_info[1] : null,
          br_analize: typeof novi_p_info !== 'undefined' ? novi_p_info[2] : null,
        };
      });
      this.dataSource = formatedData;
    });
  }

  ngOnInit(): void {
    this.getProizvodi();
  }

  onDelete(id: number) {
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
