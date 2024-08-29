//Core
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkActive } from '@angular/router';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { fetchSWPeopleAPI } from '../../shared/api/people.api';

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
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    await fetchSWPeopleAPI(this.http);
  }
}
