import { Pipe, PipeTransform } from '@angular/core';
import { DataService, extractIdFromUrl } from '../services/data.service';

@Pipe({
  name: 'vehicles',
  standalone: true,
})
export class VehiclesPipe implements PipeTransform {
  constructor(private dataService: DataService) {}

  transform(value: string | null | undefined, arg: string): string {
    if (!value || !arg) return 'N/A';
    const id = extractIdFromUrl(value, 'vehicles');
    if (!id) return 'N/A';

    const vehicle = this.dataService.vehicles.find((i) => i.id == id);

    if (vehicle) return vehicle.name ?? 'N/A';

    return 'N/A';
  }
}
