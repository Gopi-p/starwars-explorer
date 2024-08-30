import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { fetchSWPeopleAPI } from '../api/people.api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  people = [];
  films = [];
  species = [];
  vehicles = [];
  starShips = [];

  async getSWPeople() {
    let result = await fetchSWPeopleAPI(this.http);
  }
}
