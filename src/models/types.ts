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
  person?: Array<Person>;
  medSpecialization?: Array<MedSpecialization>;
}

export interface DoctorState {
  doctors?: Array<Doctor>;
}

export interface ChiefDoctor {
  id?: number;
  person?: Array<Person>;
  medSpecialization?: Array<MedSpecialization>;
}

export interface ChiefDoctorState {
  chiefDoctors?: Array<ChiefDoctor>;
}

export interface Visitor {
  id?: number;
  person?: Array<Person>;
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
  medtypesofresearch1?: Array<MedTypesOfResearch>;
}

export interface LaboratoryAssistant {
  id?: number;
  person?: Array<Person>;
  // medTypesOfResearchList?: Array<MedTypesOfResearch>;
}

export interface LaboratoryAssistantState {
  laboratoryassistants?: Array<LaboratoryAssistant>;
}

export interface VisitorResearch {
  id?: number;
  visitors?: Array<Visitor>;
  doctor?: Array<Doctor>;
  laboratoryAssistant?: Array<LaboratoryAssistant>;
  dateOfReferralForResearch?: Date;
  dateOfResearch?: Date;
  medTypesOfResearch?: Array<MedTypesOfResearch>;
}

export interface VisitorResearchState {
  visitorsresearch?: Array<VisitorResearch>;
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
