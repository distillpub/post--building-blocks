import {format} from 'd3-format';

export function range(n){
  return Array(n).fill().map((_, i) => i);
}

export function calc_layer_size(container, num_layers) {
  const MARGIN = 20;
  const NUM_LAYERS = num_layers;
  return !container ? 0 :
    (container.getBoundingClientRect().width / NUM_LAYERS) - MARGIN;
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

const fmt1f = format('.1f'),
  fmt2r = format('.2r'),
  fmt3r = format('.3r');

export function fmtAct(num) {
  return num == 0 ? 0 :
    num < 1 ? fmt2r(num) :
    num < 10 ? fmt3r(num) : fmt1f(num);
}