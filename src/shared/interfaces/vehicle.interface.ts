export interface SWVehicleIF {
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
  vehicle_class?: string | null;
  pilots?: string[] | [];
  films?: string[] | [];
  created?: Date | string;
  edited?: Date | string;
  url?: string | null;
  id?: string;
}
