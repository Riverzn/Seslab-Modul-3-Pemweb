function greet(name: string): string {
  return `Hello, ${name}!`;
}

const double = (n: number): number => n * 2;

function sapa(nama: string, sapaan = "Halo", gelar?: string): string {
  return `${sapaan}, ${gelar ? gelar + " " : ""}${nama}!`;
}
console.log(sapa("Rye"));
console.log(sapa("Rye", "Hai", "Mas"));

function sum(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

type Operation = (a: number, b: number) => number;
const add: Operation = (a, b) => a + b;
console.log(greet("Praktikan"), double(5), sum(1, 2, 3), add(2, 3));