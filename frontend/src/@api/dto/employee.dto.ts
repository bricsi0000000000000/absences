export class Employee {
  id!: number;
  name: string;
  isAdmin!: boolean;

  constructor(name: string) {
    this.name = name;
  }
}