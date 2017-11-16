export const INIT_EXAMPLE = 'dog_cat';

export function range(n){
  return Array(n).fill().map((_, i) => i);
}

export function present_vector (pos, activation) {
  return !activation ? [] :
    range(activation.shape[3]).map(n => activation.get(0, pos[1], pos[0], n));
}

export const asc  = (a, b) => a - b;
export const desc = (a, b) => b - a;

export function tops (vec, cmp) {
  const sorted_ns = range(vec.length)
    .sort((a, b) => (cmp || desc)(vec[a], vec[b]));
  return sorted_ns.slice(0, 5).map((n) => [n, vec[n]]);
}