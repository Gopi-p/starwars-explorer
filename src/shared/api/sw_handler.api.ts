import { HttpClient } from '@angular/common/http';
import { forkJoin, lastValueFrom, map, switchMap } from 'rxjs';
import { extractIdFromUrl } from '../services/data.service';

const BASE_URL = 'https://swapi.dev/api/';

export const fetchHandler = async <T>(
  http: HttpClient,
  route: string
): Promise<T[]> => {
  try {
    const apiURL = `${BASE_URL}${route}/`;

    const res: T[] = await lastValueFrom(
      http.get<any>(apiURL).pipe(
        switchMap((firstPage) => {
          const totalItems = firstPage.count;

          const allResults = firstPage.results.map((item: any) => {
            const id = extractIdFromUrl(item.url, route);
            return { ...item, id };
          });

          if (totalItems <= 10) {
            return [allResults];
          }

          const requests = [];
          const totalPages = Math.ceil(totalItems / 10);
          for (let page = 2; page <= totalPages; page++) {
            requests.push(http.get<any>(`${apiURL}?page=${page}`));
          }

          return forkJoin(requests).pipe(
            map((pages) => {
              pages.forEach((page) => {
                page.results.forEach((item: any) => {
                  const id = extractIdFromUrl(item.url, route);
                  allResults.push({ ...item, id });
                });
              });

              return allResults;
            })
          );
        })
      )
    );

    return res;
  } catch (error) {
    console.log('@@  fetchHandler [ERR]: ', error);
    return [];
  }
};
