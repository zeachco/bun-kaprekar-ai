import { nextSequence } from "./kaprekar.js";
import { NeuralNetwork } from "./neural-network/NeuralNetwork.js";
import { leftpad } from "./utilities.js";

const brain = new NeuralNetwork(4, 12, []);

try {
  brain.loadFromFile("./brain.json");
} catch (error) {
  console.error(error);
}

function trainer(): [number[], number[]] {
  const seq = leftpad(Math.round(Math.random() * 10000));
  const answer = nextSequence(seq);
  const expectedAnswer = new Array(10).fill(0);
  expectedAnswer[answer + 1] = 1;

  const input = seq.split("").map((n) => +n);
  return [input, expectedAnswer];
}

const networks = brain.train(trainer, 100);

const [best] = networks;

best.network.saveToFile("./brain.json");

let correctAnswers = 0;
const tests = 500;

for (let index = 0; index < tests; index++) {
  const seq = leftpad(Math.round(Math.random() * 10000));
  const answer = nextSequence(seq);
  const expectedAnswer = new Array(10).fill(0);
  expectedAnswer[answer + 1] = 1;
  const input = seq.split("").map((n) => +n);
  const outputs = brain.feedForward(input);
  const sorted = outputs.concat().sort();

  const bestGuess = outputs.indexOf(sorted[0]);

  // console.log(`Trying out ${seq} answer should be ${answer}`);

  if (bestGuess - 1 === answer) correctAnswers++;

  if (bestGuess) {
    // console.log(`AI answer is ${bestGuess - 1}\n`);
  } else {
    // console.log("AI thinks it's invalid (-1)");
  }
}

console.log(
  `${correctAnswers}/${tests} (${Math.round((correctAnswers / tests) * 100)}%)`
);
