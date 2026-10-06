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

