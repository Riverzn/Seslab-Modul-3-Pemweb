# Demonstrasi TypeScript: Tipe Dasar dan Type Inference

README ini menjelaskan materi TypeScript mulai dari **poin 3.1 Primitive Types** dan **poin 3.2 Type Inference**. Contoh utama dapat dilihat pada [`src/demos/03-basic-types.ts`](./src/demos/03-basic-types.ts).

## Menjalankan Demo

Pastikan dependency sudah terpasang, lalu jalankan:

```bash
npm run typecheck
npm run build
node dist/index.js
```

- `npm run typecheck` memeriksa tipe tanpa menghasilkan file JavaScript.
- `npm run build` mengompilasi file dari `src/` ke `dist/`.
- `node dist/index.js` menjalankan hasil kompilasi.

## 3.1 Primitive Types

Primitive type adalah tipe data dasar yang tersedia di TypeScript.

### `string`

`string` digunakan untuk menyimpan teks.

```ts
let text: string = "Hello World!";
```

Variabel `text` hanya boleh diisi dengan nilai teks. Kode berikut akan menghasilkan error:

```ts
let studentName: string = "Rani";
studentName = 100;
```

Pesan error tersebut berarti nilai `number` tidak dapat dimasukkan ke variabel bertipe `string`.

### `number`

`number` digunakan untuk bilangan bulat maupun desimal. TypeScript tidak membedakan `int`, `float`, atau `double`.

```ts
let age: number = 20;
let average: number = 87.5;
```

Contoh operasi angka:

```ts
const price: number = 15_000;
const quantity: number = 2;
const total: number = price * quantity;

console.log(total); // 30000
```

Underscore pada `15_000` hanya membantu keterbacaan. Nilainya sama dengan `15000`.

### `boolean`

`boolean` hanya memiliki dua nilai:

- `true`
- `false`

```ts
const score: number = 95;
const isPassed: boolean = score >= 75;

console.log(isPassed); // true
```

Perhatikan perbedaan antara boolean dan string:

```ts
const value1: boolean = true;
const value2: string = "true";
```

`true` tanpa tanda kutip adalah boolean, sedangkan `"true"` adalah string.

### `bigint`

`bigint` digunakan untuk bilangan bulat yang sangat besar. Nilainya diberi akhiran `n`.

```ts
const bigNumber: bigint = 9007199254740993n;
```

`bigint` tidak dapat langsung dicampur dengan `number`:

```ts
const first: bigint = 10n;
const second: number = 5;

// Error:
// const result = first + second;
```

Jika memang diperlukan, lakukan konversi secara eksplisit:

```ts
const result = first + BigInt(second);
```

### `symbol`

`symbol` menghasilkan nilai unik. Dua `Symbol` dengan deskripsi sama tetap merupakan nilai yang berbeda.

```ts
const firstId = Symbol("id");
const secondId = Symbol("id");

console.log(firstId === secondId); // false
```

## 3.2 Type Inference

Type inference adalah kemampuan TypeScript untuk menebak tipe berdasarkan nilai awal variabel. Anotasi tipe tidak selalu harus ditulis.

```ts
let a = 10;          // number
let b = "hi";        // string
const c = "hi";      // string literal "hi"
let list = [1, 2, 3]; // number[]
```

Secara konsep, TypeScript memahami:

```ts
let a: number = 10;
let b: string = "hi";
let list: number[] = [1, 2, 3];
```

Karena `a` sudah diinferensikan sebagai `number`, kode berikut tidak valid:

```ts
let a = 10;
a = "sepuluh"; // Error
```

### Perbedaan `let` dan `const`

`let` dapat diisi ulang selama nilainya masih sesuai tipe:

```ts
let message = "Halo";
message = "Selamat pagi"; // OK
```

`const` tidak dapat di-assign ulang:

```ts
const title = "TypeScript";
// title = "JavaScript"; // Error
```

