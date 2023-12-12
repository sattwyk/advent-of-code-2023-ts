import { readFile } from "fs/promises";

try {
  const controller = new AbortController();
  const { signal } = controller;
  const buffer = await readFile("./day1/inputs.txt", signal);

  // Abort the request before the promise settles.
  controller.abort();
  const inputs = buffer.toString("utf-8").split('\r\n');

  const nums = inputs.map(getNum);

  const total = nums.reduce((prevNum, currentNum) => prevNum + currentNum, 0)

  console.log(total);
} catch (err) {
  // When a request is aborted - err is an AbortError
  console.error(err);
}

function getNum(input: string): number {
  let firstNumChar = '';
  let lastNumChar = '';

  for (const char of input) {
    const numOfChar = Number(char);
    if (!Number.isNaN(numOfChar)) {
      if (!firstNumChar) firstNumChar = char;
      lastNumChar = char;
    }
  }

  return Number(firstNumChar + lastNumChar);
}