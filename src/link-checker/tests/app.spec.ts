import statusChecker from "../app";

test("no url included", () => {
  const config = {
    url: "",
    path: "./examples/link-checker-results.json",
    test: true
  };

  expect(statusChecker(config)).toBe(false);
});

test("no path included", () => {
  const config = {
    url: "https://www.google.com",
    path: "",
    test: true
  };

  expect(statusChecker(config)).toBe(false);
});
