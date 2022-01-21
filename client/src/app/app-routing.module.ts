import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KlijentiComponent } from './porudzbine/klijenti/klijenti.component';
import { MestaComponent } from './porudzbine/mesta/mesta.component';
import { UliceComponent } from './porudzbine/ulice/ulice.component';
import { JedinicaMereComponent } from './preduzece/jedinica-mere/jedinica-mere.component';
import { CeneComponent } from './preduzece/proizvodi/cene/cene.component';
import { EditProizvodComponent } from './preduzece/proizvodi/edit-proizvod/edit-proizvod.component';
import { FormaProizvodaComponent } from './preduzece/proizvodi/forma/forma.component';
import { ProizvodiComponent } from './preduzece/proizvodi/proizvodi.component';
import { ZaposleniComponent } from './preduzece/zaposleni/zaposleni.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
