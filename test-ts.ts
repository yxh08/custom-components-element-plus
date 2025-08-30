console.log("Hello from TypeScript!");

interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "Test User",
  age: 25
};

console.log("User:", user);

// 测试一些TypeScript特性
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);