Untuk variabel sederhana, biarkan TypeScript melakukan inference. Anotasi eksplisit tetap berguna untuk memperjelas kontrak fungsi, struktur data, atau kode yang akan dibaca banyak orang.

## Array

Array dengan sintaks `T[]` berisi elemen dengan tipe yang sama:

```ts
const colors: string[] = ["Red", "Green", "Blue"];
```

Elemen baru harus berupa string:

```ts
colors.push("Yellow"); // OK
// colors.push(100);   // Error
```

Bentuk penulisan lain yang setara adalah:

```ts
const numbers: Array<number> = [1, 2, 3];
```

`string[]` dan `Array<string>` memiliki arti yang sama.

## Tuple

Tuple adalah array dengan jumlah dan tipe setiap posisi yang sudah ditentukan:

```ts
const pair: [string, number] = ["umur", 25];
```

Artinya:

- posisi pertama harus `string`;
- posisi kedua harus `number`;
- jumlah elemennya harus dua.

Contoh yang tidak valid:

```ts
// const wrongOrder: [string, number] = [25, "umur"];
// const missingValue: [string, number] = ["umur"];
```

Tuple juga dapat dibongkar menggunakan destructuring:

```ts
const [label, value] = pair;

console.log(label); // "umur"
console.log(value); // 25
```

TypeScript mengetahui bahwa `label` bertipe `string` dan `value` bertipe `number`.

## Script Demo Lengkap

Berikut script yang digunakan untuk mendemonstrasikan tipe dasar, inference, array, dan tuple:

```ts
let text: string = "Hello World!";
let num: number = 58.0;
let isTrue: boolean = false;

let a = 10;
let b = "hi";
const c = "hi";
let list = [1, 2, 3];

let colors: string[] = ["Red", "Green", "Blue"];
let pair: [string, number] = ["umur", 25];
let [label, value] = pair;

console.log(colors, pair, label, value);
```

Penjelasan ringkas:

1. `text`, `num`, dan `isTrue` memakai anotasi eksplisit untuk `string`, `number`, dan `boolean`.
2. `a`, `b`, `c`, dan `list` menggunakan type inference.
3. `colors` adalah array string.
4. `pair` adalah tuple dengan format `[string, number]`.
5. `label` dan `value` diperoleh melalui destructuring tuple.

## Demonstrasi Error TypeScript

Untuk memperlihatkan manfaat pemeriksaan tipe, tambahkan sementara:

```ts
let studentName: string = "Rani";
studentName = 100;
```

Kemudian jalankan:

```bash
npm run typecheck
```

Compiler akan menunjukkan error sebelum program dijalankan. Setelah demonstrasi selesai, hapus atau perbaiki baris tersebut agar project kembali lolos pemeriksaan tipe.

---

## 4. Fungsi

TypeScript memungkinkan kita memberi tipe pada parameter dan nilai kembalian fungsi. Dengan begitu, kesalahan pemanggilan fungsi dapat diketahui sebelum program dijalankan.

### Parameter dan return type

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Praktikan"));
```

Penjelasan:

- `name: string` berarti parameter `name` wajib berupa string.
- `: string` setelah tanda kurung berarti fungsi mengembalikan string.

Pemanggilan berikut tidak valid:

```ts
// greet(123); // Error: number bukan string
```

### Arrow function

```ts
const double = (n: number): number => n * 2;

console.log(double(5)); // 10
```

`n` harus berupa `number`, dan hasil fungsi juga berupa `number`.

### Parameter default dan opsional

```ts
function sapa(
  nama: string,
  sapaan = "Halo",
  gelar?: string,
): string {
  return `${sapaan}, ${gelar ? `${gelar} ` : ""}${nama}!`;
}

console.log(sapa("Rye"));             // Halo, Rye!
console.log(sapa("Rye", "Hai", "Mas")); // Hai, Mas Rye!
```

- `nama` adalah parameter wajib.
- `sapaan = "Halo"` memiliki nilai default.
- `gelar?` adalah parameter opsional dan mungkin bernilai `undefined`.
- Parameter wajib harus ditulis sebelum parameter opsional.

### Rest parameter

Rest parameter menerima banyak angka sebagai array:

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum(1, 2, 3)); // 6
```

