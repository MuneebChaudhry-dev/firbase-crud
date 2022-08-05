import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Student } from '../model/student';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private afs: AngularFirestore, private http: HttpClient) {}

  //addStudent
  addStudent(student: Student) {
    student.id = this.afs.createId();
    if (
      this.http
        .post(
          'https://student-mgmt-system-e2b12-default-rtdb.firebaseio.com/students.json',
          student
        )
        .subscribe((responseData) => {
          responseData;
        })
    ) {
      console.log('Data Submitted');
    }
  }
  getAllStudents() {
    const check = this.afs.collection('students').snapshotChanges();
    console.log(check);
  }
  delStudent(student: Student) {
    return this.afs.doc('/Students/' + student.id).delete();
  }
  updateStudent(student: Student) {
    student.id = this.afs.createId();
    this.delStudent(student);
    this.addStudent(student);
  }
}
