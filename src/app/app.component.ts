//Core
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import { SkeletonModule } from 'primeng/skeleton';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SkeletonModule],
  template: `
    @if(isDataLoading){
    <p-skeleton height="105px" styleClass="mb-5" />
    <div class="grid px-5 m-0">
      <div class="col-4"><p-skeleton height="70vh" styleClass="mb-5" /></div>
      <div class="col-8"><p-skeleton height="70vh" styleClass="mb-5" /></div>
    </div>
    }@else {
    <router-outlet></router-outlet>

    }
  `,
})
export class AppComponent implements OnInit {
  isDataLoading: boolean = true;
  constructor(private dataService: DataService) {}
  async ngOnInit() {
    await this.dataService.getSWAllData();
    this.isDataLoading = false;
  }
}
