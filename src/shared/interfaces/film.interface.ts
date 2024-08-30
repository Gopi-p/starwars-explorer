export interface SWFilmIF {
  title?: string | null;
  episode_id?: number | null;
  opening_crawl?: string | null;
  director?: string | null;
  producer?: string | null;
  release_date?: Date | string;
  characters?: string[] | [];
  planets?: string[] | [];
  starships?: string[] | [];
  vehicles?: string[] | [];
  species?: string[] | [];
  created?: Date | string;
  edited?: Date | string;
  url?: string | null;
  id?: string;
}