### Tipe fungsi dan callback

```ts
type Operation = (left: number, right: number) => number;

const add: Operation = (left, right) => left + right;
```

`Operation` adalah kontrak fungsi yang menerima dua `number` dan mengembalikan `number`. Parameter pada `add` otomatis diketahui sebagai `number`.

Demo lengkap tersedia di [`src/demos/04-functions.ts`](./src/demos/04-functions.ts).

## 5. Object Types: `type` dan `interface`

Object type digunakan untuk menjelaskan bentuk object: nama properti, tipe nilai, serta properti yang wajib atau opsional.

### Interface

```ts
interface Product {
  name: string;
  price: number;
  isAvailable: boolean;
}

const product: Product = {
  name: "Buku",
  price: 25000,
  isAvailable: true,
};
```

Object harus memiliki properti yang sesuai dengan interface. Misalnya, `price` harus berupa `number`.

### Properti `readonly` dan opsional

```ts
interface Account {
  readonly id: number;
  username: string;
  nickname?: string;
}

const account: Account = {
  id: 1,
  username: "rye",
};

account.username = "rye2"; // OK
// account.id = 2;         // Error: id readonly
```

- `readonly` hanya dapat diisi saat object dibuat.
- `nickname?` boleh tidak ditulis.
- Properti opsional diperlakukan sebagai `string | undefined`.

### `type` alias

`type` juga dapat digunakan untuk mendefinisikan bentuk object, termasuk struktur bersarang:

```ts
type Location = {
  name: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};
```

Pedoman sederhana:

- gunakan `interface` untuk kontrak object yang mungkin diperluas;
- gunakan `type` untuk union, tuple, atau tipe turunan.

### Extends dan declaration merging

Interface dapat diperluas dengan `extends`:

```ts
interface BaseObject {
  name: string;
  address: string;
}

interface ExtendedObject extends BaseObject {
  type: "HOME" | "OFFICE";
}
```

Interface juga dapat dideklarasikan dua kali. TypeScript akan menggabungkannya:

```ts
interface Room {
  name: string;
  num: number;
}

interface Room {
  floor: number;
}

const room: Room = {
  name: "Lab A",
  num: 101,
  floor: 2,
};
```

Demo lengkap tersedia di [`src/demos/05-object-types.ts`](./src/demos/05-object-types.ts).

## 6. Union, Narrowing, dan Literal Types

### Union type

Union menggunakan tanda `|` dan berarti sebuah nilai dapat memiliki salah satu dari beberapa tipe:

```ts
function show(id: string | number): void {
  console.log(id);
}

show("abc");
show(123);
```

Karena `id` bisa berupa string atau number, TypeScript tidak mengizinkan method yang hanya dimiliki salah satu tipe sebelum dilakukan narrowing.

### Narrowing dengan `typeof`

```ts
function showId(id: string | number): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
```

Di dalam blok `if`, TypeScript mengetahui `id` sebagai string. Di dalam `else`, `id` dianggap sebagai number.

Teknik narrowing lain yang umum adalah `Array.isArray`, `instanceof`, operator `in`, truthiness, dan pemeriksaan `undefined`.

### Literal type

Literal type membatasi nilai menjadi pilihan tertentu:

```ts
type TrafficLight = "red" | "yellow" | "green";

let light: TrafficLight = "yellow";
// light = "blue"; // Error
```

Dengan tipe ini, typo seperti `"gren"` dapat ditolak oleh compiler.

### Discriminated union

Discriminated union memakai properti penanda seperti `kind`:

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}
```

Setelah memeriksa `shape.kind`, TypeScript mengetahui properti khusus yang tersedia. Circle memiliki `radius`, sedangkan square memiliki `side`.

Demo lengkap tersedia di [`src/demos/06-union-narrowing.ts`](./src/demos/06-union-narrowing.ts).

## 7. Enum dan Union Literal

### Enum

Enum digunakan untuk membuat kumpulan konstanta bernama:

```ts
enum HttpStatus {
  OK = "OK",
  NotFound = "NOT_FOUND",
}

