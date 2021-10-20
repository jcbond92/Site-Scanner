import statusChecker from "../app";

test("no url included", () => {
  const config = {
    path: "./examples/link-checker-results.json",
  };

  expect(statusChecker(config)).toBe(false);
});

test("no path included", () => {
  const config = {
    url: "https://www.google.com",
  };

  expect(statusChecker(config)).toBe(false);
});
