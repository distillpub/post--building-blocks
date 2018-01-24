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

export const asc  = (a, b) => a - b;
export const desc = (a, b) => b - a;

const fmt1f = format('.1f'),
  fmt2r = format('.2r'),
  fmt3r = format('.3r');

export function fmtAct(num) {
  return num == 0 ? 0 :
    num < 1 ? fmt2r(num) :
    num < 10 ? fmt3r(num) : fmt1f(num);
}