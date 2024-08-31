import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SWPeopleIF } from '../interfaces/people.interface';
import { SWFilmIF } from '../interfaces/film.interface';
import { SWSpeciesIF } from '../interfaces/species.interfaces';
import { SWVehicleIF } from '../interfaces/vehicle.interface';
import { SWStarShipsIF } from '../interfaces/star-ship.interface';
import { fetchHandler } from '../api/sw_handler.api';
import {
  FILMS,
  PEOPLE,
  SPECIES,
  STARSHIPS,
  VEHICLES,
} from '../data/sample.data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  films: SWFilmIF[] = FILMS;
  people: SWPeopleIF[] = PEOPLE;
  species: SWSpeciesIF[] = SPECIES;
  vehicles: SWVehicleIF[] = VEHICLES;
  starShips: SWStarShipsIF[] = STARSHIPS;

  async getSWAllData() {
    try {
      const [people, films, species, vehicles, starShips] = await Promise.all([
        fetchHandler<SWPeopleIF>(this.http, 'people'),
        fetchHandler<SWFilmIF>(this.http, 'films'),
        fetchHandler<SWSpeciesIF>(this.http, 'species'),
        fetchHandler<SWVehicleIF>(this.http, 'vehicles'),
        fetchHandler<SWStarShipsIF>(this.http, 'starships'),
      ]);
      // console.log('@@  films: ', films);
      // console.log('@@  starShips: ', starShips);
      // console.log('@@  vehicles: ', vehicles);
      // console.log('@@  species: ', species);
      // console.log('@@  people: ', people);

      this.people = people;
      this.films = films;
      this.species = species;
      this.vehicles = vehicles;
      this.starShips = starShips;
    } catch (error) {
      console.error('Error fetching SW data:', error);
    }
  }
}

export function extractIdFromUrl(
  url: string | undefined | null,
  route: string
) {
  if (!url) return null;
  const regex = new RegExp(`/${route}/(\\d+)/`);
  const match = url.match(regex);
  return match ? match[1] : null;
}
