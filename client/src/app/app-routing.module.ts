import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DokumentaComponent } from './dokumenta/dokumenta.component';
import { PonudaComponent } from './dokumenta/ponuda/ponuda.component';
import { RacunComponent } from './dokumenta/racun/racun.component';
import { ProizvodiComponent } from './preduzece/proizvodi/proizvodi.component';

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
      { path: 'proizvodi', component: ProizvodiComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
