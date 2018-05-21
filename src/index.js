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

import {json as loadJSON} from 'd3-request';
import {json as fetchJSON, buffer as fetchBuffer} from 'd3-fetch';
import {min, max} from 'd3';
import {fromArrayBuffer} from 'numpy-parser';
import {default as ndarray} from 'ndarray';

import {Store} from 'svelte/store.js';

import Loading from './diagrams/Loading.html';
import Teaser from './diagrams/Teaser.html';
import Atoms from './diagrams/Atoms.html';
import ExamplePicker from './diagrams/ExamplePicker.html';
import StickyPicker from './diagrams/StickyPicker.html';
import SemanticDict from './diagrams/SemanticDict.html';
import ActivationVecVis from './diagrams/ActivationVecVis.html';
import ActivationGrid from './diagrams/ActivationGridSingle.html';
import AllActivationGrids from './diagrams/AllActivationGrids.html';
import AttributionSpatial from './diagrams/AttributionSpatial.html';
import AttributionChannel from './diagrams/AttributionChannel.html';
import ActivationGroups from './diagrams/ActivationGroups.html';
import AttributionGroups from './diagrams/AttributionGroups.html';
import Grammar from './diagrams/Grammar.html';
import CubeGroups from './diagrams/CubeGroups.html';
import CubeNatural from './diagrams/CubeNatural.html';


const store = window.store = new Store({
  example: 'dog_cat',
  activation_zoom: 1,
  labels: require('../static/examples/labels.json')
});


initialize(
  'Teaser', 
  Teaser,
  store, 
  function(example) {
    return [
      fetchBuffer(`examples/npy/${example}_teaser.npy`), 
      fetchJSON(`examples/attributions/${example}/teaser.json`)
    ];
  },
  function(values) {
    const full_attr_raw = fromArrayBuffer(values[0]);
    const full_attr = ndarray(full_attr_raw.data, full_attr_raw.shape);
    const attr_data = values[1];
    const selected_classes = attr_data.classes.slice(0, 2);
    return {
      full_attr,
      attr_data,
      left_selected_class: attr_data.classes[0],
      right_selected_class: attr_data.classes[1]
    }
  }
)

const stickyPicker = new StickyPicker({
  target: document.getElementById('StickyPicker'),
  store
});

const semanticDict = new SemanticDict({
  target: document.getElementById('SemanticDict'),
  store
});

const actVis = new ActivationVecVis({
  target: document.getElementById('ActivationVecVis'),
  store
});

const actGridSingle = new ActivationGrid({
  target: document.getElementById('ActivationGridSingle'),
  data: {
    magnitude: false,
    layer: "mixed4d",
    layer_size: 700,
    show_zoom: false
  },
  store
});

const actGrid = new AllActivationGrids({
  target: document.getElementById('AllActivationGrids'),
  data: { controls: true },
  store
});

const actGridMag = new AllActivationGrids({
  target: document.getElementById('AllActivationGridsMagnitude'),
  data: {magnitude: true},
  store
});

actGrid.observe('center', center => actGridMag.set({ center }))
actGridMag.observe('center', center => actGrid.set({ center }))
actGrid.observe('zoom', zoom => actGridMag.set({ zoom }))
actGridMag.observe('zoom', zoom => actGrid.set({ zoom }))


initialize(
  'AttributionSpatial',
  AttributionSpatial,
  store,
  example => [fetchJSON(`examples/attributions/${example}/spatial_attr.json`)],
  values => ({ attr_data: values[0]})
);


initialize(
  'AttributionChannel',
  AttributionChannel,
  store,
  function(example) {
    return [fetchJSON(`examples/attributions/${example}/channel_attr.json`)]
  },
  function(values) {
    return {
      attr_data: values[0],
      selected: 'output', 
      prev_selected: 'output'
    }
  }
);

initializeGroups();

// initialize(
//   'ActivationGroups',
//   ActivationGroups,
//   store,
//   function (example) {
//     return [
//       fetchJSON(`examples/activations/${example}/mixed4d_nmf.json`),
//       fetchBuffer(`examples/npy/${example}_mixed4d_nmf.npy`)
//     ];
//   },
//     function (values) {
//   const attr_raw = fromArrayBuffer(values[1]);
//   const attr = ndarray(attr_raw.data, attr_raw.shape);
//     return {
//       groups: values[0],
//       attr
//     };
//   }
// );


// initialize(
//   'AttributionGroups',
//   AttributionGroups,
//   store,
//   function (example) {
//     return [
//       fetchJSON(`examples/groups/${example}/info.json`)
//     ];
//   },
//   function (values) {
//     return {
//       full_data: values[0]
//     };
//   }
// );

