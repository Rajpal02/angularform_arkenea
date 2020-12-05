import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm!: NgForm;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  submitted = false;
  selectedFile!: File;

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  constructor(private http: HttpClient) {

  }

  onSubmit() {
    this.submitted = true;
    this.user.firstName = this.signupForm.value.firstName;
    this.user.lastName = this.signupForm.value.lastName;
    this.user.email = this.signupForm.value.email;
    this.user.phoneNumber = this.signupForm.value.phoneNumber;

    this.signupForm.reset();
  }

  onFileSelected(file: any) {
    console.log(file);
    this.selectedFile = <File>file.target.files[0];
  }

  onUpload() {
    const fd = new FormData;
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.http.post('url_of_firebase_or_any_cloud', fd)
    .subscribe((res)=>{
      console.log(res);
    })
  }
}
