import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormaKnjigeTocenjaComponent } from './knjiga-tocejna/forma/forma.component';
import { KnjigaTocejnaComponent } from './knjiga-tocejna/knjiga-tocejna.component';
import { UpdateKnjigaComponent } from './knjiga-tocejna/update-knjiga/update-knjiga.component';
import { OtpremnicaComponent } from './otpremnica/otpremnica.component';
import { PonudaFormaComponent } from './ponuda/ponuda-forma/ponuda-forma.component';
import { PonudaComponent } from './ponuda/ponuda.component';
import { FormaRacunComponent } from './racun/forma-racun/forma-racun.component';
import { RacunComponent } from './racun/racun.component';
import { StavkeRacunaComponent } from './racun/stavke-racuna/stavke-racuna.component';

const routes: Routes = [
  {
    path: 'dokumenta',
    children: [
      {
        path: 'racun',
        children: [
          { path: '', component: RacunComponent },
          { path: 'novi', component: FormaRacunComponent },
          { path: 'azurira-racun/:id', component: FormaRacunComponent },
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
          { path: 'edit-ponuda/:id', component: PonudaFormaComponent },
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
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class DokumentaRoutingModule {}
  
