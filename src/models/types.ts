// Интерфейсы для всех DTO
export interface MedSpecialization {
  id?: number;
  title?: string;
  description?: string;
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
  person?: Person;
  medSpecialization?: MedSpecialization;
}

export interface DoctorState {
  doctors?: Array<Doctor>;
}

export interface ChiefDoctor {
  id?: number;
  person?: Person;
  medSpecialization?: Array<MedSpecialization>;
}

export interface ChiefDoctorState {
  chiefDoctors?: Array<ChiefDoctor>;
}

export interface Visitor {
  id?: number;
  person?: Person;
}

export interface VisitorState {
  visitors?: Array<Visitor>;
}

export interface MedTypesOfResearch {
  id?: number;
  title?: string;
  description?: string;
}

export interface MedTypesOfResearchState {
  medtypesofresearches?: Array<MedTypesOfResearch>;
}

export interface LaboratoryAssistant {
  id?: number;
  person?: Person;
  medTypesOfResearch?: Array<MedTypesOfResearch>;
}

export interface LaboratoryAssistantState {
  laboratoryassistants?: Array<LaboratoryAssistant>;
}

export interface VisitorResearch {
  id?: number;
  visitor?: Visitor;
  doctor?: Doctor;
  laboratoryAssistant?: LaboratoryAssistant;
  dateOfReferralForResearch?: Date;
  dateOfResearch?: Date;
  medTypesOfResearch?: MedTypesOfResearch;
}

export interface VisitorResearchState {
  visitorsresearches?: Array<VisitorResearch>;
}

export interface Reception {
  id?: number;
  visitor?: Array<Visitor>;
  doctor?: Array<Doctor>;
  receptionDateTime?: Date;
  // receptionStatus?: Array<MedTypesOfResearch>;
}

export interface ReceptionState {
  receptions?: Array<Reception>;
}
