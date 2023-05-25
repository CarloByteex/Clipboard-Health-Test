const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Return trivial partition key if no event is provided", () => {
    expect(deterministicPartitionKey(null)).toBe("0");
    expect(deterministicPartitionKey(undefined)).toBe("0");
  });

  it("Return the provided partition key if it exists", () => {
    const event = { partitionKey: "my-partition-key" };
    expect(deterministicPartitionKey(event)).toBe("my-partition-key");
  });

  it("Return a hashed partition key if the candidate exceeds the max length", () => {
    const event = { data: "Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess wrong. You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work." };
    const expected = "ef11423ecae6753e71955deff7cbccf444309b7cd4feac2041b4f37cdcd2543c5c3c561119ea41e31cdc800a426ebaaf40a6bb0d8aee6aa5972434ceba778e40";
    expect(deterministicPartitionKey(event)).toBe(expected);
  });

  it("Return a hashed partition key if the candidate is not a string", () => {
    const event = { data: { key: "healthcare" } };
    const expected = "2cc343890074974eab2b2ee1703db268025a211fcd37e80d07564a271f1955ab10a5b7d2884930d0841686307b984571032f2d51bee8d02a2505d612b0f3af60";
    expect(deterministicPartitionKey(event)).toBe(expected);
  });

  it("Return a hash of the JSON stringified event if partition key is not provided", () => {
    const event = { data: { name: "healthcare" } };
    const expected = "2afe35df7e8d0aced4b36c17b2e52ec236342a944635c2c81878af0968df9fbf550a5a9c7271e9500fc8beaae88edc1c46e6eaef8bab07ffb575cff0463feaab";
    expect(deterministicPartitionKey(event)).toBe(expected);
  });
});