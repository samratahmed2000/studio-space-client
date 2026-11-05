export interface RatingSummary {
  average: number;
  count: number;
}

export const getRatingSummary = (
  ratings: Array<{ rating: number }> = [],
): RatingSummary => {
  const count = ratings.length;

  if (count === 0) {
    return { average: 0, count: 0 };
  }

  const total = ratings.reduce(
    (sum, item) => sum + (Number(item.rating) || 0),
    0,
  );

  return { average: total / count, count };
};
