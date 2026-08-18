import { fetchCaseStudies } from "../caseStudiesApi";

describe("fetchCaseStudies (mock API)", () => {
  const originalRandom = Math.random;

  beforeEach(() => jest.useFakeTimers());

  afterEach(() => {
    jest.useRealTimers();
    Math.random = originalRandom;
  });

  it("resolves after the simulated latency with at least 8 seeded items", async () => {
    Math.random = () => 0.99;

    const promise = fetchCaseStudies();
    jest.advanceTimersByTime(800);
    const items = await promise;

    expect(items.length).toBeGreaterThanOrEqual(8);
    items.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          title: expect.any(String),
          category: expect.stringMatching(/^(Web|Mobile|AI|Blockchain)$/),
          summary: expect.any(String),
          year: expect.any(Number),
        })
      );
    });
  });

  it("gives every item a unique id", async () => {
    Math.random = () => 0.99;

    const promise = fetchCaseStudies();
    jest.advanceTimersByTime(800);
    const items = await promise;

    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
  });

  it("rejects with 'Network failed' when the simulated failure fires", async () => {
    Math.random = () => 0.01;

    const promise = fetchCaseStudies();
    jest.advanceTimersByTime(800);

    await expect(promise).rejects.toThrow("Network failed");
  });

  it("rejects immediately when the caller aborts", async () => {
    Math.random = () => 0.99;
    const controller = new AbortController();

    const promise = fetchCaseStudies({ signal: controller.signal });
    controller.abort();

    await expect(promise).rejects.toThrow("Request aborted");
  });
});
