interface Product {
  name: string;
  price: number;
  isAvailable: boolean;
}

interface Account {
  readonly id: number;
  username: string;
  nickname?: string;
}
const acc: Account = { id: 1, username: "rye" };
acc.username = "rye2"; // OK
// acc.id = 2;          // coba buka komentar ini, tunjukkan error

interface BaseObject { name: string; address: string }
interface ExtendedObject extends BaseObject { type: "HOME" | "OFFICE" }

interface Room { name: string; num: number }
interface Room { floor: number }
const r: Room = { name: "Lab A", num: 101, floor: 2 };
console.log(acc, r);