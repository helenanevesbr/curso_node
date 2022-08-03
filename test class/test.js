import {Employee} from './another-file.js';

const emp = new Employee(1, 'Alice', 100);

console.log(emp.id); // 👉️ 1
console.log(emp.name); // 👉️ "Alice"

emp.increaseSalary();

console.log(emp.salary);