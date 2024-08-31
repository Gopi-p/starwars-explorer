import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ActivatedRoute } from '@angular/router';
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

  async ngOnInit() {
    let paramId = this.activatedRoute.snapshot.params['id'];
    if (paramId) {
      this.id = paramId;
      await this.getPeopleDetails();
    }
  }

  async getPeopleDetails() {
    this.peopleDetails = this.dataService.people.find((i) => i.id == this.id);
  }
}
