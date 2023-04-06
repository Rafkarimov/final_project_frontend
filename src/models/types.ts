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

export interface Person {
  id?: number;
  login?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  birthDate?: Date;
  phone?: Date;
  email?: Date;
  snils?: Date;
}

export interface PersonState {
  persons?: Array<Person>;
}

export interface Doctor {
  id?: number;
  person?: Array<Person>;
  medSpecialization?: Array<MedSpecialization>;
}

export interface DoctorState {
  doctors?: Array<Doctor>;
}
