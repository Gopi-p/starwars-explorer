import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';

@Pipe({
  name: 'species',
  standalone: true,
})
export class SpeciesPipe implements PipeTransform {
  constructor(private dataService: DataService) {}

  transform(value: string | null | undefined, arg: string): string {
    if (!value || !arg) return 'Unknown';
    const regex = new RegExp(`/species/(\\d+)/`);
    const match = value.match(regex);
    const id = match ? match[1] : null;

    if (!id) return 'Unknown';

    const species = this.dataService.species.find((i) => i.id == id);

    if (species) return species.name ?? 'Unknown';

    return 'Unknown';
  }
}
