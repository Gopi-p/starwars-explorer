export interface SWFilmIF {
  title?: string;
  episodeID?: number;
  openingCrawl?: string;
  director?: string;
  producer?: string;
  releaseDate?: Date;
  characters?: string[] | [];
  planets?: string[] | [];
  starships?: string[] | [];
  vehicles?: string[] | [];
  species?: string[] | [];
  created?: Date;
  edited?: Date;
  url?: string;
  id?: string;
}
