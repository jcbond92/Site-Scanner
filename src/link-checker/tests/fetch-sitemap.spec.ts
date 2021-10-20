import fetchSitemap from "../utils/fetch-sitemap";
describe("fetching the sitemap", () => {
  test("fetching and converting links successfully", async () => {
    const config = {
      url: "https://www.google.com",
      test: true,
    };
    await expect(fetchSitemap(config)).resolves.toBeInstanceOf(Array);
  });

  test("throwing error for bad link", async () => {
    const config = {
      url: "https://www",
      test: true,
    };
    await expect(fetchSitemap(config)).rejects.toEqual("error");
  });
});