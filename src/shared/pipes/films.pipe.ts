import { Pipe, PipeTransform } from '@angular/core';
import { DataService, extractIdFromUrl } from '../services/data.service';

@Pipe({
  name: 'films',
  standalone: true,
})
export class FilmsPipe implements PipeTransform {
  constructor(private dataService: DataService) {}

  transform(value: string | null | undefined, arg: string): string {
    if (!value || !arg) return 'Unknown';
    const id = extractIdFromUrl(value, 'films');
    if (!id) return 'Unknown';

    const film = this.dataService.films.find((i) => i.id == id);

    if (film) return film.title ?? 'Unknown';

    return 'Unknown';
  }
}
