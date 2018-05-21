// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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