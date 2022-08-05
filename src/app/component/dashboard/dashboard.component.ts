import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/student';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  studentLists: Student[] = [];
  studentObj: Student = {
    id: '',
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
  };
  id: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  mobile: string = '';
  constructor(private auth: AuthService, private data: DataService) {}

  ngOnInit(): void {}
  // logout() {
  //   this.auth.signout();
  // }
  getAllStudents() {
    // this.data.getAllStudents().subscribe(
    //   (res) => {
    //     this.studentLists = res.map((e: any) => {
    //       const data = e.payload.doc.data();
    //       data.id = e.payload.doc.id;
    //       return data;
    //     });
    //   },
    //   (err) => {
    //     alert('Error while fetching Students');
    //   }
    // );
  }

  addStudent() {
    if (
      this.firstname === '' ||
      this.lastname === '' ||
      this.email === '' ||
      this.mobile === ''
    ) {
      alert('Fill all input fields');
    }
    this.studentObj.id = '';
    this.studentObj.firstname = this.firstname;
    this.studentObj.lastname = this.lastname;
    this.studentObj.email = this.email;
    this.studentObj.mobile = this.mobile;
    this.data.addStudent(this.studentObj);
  }
  updatestudent() {}

  delStudent(student: Student) {
    if (
      window.confirm(
        `Are you sure want to delete ${student.firstname} ${student.lastname} ?`
      )
    )
      this.data.delStudent(student);
  }
}
