export interface SWSpeciesIF {
  name?: string | null;
  classification?: string | null;
  designation?: string | null;
  average_height?: string | null;
  skin_colors?: string | null;
  hair_colors?: string | null;
  eye_colors?: string | null;
  average_lifespan?: string | null;
  homeworld?: string | null;
  language?: string | null;
  people?: string[] | [];
  films?: string[] | [];
  created?: Date | string;
  edited?: Date | string;
  url?: string | null;
  id?: string;
}
