import { HttpClient } from '@angular/common/http';
import { forkJoin, lastValueFrom, map, switchMap } from 'rxjs';

const BASE_URL = 'https://swapi.dev/api/';

export const fetchHandler = async <T>(
  http: HttpClient,
  route: String
): Promise<T[]> => {
  try {
    const apiURL = `${BASE_URL}${route}/`;
    const idRegex = new RegExp(`/${route}/(\\d+)/`);

    const res: T[] = await lastValueFrom(
      http.get<any>(apiURL).pipe(
        switchMap((firstPage) => {
          const totalItems = firstPage.count;

          const allResults = firstPage.results.map((item: any) => {
            const id = item.url.match(idRegex)[1];
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
                  const id = item.url.match(idRegex)[1];
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
    console.log('@@  error: ', error);
    return [];
  }
};

// const extractIdFromUrl = (url: string, route: string): string | null => {
//   const regex = new RegExp(`/${route}/(\\d+)/`);
//   const match = url.match(regex);
//   return match ? match[1] : null;
// };
