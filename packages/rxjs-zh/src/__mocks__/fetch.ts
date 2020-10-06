export const mockFetch = async (query: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * 300 + 500))); // 500 ~ 800ms
  return new Array(query.length)
    .fill(0)
    .map((_i, index) => query.substring(0, index + 1))
    .reverse();
};
