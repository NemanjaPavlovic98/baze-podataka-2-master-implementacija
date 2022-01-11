import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DokumentaComponent } from './dokumenta/dokumenta.component';
import { FormaKnjigeTocenjaComponent } from './dokumenta/knjiga-tocejna/forma/forma.component';
import { KnjigaTocejnaComponent } from './dokumenta/knjiga-tocejna/knjiga-tocejna.component';
import { UpdateKnjigaComponent } from './dokumenta/knjiga-tocejna/update-knjiga/update-knjiga.component';
import { OtpremnicaComponent } from './dokumenta/otpremnica/otpremnica.component';
import { PonudaFormaComponent } from './dokumenta/ponuda/ponuda-forma/ponuda-forma.component';
import { PonudaComponent } from './dokumenta/ponuda/ponuda.component';
import { FormaRacunComponent } from './dokumenta/racun/forma-racun/forma-racun.component';
import { RacunComponent } from './dokumenta/racun/racun.component';
import { StavkeRacunaComponent } from './dokumenta/racun/stavke-racuna/stavke-racuna.component';
import { KlijentiComponent } from './porudzbine/klijenti/klijenti.component';
import { MestaComponent } from './porudzbine/mesta/mesta.component';
import { JedinicaMereComponent } from './preduzece/jedinica-mere/jedinica-mere.component';
import { CeneComponent } from './preduzece/proizvodi/cene/cene.component';
import { EditProizvodComponent } from './preduzece/proizvodi/edit-proizvod/edit-proizvod.component';
import { FormaProizvodaComponent } from './preduzece/proizvodi/forma/forma.component';
import { ProizvodiComponent } from './preduzece/proizvodi/proizvodi.component';
import { ZaposleniComponent } from './preduzece/zaposleni/zaposleni.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'dokumenta',
    children: [
      { path: '', component: DokumentaComponent },
      {
        path: 'racun',
        children: [
          { path: '', component: RacunComponent },
          { path: 'novi', component: FormaRacunComponent },
          {
            path: 'stavke-racuna/:broj_racuna',
            component: StavkeRacunaComponent,
          },
        ],
      },
      { path: 'otpremnica', component: OtpremnicaComponent },
      {
        path: 'ponuda',
        children: [
          { path: '', component: PonudaComponent },
          { path: 'nova-ponuda', component: PonudaFormaComponent },
        ],
      },
      {
        path: 'knjiga-tocenja',
        children: [
          { path: '', component: KnjigaTocejnaComponent },
          {
            path: 'nova-knjiga-tocenja',
            component: FormaKnjigeTocenjaComponent,
          },
          {
            path: 'update-knjiga/:id',
            component: UpdateKnjigaComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'preduzece',
    children: [
      { path: '', component: DokumentaComponent },
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
  {
    path: 'porudzbine',
    children: [
      { path: '', component: MestaComponent },
      {
        path: 'mesta',
        children: [
          { path: '', component: MestaComponent },
          { path: 'novi', component: FormaProizvodaComponent },
        ],
      },
      {
        path: 'klijenti',
        children: [{ path: '', component: KlijentiComponent }],
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
