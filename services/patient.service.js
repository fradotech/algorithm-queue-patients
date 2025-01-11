import { readJsonFile } from "./util.service.js";

export class PatientService {
  data = [];

  constructor() {
    this.data = readJsonFile("../database/patients.json").data;
  }

  index() {
    return this.data;
  }

  add(doctor) {
    this.data.push(doctor);
  }
}
