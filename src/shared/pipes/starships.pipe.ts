import { Pipe, PipeTransform } from '@angular/core';
import { DataService, extractIdFromUrl } from '../services/data.service';

@Pipe({
  name: 'starships',
  standalone: true,
})
export class StarShipsPipe implements PipeTransform {
  constructor(private dataService: DataService) {}

  transform(value: string | null | undefined, arg: string): string {
    if (!value || !arg) return 'N/A';
    const id = extractIdFromUrl(value, 'starships');
    if (!id) return 'N/A';

    const ship = this.dataService.starShips.find((i) => i.id == id);

    if (ship) return ship.name ?? 'N/A';

    return 'N/A';
  }
}
