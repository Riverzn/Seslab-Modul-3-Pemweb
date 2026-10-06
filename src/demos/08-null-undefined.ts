interface User {
  name: string;
  address?: { city: string };
}
const user: User = { name: "Rye" };

const city = user.address?.city;
const display = user.address?.city ?? "Tidak diketahui";

const count = 0;
console.log(count || 10); // 10
console.log(count ?? 10); // 0
console.log(display);