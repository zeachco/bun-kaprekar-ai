export function leftpad(str: string | number): string {
  return ("000" + str).slice(-4);
}

export function ascending(str: string): string {
  return str.split("").sort().join("");
}

export function descending(str: string): string {
  return str.split("").sort().reverse().join("");
}

export function hasDifferentDigits(str: string): boolean {
  const set = str.split("").reduce((acc, d) => {
    return acc.add(d);
  }, new Set());

  return set.size > 1;
}

export function lerp(A: number, B: number, t: number) {
  return A + (B - A) * t;
}

export function rand(min = -1, max = 1) {
  return min + Math.random() * (max - min);
}

export function randInt(min = -1, max = 1) {
  return Math.round(rand(max, min));
}

// Quick tests
console.assert(hasDifferentDigits("0001") === true, "hasDifferentDigits");
console.assert(hasDifferentDigits("5555") === false, "hasDifferentDigits");
console.assert(leftpad(5) === "0005", "leftpad");
console.assert(leftpad(55554) === "5554", "leftpad");
console.assert(lerp(0, 10, .5) === 5, "lerp");
