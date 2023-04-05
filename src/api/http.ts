import { MedSpecialization } from "@/models/types";
import axios from "axios";

export async function getMedSpecializations(): Promise<
  Array<MedSpecialization>
> {
  // Promise (промис) - это объект, представляющий результат успешного или неудачного завершения асинхронной операции
  const { data } = await axios.get("/medspecialization/get-all"); // Axios - это HTTP-клиент, основанный на Promise для Node.js и браузера.
  return data;
}