//Core
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
//Shared
import {
  DataService,
  extractYearFromBirthYear,
} from '../../shared/services/data.service';
import { SWPeopleIF } from '../../shared/interfaces/people.interface';
import { SpeciesPipe } from '../../shared/pipes/species.pipe';
import {
  filmTitlesFO,
  speciesNamesFO,
  starshipNamesFO,
  vehicleNamesFO,
} from '../../shared/data/filter.data';

const CORE = [RouterOutlet, CommonModule, FormsModule];
const PRIMENG = [
  ButtonModule,
  TableModule,
  TagModule,
  MultiSelectModule,
  InputTextModule,
  InputGroupModule,
  InputGroupAddonModule,
  CheckboxModule,
  CardModule,
];
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

  filmTitles: SelectItemIF[];
  selectedFilms!: SelectItemIF[];

  speciesNames: SelectItemIF[];
  selectedSpecies!: SelectItemIF[];

  vehicleNames: SelectItemIF[];
  selectedVehicles!: SelectItemIF[];

  starShipNames: SelectItemIF[];
  selectedStarShips!: SelectItemIF[];

  fromYear: number = 5;
  toYear: number = 1000;

  isAllTimeBirthYear: boolean = true;
  isFilterApplied: boolean = false;
  birthRangeError: boolean = false;

  constructor(private dataService: DataService, private router: Router) {
    this.filmTitles = filmTitlesFO;
    this.speciesNames = speciesNamesFO;
    this.vehicleNames = vehicleNamesFO;
    this.starShipNames = starshipNamesFO;
  }

  ngOnInit() {
    this.onChangeFilter();
  }

  getGenderColor(gender: string) {
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

  onChangeBY() {
    this.birthRangeError = this.fromYear > this.toYear;
    this.isFilterApplied = !this.isAllTimeBirthYear;
    let filteredPeople = this.dataService.people;

    if (!this.isAllTimeBirthYear) {
      filteredPeople = filteredPeople.filter((people) => {
        const year = extractYearFromBirthYear(people.birth_year);
        return year >= this.fromYear && year <= this.toYear;
      });
    }

    this.people = filteredPeople;
  }

  onChangeFilter() {
    let filteredPeople: SWPeopleIF[] = this.dataService.people;
    this.isFilterApplied = false;
    if (this.selectedFilms) {
      filteredPeople = filterPeopleByFilms(
        filteredPeople,
        this.selectedFilms.map((film) => film.code)
      );
      this.isFilterApplied = true;
    }
    if (this.selectedSpecies?.length > 0) {
      filteredPeople = filterPeopleBySpecies(
        filteredPeople,
        this.selectedSpecies.map((species) => species.code)
      );
      this.isFilterApplied = true;
    }
    if (this.selectedVehicles) {
      filteredPeople = filterPeopleByVehicles(
        filteredPeople,
        this.selectedVehicles.map((vehicle) => vehicle.code)
      );
      this.isFilterApplied = true;
    }
    if (this.selectedStarShips) {
      filteredPeople = filterPeopleByStarShips(
        filteredPeople,
        this.selectedStarShips.map((ship) => ship.code)
      );
      this.isFilterApplied = true;
    }

    this.people = filteredPeople;
  }

  resetAllFilters() {
    this.isAllTimeBirthYear = true;
    this.selectedFilms = [];
    this.selectedSpecies = [];
    this.selectedVehicles = [];
    this.selectedStarShips = [];
    this.onChangeFilter();
    this.onChangeBY();
  }

  onClickPeople(id: string) {
    this.router.navigate([`/people/${id}`]);
  }
}

function filterPeopleByFilms(
  people: SWPeopleIF[],
  filmIds: string[]
): SWPeopleIF[] {
  return people.filter((people) =>
    filmIds.every((filmId) =>
      people.films?.some((filmUrl) => filmUrl.includes(`/films/${filmId}/`))
    )
  );
}
function filterPeopleBySpecies(
  people: SWPeopleIF[],
  speciesIds: string[]
): SWPeopleIF[] {
  return people.filter((people) =>
    speciesIds.some((speciesId) =>
      people.species?.some((speciesUrl) =>
        speciesUrl.includes(`/species/${speciesId}/`)
      )
    )
  );
}
function filterPeopleByVehicles(
  people: SWPeopleIF[],
  vehicleIds: string[]
): SWPeopleIF[] {
  return people.filter((people) =>
    vehicleIds.every((vehicleId) =>
      people.vehicles?.some((vehicleUrl) =>
        vehicleUrl.includes(`/vehicles/${vehicleId}/`)
      )
    )
  );
}
function filterPeopleByStarShips(
  people: SWPeopleIF[],
  shipIds: string[]
): SWPeopleIF[] {
  return people.filter((people) =>
    shipIds.every((shipId) =>
      people.starships?.some((shipUrl) =>
        shipUrl.includes(`/starships/${shipId}/`)
      )
    )
  );
}

interface SelectItemIF {
  name: string;
  code: string;
}
