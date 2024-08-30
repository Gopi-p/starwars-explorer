import { HttpClient } from '@angular/common/http';
import { forkJoin, lastValueFrom, map, switchMap } from 'rxjs';
import { SWPeople } from '../interfaces/people.interface';

export const fetchSWPeopleAPI = async (http: HttpClient) => {
  const baseUrl = 'https://swapi.dev/api/people/';

  let res: SWPeople = await lastValueFrom(
    http.get<any>(`${baseUrl}?page=1`).pipe(
      switchMap((firstPage) => {
        const totalItems = firstPage.count;
        const totalPages = Math.ceil(totalItems / 10);

        const requests = [];
        for (let page = 2; page <= totalPages; page++) {
          requests.push(http.get<any>(`${baseUrl}?page=${page}`));
        }

        return forkJoin(requests).pipe(
          map((pages) => {
            const allResults = firstPage.results.map((person: any) => {
              const id = person.url.match(/\/people\/(\d+)\//)[1];
              return { ...person, id };
            });

            pages.forEach((page) => {
              page.results.forEach((person: any) => {
                const id = person.url.match(/\/people\/(\d+)\//)[1];
                allResults.push({ ...person, id });
              });
            });

            return allResults;
          })
        );
      })
    )
  );

  return res;
};
