//Core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Shared
import { DataService } from '../../shared/services/data.service';
import { SWPeopleIF } from '../../shared/interfaces/people.interface';
@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [],
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
