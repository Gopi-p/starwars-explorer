export interface SWStarShipsIF {
  name?: string | null;
  model?: string | null;
  manufacturer?: string | null;
  cost_in_credits?: string | null;
  length?: string | null;
  max_atmosphering_speed?: string | null;
  crew?: string | null;
  passengers?: string | null;
  cargo_capacity?: string | null;
  consumables?: string | null;
  hyperdrive_rating?: string | null;
  MGLT?: string | null;
  starship_class?: string | null;
  pilots?: string[] | [];
  films?: string[] | [];
  created?: Date | string;
  edited?: Date | string;
  url?: string | null;
  id?: string;
}