const atoms = new Atoms({
  target: document.getElementById('Atoms'),
  store
});

const grammar = new Grammar({
  target: document.getElementById('Grammar'),
  store
});

const cubeGroups = new CubeGroups({
  target: document.getElementById('CubeGroups'),
  store
});

const cubeNatural = new CubeNatural({
  target: document.getElementById('CubeNatural'),
  store
});

// Initializes a component with custom fetchers for data
function initialize(id, component, store, promisesGenerator, parse) {
  const el = document.getElementById(id);
  const loader = new Loading({target: el});
  let instance = null;
  el.addEventListener('ready', () => {
    store.observe('example', example => {
      Promise.all(promisesGenerator(example))
      .then(values => {
          loader.set({loaded: true});
          const data = parse(values, example);
          data.loaded = true;
          if (instance != null) {
            instance.set(data)
            if (instance.measure) {
              instance.measure();
            }
          } else {
            instance = new component({
              target: el,
              data,
              store
            })
            if (instance.measure) {
              instance.measure();
            }
          }
        })
        .catch(reason => {
          loader.set({message: reason})
        });
    })
  })
}

function initializeGroups() {
  const numComponents = 2;
  const cmpts = [ActivationGroups, AttributionGroups];
  const els = [
    document.getElementById('ActivationGroups'),
    document.getElementById('AttributionGroups')
  ];
  const sprite_urls = [
    'sprite_mixed4a_dream_overlay_vlight',
    'sprite_mixed4a_icon',
    'sprite_mixed4d_dream_overlay_vlight',
    'sprite_mixed4d_icon'
  ];
  
  let groupsInitialized = false;
  const instances = [null, null];
  const sprite_instances = [];

  function preload_sprites() {
    const example = store.get('example');
    sprite_instances.splice(0);
    for (const url of sprite_urls) {
      const img = new Image();
      img.src = `examples/groups/${example}/${url}.jpeg`;
      sprite_instances.push(img);
    }
  }

  els.forEach((el) => {
    el.addEventListener('ready', () => {
      // Only add one store observer to coordinate the two diagrams.
      if (groupsInitialized) return;  

      store.observe('example', (example) => {
        Promise.all([
          fetchJSON(`examples/groups/${example}/info.json`),
          fetchBuffer(`examples/npy/${example}_mixed4d_nmf.npy`)
        ]).then((values) => {
          const all_groups_attr = values[0];
          const mixed4d_raw = fromArrayBuffer(values[1]);
          const all_groups_mixed4d = ndarray(mixed4d_raw.data, mixed4d_raw.shape);

          store.set({
            all_groups_attr, 
            all_groups_mixed4d, 
            groups_align: true,

            num_4a: all_groups_attr.default[0],
            num_4d: all_groups_attr.default[1],
            card_4a: all_groups_attr.num_4a.length,
            card_4d: all_groups_attr.num_4d.length,
            min_4a: min(all_groups_attr.num_4a),
            min_4d: min(all_groups_attr.num_4d),
            max_4a: max(all_groups_attr.num_4a),
            max_4d: max(all_groups_attr.num_4d)
          });

          for (let i = 0; i < cmpts.length; i++) {
            if (instances[i] === null) instances[i] = new cmpts[i]({target: els[i], store});
            if (instances[i].measure)  instances[i].measure();
          }

          preload_sprites();
        });
      });

      store.observe('num_4a', preload_sprites);
      store.observe('num_4d', preload_sprites);

      store.compute(
        'idx_4a', 
        ['all_groups_attr', 'num_4a'], 
        (all_groups_attr, num_4a) => all_groups_attr && all_groups_attr.num_4a.indexOf(num_4a)
      );

      store.compute(
        'idx_4d',
        ['all_groups_attr', 'num_4d'],
        (all_groups_attr, num_4d) => all_groups_attr && all_groups_attr.num_4d.indexOf(num_4d)
      );

      store.compute(
        'groups_sprite_x',
        ['groups_align'],
        (groups_align) => groups_align === true ? 1 : 0
      );

      store.compute(
        'groups_sprite_y',
        ['idx_4a', 'idx_4d', 'card_4d'],
        (idx_4a, idx_4d, card_4d) => (idx_4a * card_4d) + idx_4d
      );

      store.compute(
        'groups_attr',
        ['all_groups_attr', 'card_4a', 'card_4d', 
          'groups_sprite_x', 'groups_sprite_y'],
        (all_groups_attr, card_4a, card_4d, 
          groups_sprite_x, groups_sprite_y) => {
            return all_groups_attr && all_groups_attr.data[(groups_sprite_x * card_4a * card_4d) + groups_sprite_y];
          }
      );

      groupsInitialized = true;
    });
  });
}