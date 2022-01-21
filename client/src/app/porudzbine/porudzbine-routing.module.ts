import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KlijentiComponent } from './klijenti/klijenti.component';
import { MestaComponent } from './mesta/mesta.component';
import { UliceComponent } from './ulice/ulice.component';

const routes: Routes = [
    {
        path: 'porudzbine',
        children: [
          { path: '', component: MestaComponent },
          {
            path: 'mesta',
            children: [{ path: '', component: MestaComponent }],
          },
          {
            path: 'ulice',
            children: [{ path: '', component: UliceComponent }],
          },
          {
            path: 'klijenti',
            children: [{ path: '', component: KlijentiComponent }],
          },
        ],
      },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class PorudzbineRoutingModule {}
  
