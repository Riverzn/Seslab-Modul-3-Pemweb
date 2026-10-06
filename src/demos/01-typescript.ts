/**
 * Poin 1 - TypeScript adalah JavaScript dengan pemeriksaan tipe saat compile time.
 */

export function runTypeScriptDemo(): void {
  const price: number = 15_000;
  const quantity: number = 2;
  const total = price * quantity;

  console.log("1. TypeScript");
  console.log(`Total belanja: Rp${total.toLocaleString("id-ID")}`);
  console.log("Tipe hanya membantu saat compile time; runtime tetap menjalankan JavaScript.");
}
