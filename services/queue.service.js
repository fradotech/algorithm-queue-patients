import { DoctorService } from "./doctor.service.js";
import { PatientService } from "./patient.service.js";

class Queue {
  doctorId;
  doctorName;
  doctorConsultationTime = 0;
  patientName;
  totalWaitingTime = 0;
}

export class QueueService {
  doctorService = new DoctorService();
  patientService = new PatientService();

  data = [];
  nextDoctorId;
  NEXT_WAITING_TIME = 0;

  availableDoctor = [];

  index() {
    const doctors = this.doctorService.index();
    const patients = this.patientService.index();

    this.availableDoctors = doctors.map((doctor) => ({
      ...doctor,
      consultationTimeCurrent: 0,
    }));

    this.setNextDoctor();

    for (const patient of patients) {
      const nextDoctor = this.getNextDoctor();

      const queue = new Queue();
      queue.doctorId = nextDoctor.id;
      queue.doctorName = nextDoctor.name;
      queue.doctorConsultationTime = nextDoctor.consultationTime;
      queue.patientName = patient.name;
      queue.totalWaitingTime = nextDoctor.consultationTimeCurrent;

      this.data.push(queue);

      this.setNextDoctor();
    }

    return this.data;
  }

  getNextDoctor() {
    const data = this.availableDoctors.sort(
      (a, b) => a.consultationTimeCurrent - b.consultationTimeCurrent
    );

    return data[0];
  }

  setNextDoctor() {
    const nextDoctor = this.getNextDoctor();

    if (!this.nextDoctorId) {
      this.nextDoctorId = nextDoctor.id;
      return;
    }

    this.nextDoctorId = nextDoctor.id;
    nextDoctor.consultationTimeCurrent += nextDoctor.consultationTime;

    this.NEXT_WAITING_TIME = nextDoctor.consultationTimeCurrent;
  }
}
