import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private baseUrl = 'http://localhost:8080/employee'; // Replace with your backend URL

  title = "Employee Managment"
  employeeForm: FormGroup | undefined;
  employees: any[] | undefined;
  employee: any;
  
  constructor(private employeeService: EmployeeService, private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit() {
    this.getEmployees();
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobTitle: ['', Validators.required],
      phone: ['', Validators.required],
      imageUrl: ['', Validators.required],
      employeeCode: ['', Validators.required]
  })
}


  getEmployees() {
    this.http.get(`${this.baseUrl}/all`).subscribe((data: any) => {
      this.employees = data;
    });
  }

  getEmployeeById(id: number) {
    this.http.get(`${this.baseUrl}/find/${id}`).subscribe((data: any) => {
      this.employee = data;
    });
  }

  addEmployee(employee: any) {
    this.http.post(`${this.baseUrl}/add`, employee).subscribe(() => {
      this.getEmployees();
    });
  }

  updateEmployee(idEdit: number) {
    if (this.employeeForm != undefined && this.employeeForm.valid) {
      const employeeData = this.employeeForm.value; // Get the form data
    
      // Assign the form data to the employee object properties
      this.employee.name = employeeData.name;
      this.employee.email = employeeData.email;
      this.employee.jobTitle = employeeData.jobTitle;
      this.employee.phone = employeeData.phone;
      this.employee.imageUrl = employeeData.imageUrl;
      this.employee.employeeCode = employeeData.employeeCode;
  
    this.http.put(`${this.baseUrl}/update`, this.employee).subscribe(() => {
      this.getEmployees();
    });
  }
}

  deleteEmployee(id: number) {
    this.http.delete(`${this.baseUrl}/delete/${id}`).subscribe(() => {
      this.getEmployees();
    });
  }
}

