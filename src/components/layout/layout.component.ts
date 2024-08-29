//Core
import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkActive } from '@angular/router';

//PrimeNG
import { ButtonModule } from 'primeng/button';

const CORE = [RouterOutlet, RouterLinkActive];
const PRIMENG = [ButtonModule];
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [...CORE, ...PRIMENG],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {}
