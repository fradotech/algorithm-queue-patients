import { readJsonFile } from "./util.service.js";

export class DoctorService {
  data = [];

  constructor() {
    this.data = readJsonFile("../database/doctors.json").data;
  }

  index() {
    return this.data;
  }

  add(doctor) {
    this.data.push(doctor);
  }
}
