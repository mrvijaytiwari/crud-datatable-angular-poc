import { Component, ViewChild, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SimpleModalContentComponent } from './simple-modal-content/simple-modal-content.component';
import { EmployeeService } from './shared/services/employee.service';
import { Observable } from 'rxjs/Rx';
import { Employee, Action } from './shared/models/employee';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  @ViewChild(DatatableComponent) table: DatatableComponent;
  title = 'app';
  employees: Employee[];
  bsModalRef: BsModalRef;
  temp = [];

  columns = [
    { name: 'id' },
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' },
    { name: 'Edit'}
  ];

  constructor(
    private modalService: BsModalService, 
    private employeeService: EmployeeService, 
    private http: HttpClient
  ) { }
  
  ngOnInit(){
    this.employeeService.getEmployees()
      .subscribe(employees => {
        this.employees = employees;
        this.temp = [...employees];
      });
  }

  ngOnDestroy(){
    //TODO: Unsubscribe any subscriptions
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    console.log(val);
    // filter our data
    const temp = this.temp.filter(function(d) {
      return (d.name.toLowerCase().indexOf(val) !== -1 || d.gender.toLowerCase().indexOf(val) !== -1) || !val;
    });
    console.log(temp)
    // update the rows
    this.employees = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  onSelect($event){
    console.log($event);  
  }

  addNew(){
    const initialState = {
      action: Action.New,
      employee: this.employees[this.employees.length - 1]
    };
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {initialState});
    this.bsModalRef.content.onClose.subscribe((res) => {
      this.employees.unshift(res);
      this.employees = [...this.employees];
      console.log(this.employees);
      this.table.offset = 0;
    });
  }

  openModalWithComponent(employee: Employee) {
    const initialState = {
      title: `Edit Employee ${employee.name}`,
      employee: employee,
      action: Action.Update
    };
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((employee: Employee) => {
      let itemIndex = this.employees.findIndex(emp => emp.id == employee.id);
      this.employees[itemIndex] = employee;
      this.employees = [...this.employees];
      console.log(this.employees);
      this.table.offset = 0;
    });
    // this.bsModalRef.content.employee = employee;
  }

  openModalForCopying(employee: Employee){
    const initialState = {
      title: `Copy Employee ${employee.name}`,
      employee: employee,
      lastId: this.employees[this.employees.length - 1].id,
      action: Action.Copy
    };
    this.bsModalRef = this.modalService.show(SimpleModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
    this.bsModalRef.content.onClose.subscribe((res) => {
      this.employees.unshift(res);
      this.employees = [...this.employees];
      console.log(this.employees);
      this.table.offset = 0;
    });
  }

  deleteRecord(employee: Employee){
    this.employeeService.deleteEmployee(employee).subscribe((res) => {
      console.log(res);
      this.employees = this.employees.filter(item => item !== employee);
      this.employees = [...this.employees];
    })
  }
}
