import { Routes } from '@angular/router';
import { LayoutComponent } from '../components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'people',
        loadComponent: () =>
          import('./../components/characters/characters.component').then(
            (c) => c.CharactersComponent
          ),
      },
      {
        path: 'people/:id',
        loadComponent: () =>
          import(
            './../components/character-details/character-details.component'
          ).then((c) => c.CharacterDetailsComponent),
      },
      { path: '', redirectTo: 'people', pathMatch: 'full' },
    ],
  },
];
