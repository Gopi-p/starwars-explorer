import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

export const fetchSWPeopleAPI = async (http: HttpClient) => {
  let response: any[] = [];
  let res = await lastValueFrom(http.get('https://swapi.dev/api/people/'));

  console.log('@@  res: ', res);

  return response;
};
