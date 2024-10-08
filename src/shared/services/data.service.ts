import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SWPeopleIF } from '../interfaces/people.interface';
import { SWFilmIF } from '../interfaces/film.interface';
import { SWSpeciesIF } from '../interfaces/species.interfaces';
import { SWVehicleIF } from '../interfaces/vehicle.interface';
import { SWStarShipsIF } from '../interfaces/star-ship.interface';
import { fetchHandler } from '../api/sw_handler.api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  films: SWFilmIF[] = [];
  people: SWPeopleIF[] = [];
  species: SWSpeciesIF[] = [];
  vehicles: SWVehicleIF[] = [];
  starShips: SWStarShipsIF[] = [];

  async getSWAllData() {
    try {
      const [people, films, species, vehicles, starShips] = await Promise.all([
        fetchHandler<SWPeopleIF>(this.http, 'people'),
        fetchHandler<SWFilmIF>(this.http, 'films'),
        fetchHandler<SWSpeciesIF>(this.http, 'species'),
        fetchHandler<SWVehicleIF>(this.http, 'vehicles'),
        fetchHandler<SWStarShipsIF>(this.http, 'starships'),
      ]);

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

export function extractYearFromBirthYear(
  str: string | null | undefined
): number {
  if (!str || str === 'unknown') return 0;
  return parseFloat(str.replace(/[^\d.]/g, ''));
}
