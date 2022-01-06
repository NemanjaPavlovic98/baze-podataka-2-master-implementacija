import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DokumentaComponent } from './dokumenta/dokumenta.component';
import { PonudaComponent } from './dokumenta/ponuda/ponuda.component';
import { RacunComponent } from './dokumenta/racun/racun.component';
import { MestaComponent } from './porudzbine/mesta/mesta.component';
import { JedinicaMereComponent } from './preduzece/jedinica-mere/jedinica-mere.component';
import { FormaProizvodaComponent } from './preduzece/proizvodi/forma/forma.component';
import { ProizvodiComponent } from './preduzece/proizvodi/proizvodi.component';
import { ZaposleniComponent } from './preduzece/zaposleni/zaposleni.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'dokumenta',
    children: [
      { path: '', component: DokumentaComponent },
      { path: 'racun', component: RacunComponent },
      { path: 'ponuda', component: PonudaComponent },
    ],
  },
  {
    path: 'preduzece',
    children: [
      { path: '', component: DokumentaComponent },
      { path: 'proizvodi', children: [
        {path: '', component: ProizvodiComponent},
        {path: 'novi', component: FormaProizvodaComponent},
      ] },
      { path: 'jedinice-mere', component: JedinicaMereComponent },
      { path: 'zaposleni', children: [
        {path: '', component: ZaposleniComponent}
      ]}
    ],
  },
  {
    path: 'porudzbine',
    children: [
      { path: '', component: MestaComponent },
      { path: 'mesta', children: [
        {path: '', component: MestaComponent},
        {path: 'novi', component: FormaProizvodaComponent},
      ] },
      { path: 'zaposleni', children: [
        {path: '', component: ZaposleniComponent}
      ]}
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
