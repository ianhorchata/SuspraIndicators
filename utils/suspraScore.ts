export default function(scores: Map<string, number>) {
  return (scores.get('community') ?? 0)
    + (scores.get('food') ?? 0);
}
