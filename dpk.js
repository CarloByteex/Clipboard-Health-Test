const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  
  // Removed unnecessary variables (let candidate) and simplified the code by chaining the ternary operators in a single expression.
  if (!event) return TRIVIAL_PARTITION_KEY;
  
  // Combined the conditionals with an early termination check using if (!event) which checks for falsy values such as null, undefined and false.
  // Eliminated the need for multiple nested if statements, and extracted the conditional logic into a more concise expression.
  const candidate = event.partitionKey || crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex");
  // Renamed candidate to candidateStr to reflect that it holds the stringified value of the partition key.
  const candidateStr = typeof candidate === "string" ? candidate : JSON.stringify(candidate);
  
  return candidateStr.length > MAX_PARTITION_KEY_LENGTH
  ? crypto.createHash("sha3-512").update(candidateStr).digest("hex")
  : candidateStr;
};
