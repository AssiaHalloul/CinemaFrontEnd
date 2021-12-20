import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormsComponent } from './forms.component';
import { TablesComponent } from './tables.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Type Evenement'
    },
    children: [
      {
        path: '',
        redirectTo: 'tables'
      },

      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Ajout'
        }
      },
      {
        path: 'tables',
        component: TablesComponent,
        data: {
          title: 'Liste'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule {}
