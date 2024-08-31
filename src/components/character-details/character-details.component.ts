//Core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

//Shared
import { DataService } from '../../shared/services/data.service';
import { SWPeopleIF } from '../../shared/interfaces/people.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { SpeciesPipe } from '../../shared/pipes/species.pipe';
import { FilmsPipe } from '../../shared/pipes/films.pipe';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { StarShipsPipe } from '../../shared/pipes/starships.pipe';
import { VehiclesPipe } from '../../shared/pipes/vehicles.pipe';

const PRIMENG = [ButtonModule, DividerModule];
const CORE = [RouterLink, CommonModule, DatePipe];
const SHARED = [SpeciesPipe, FilmsPipe, StarShipsPipe, VehiclesPipe];
@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [...CORE, ...PRIMENG, ...SHARED],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
})
export class CharacterDetailsComponent implements OnInit {
  id: string = '';
  peopleDetails: SWPeopleIF | undefined;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let paramId = this.activatedRoute.snapshot.params['id'];
    if (paramId) {
      this.id = paramId;
      this.getPeopleDetails();
    }
  }

  getPeopleDetails() {
    this.peopleDetails = this.dataService.people.find((i) => i.id == this.id);
  }
}
