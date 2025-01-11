import { DoctorService } from "./services/doctor.service.js";
import { PatientService } from "./services/patient.service.js";
import { QueueService } from "./services/queue.service.js";
import { printTable } from "./services/util.service.js";

const doctorService = new DoctorService();
const patientService = new PatientService();
const queueService = new QueueService();

printTable("Doctors", doctorService.index());
printTable("Patients", patientService.index());
printTable("Queue", queueService.index());
printTable("Doctors Available", queueService.availableDoctors);
console.log("\nNEXT WAITING TIME:", queueService.NEXT_WAITING_TIME, "minutes\n\n");
