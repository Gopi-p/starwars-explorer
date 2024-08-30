import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private dataService: DataService) {}

  async ngOnInit() {
    // await this.dataService.getSWAllData();
    console.log('@@  this.dataService.films: ', this.dataService.films);
    console.log('@@  this.dataService.species: ', this.dataService.species);
    console.log('@@  this.dataService.vehicles: ', this.dataService.vehicles);
    console.log('@@  this.dataService.starShips: ', this.dataService.starShips);
    console.log('@@  this.dataService.people: ', this.dataService.people);
  }
}
