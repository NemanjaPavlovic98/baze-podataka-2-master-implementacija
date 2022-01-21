import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JedinicaMereComponent } from './jedinica-mere/jedinica-mere.component';
import { CeneComponent } from './proizvodi/cene/cene.component';
import { EditProizvodComponent } from './proizvodi/edit-proizvod/edit-proizvod.component';
import { FormaProizvodaComponent } from './proizvodi/forma/forma.component';
import { ProizvodiComponent } from './proizvodi/proizvodi.component';
import { ZaposleniComponent } from './zaposleni/zaposleni.component';

const routes: Routes = [
  {
    path: 'preduzece',
    children: [
      {
        path: 'proizvodi',
        children: [
          { path: '', component: ProizvodiComponent },
          { path: 'novi', component: FormaProizvodaComponent },
          { path: 'edit/:id', component: EditProizvodComponent },
          { path: 'cene/:id', component: CeneComponent },
        ],
      },
      { path: 'jedinice-mere', component: JedinicaMereComponent },
      {
        path: 'zaposleni',
        children: [{ path: '', component: ZaposleniComponent }],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreduzeceRoutingModule {}
