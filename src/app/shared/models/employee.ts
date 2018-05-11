export class Employee {
  id: number;
  name: string;
  gender: string;
  age: number;
  company: string;
  constructor(){
    this.id = 0;
    this.name = '';
    this.gender = '';
    this.age = 0,
    this.company = '';
  }
}
//Action types for BS Modal and Employee
export enum Action{
  New, Copy, Update
}