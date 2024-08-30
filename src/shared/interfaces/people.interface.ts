export interface SWPeopleIF {
  name?: string | null;
  height?: string | null;
  mass?: string | null;
  hair_color?: string | null;
  skin_color?: string | null;
  eye_color?: string | null;
  birth_year?: string | null;
  gender?: string | null;
  homeworld?: string | null;
  films?: string[] | [];
  species?: string[] | [];
  vehicles?: string[] | [];
  starships?: string[] | [];
  created?: Date | string;
  edited?: Date | string;
  url?: string | null;
  id?: string;
}
