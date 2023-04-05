// Интерфейсы для всех DTO
export interface MedSpecialization {
  id?: number;
  title?: string;
  description?: string;
  // doctors?: Array<Doctor>;
}

export interface MedSpecializationState {
  medSpecializations?: Array<MedSpecialization>;
}
