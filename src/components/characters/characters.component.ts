//Core
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';

//Shared
import { DataService } from '../../shared/services/data.service';
import { SWPeopleIF } from '../../shared/interfaces/people.interface';
import { SpeciesPipe } from '../../shared/pipes/species.pipe';

const CORE = [RouterOutlet, RouterLinkActive, CommonModule, FormsModule];
const PRIMENG = [ButtonModule, TableModule, TagModule, MultiSelectModule];
const SHARED = [SpeciesPipe];
@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [...CORE, ...PRIMENG, ...SHARED],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.scss',
})
export class CharactersComponent implements OnInit {
  people: SWPeopleIF[] = [];

  filmTitles: { name: string; code: string }[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ];

  selectedFilms: { name: string; code: string }[] = [];

  constructor(private dataService: DataService, private router: Router) {}

  async ngOnInit() {
    this.people = this.dataService.people;
  }

  getGender(gender: string) {
    switch (gender) {
      case 'male':
        return 'success';
      case 'female':
        return 'warning';
      case 'hermaphrodite':
        return 'danger';
      default:
        return 'success';
    }
  }

  onFilmSelection() {}

  onClickPeople(id: string) {
    this.router.navigate([`/people/${id}`]);
  }
}
