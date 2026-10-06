function show(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}
show("abc");
show(3.14159);

type TrafficLight = "red" | "yellow" | "green";
let light: TrafficLight = "yellow";

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function area(s: Shape): number {
  switch (s.kind) {
    case "circle": return Math.PI * s.radius ** 2;
    case "square": return s.side ** 2;
  }
}
console.log(area({ kind: "circle", radius: 2 }));
console.log(light);