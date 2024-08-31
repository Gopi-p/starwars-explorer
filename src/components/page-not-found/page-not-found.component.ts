//Core
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

//PrimeNG
import { ButtonModule } from 'primeng/button';

const PRIMENG = [ButtonModule];
const CORE = [RouterLink];
@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [...CORE, ...PRIMENG],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {}
