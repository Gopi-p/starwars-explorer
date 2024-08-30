//Core
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkActive } from '@angular/router';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { DataService } from '../../shared/services/data.service';

const CORE = [RouterOutlet, RouterLinkActive];
const PRIMENG = [ButtonModule];
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [...CORE, ...PRIMENG],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  constructor(private dataService: DataService) {}

  async ngOnInit() {}
}