function handle(status: HttpStatus): void {
  if (status === HttpStatus.OK) {
    console.log("Respons berhasil!");
  }
}

handle(HttpStatus.OK);
```

`HttpStatus.OK` dapat digunakan kembali tanpa menulis string `"OK"` berulang-ulang. Enum juga menghasilkan object JavaScript saat runtime.

### Union literal sebagai alternatif

```ts
type HttpStatusLiteral = "OK" | "NOT_FOUND";

function isSuccess(status: HttpStatusLiteral): boolean {
  return status === "OK";
}
```

Union literal hanya digunakan untuk pemeriksaan tipe dan tidak menghasilkan object tambahan di JavaScript.

Perbandingan singkat:

| Aspek | `enum` | Union literal |
| --- | --- | --- |
| Ada saat runtime | Ya | Tidak |
| Membuat konstanta bernama | Ya | Tidak |
| Membatasi pilihan nilai | Ya | Ya |
| Cocok untuk | Kumpulan konstanta yang dipakai berulang | Tipe string sederhana dan ringan |

Pilih satu gaya secara konsisten dalam satu bagian aplikasi.

Demo lengkap tersedia di [`src/demos/07-enum.ts`](./src/demos/07-enum.ts).

## 8. `null`, `undefined`, dan Optional Chaining

Dengan `strictNullChecks`, `null` dan `undefined` dianggap sebagai tipe tersendiri. Nilai kosong harus ditangani secara eksplisit.

```ts
let name: string = "Budi";
// name = null; // Error

let nameOrNull: string | null = "Andi";
nameOrNull = null; // OK
```

### Optional property dan optional chaining

```ts
interface User {
  name: string;
  address?: {
    city: string;
  };
}

const user: User = {
  name: "Rye",
};

const city = user.address?.city;
```

Karena `address` opsional, `user.address?.city` menghasilkan `string | undefined`. Operator `?.` menghentikan akses jika bagian sebelumnya kosong, sehingga tidak langsung menyebabkan error runtime.

### Nullish coalescing

Gunakan `??` untuk memberikan nilai cadangan hanya ketika nilai sebelumnya `null` atau `undefined`:

```ts
const display = user.address?.city ?? "Tidak diketahui";
console.log(display);
```

Perbedaan `||` dan `??`:

```ts
const count = 0;

console.log(count || 10); // 10, karena 0 dianggap falsy
console.log(count ?? 10); // 0, karena 0 bukan null atau undefined
```

### Non-null assertion

Operator `!` memberi tahu compiler bahwa nilai dianggap tidak kosong:

```ts
const element = document.getElementById("title")!;
```

Gunakan dengan hati-hati. Jika element sebenarnya tidak ditemukan, `!` tidak mencegah error saat runtime. Pemeriksaan yang lebih aman adalah:

```ts
const element = document.getElementById("title");

if (element) {
  element.textContent = "Judul";
}
```

Demo lengkap tersedia di [`src/demos/08-null-undefined.ts`](./src/demos/08-null-undefined.ts).

## Ringkasan Poin 3–8

1. **Tipe dasar dan inference** membantu compiler memahami bentuk nilai.
2. **Fungsi** dapat memiliki parameter, return type, default value, dan callback yang aman.
3. **Object types** mendeskripsikan struktur object melalui `type` atau `interface`.
4. **Union dan narrowing** memungkinkan satu nilai memiliki beberapa kemungkinan dengan pemeriksaan yang aman.
5. **Enum dan union literal** membatasi pilihan nilai menggunakan dua pendekatan berbeda.
6. **`null`, `undefined`, `?.`, dan `??`** membantu menangani data yang mungkin belum tersedia.
