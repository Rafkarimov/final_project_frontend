import {
  ChiefDoctor,
  Doctor,
  MedSpecialization,
  Person,
  Visitor,
} from "@/models/types";
import axios from "axios";

export async function getMedSpecializations(): Promise<
  Array<MedSpecialization>
> {
  // Promise (промис) - это объект, представляющий результат успешного или неудачного завершения асинхронной операции
  const { data } = await axios.get("/medspecialization/get-all"); // Axios - это HTTP-клиент, основанный на Promise для Node.js и браузера.
  return data;
}

export async function getPersons(): Promise<Array<Person>> {
  // Promise (промис) - это объект, представляющий результат успешного или неудачного завершения асинхронной операции
  const { data } = await axios.get("/person/get-all"); // Axios - это HTTP-клиент, основанный на Promise для Node.js и браузера.
  return data;
}

export async function getDoctors(): Promise<Array<Doctor>> {
  // Promise (промис) - это объект, представляющий результат успешного или неудачного завершения асинхронной операции
  const { data } = await axios.get("/doctor/get-all"); // Axios - это HTTP-клиент, основанный на Promise для Node.js и браузера.
  return data;
}

export async function getChiefDoctors(): Promise<Array<ChiefDoctor>> {
  // Promise (промис) - это объект, представляющий результат успешного или неудачного завершения асинхронной операции
  const { data } = await axios.get("/chiefdoctor/get-all"); // Axios - это HTTP-клиент, основанный на Promise для Node.js и браузера.
  return data;
}

export async function getVisitors(): Promise<Array<Visitor>> {
  // Promise (промис) - это объект, представляющий результат успешного или неудачного завершения асинхронной операции
  const { data } = await axios.get("/visitor/get-all"); // Axios - это HTTP-клиент, основанный на Promise для Node.js и браузера.
  return data;
}
