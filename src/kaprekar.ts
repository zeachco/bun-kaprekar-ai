import {
  ascending,
  descending,
  hasDifferentDigits,
  leftpad,
} from "./utilities.js";

const KAPREKAR_CONST = "6174";

export function nextSequence(
  seq: string,
  initial: string = seq,
  index = 0,
): number {
  if (!hasDifferentDigits(seq)) {
    // console.log(
    //   `${seq} is not a valid Kaprekar number, needs at least two different digits`,
    // );
    return -1;
  }

  const four = leftpad(seq);

  const asc = ascending(four);
  const desc = descending(four);
  const substraction = leftpad(parseInt(desc, 10) - parseInt(asc, 10));

  // console.log(`#${index} ${four}
  //    ${leftpad(asc)}
  // -  ${leftpad(desc)}
  //    ${leftpad(substraction)}
  // `);

  if (substraction === KAPREKAR_CONST) {
    // console.log(`Reached Kaprekar number in ${index} step(s)`);
    return index;
  } else {
    return nextSequence(substraction, initial, index + 1);
  }
}

// const arg = process.argv[2];

// if (isFinite(+arg)) {
//   nextSequence(arg);
// } else {
//   for (let i = 1; i < 9988; i++) {
//     const key = ascending(leftPad(i));
//     if (!results.get(key)) {
//       nextSequence(key);
//     }
//   }

//   console.table(results);
// }
