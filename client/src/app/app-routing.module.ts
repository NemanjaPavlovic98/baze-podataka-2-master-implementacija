import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DokumentaComponent } from './dokumenta/dokumenta.component';
import { FormaKnjigeTocenjaComponent } from './dokumenta/knjiga-tocejna/forma/forma.component';
import { KnjigaTocejnaComponent } from './dokumenta/knjiga-tocejna/knjiga-tocejna.component';
import { PonudaComponent } from './dokumenta/ponuda/ponuda.component';
import { RacunComponent } from './dokumenta/racun/racun.component';
import { KlijentiComponent } from './porudzbine/klijenti/klijenti.component';
import { MestaComponent } from './porudzbine/mesta/mesta.component';
import { JedinicaMereComponent } from './preduzece/jedinica-mere/jedinica-mere.component';
import { CeneComponent } from './preduzece/proizvodi/cene/cene.component';
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
      { path: 'knjiga-tocenja', children: [
        {path: '', component: KnjigaTocejnaComponent},
        {path: 'nova-knjiga-tocenja', component: FormaKnjigeTocenjaComponent}
      ] },
    ],
  },
  {
    path: 'preduzece',
    children: [
      { path: '', component: DokumentaComponent },
      { path: 'proizvodi', children: [
        {path: '', component: ProizvodiComponent},
        {path: 'novi', component: FormaProizvodaComponent},
        {path: 'cene/:id', component: CeneComponent},
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
      { path: 'klijenti', children: [
        {path: '', component: KlijentiComponent}
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
