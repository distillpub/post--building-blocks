import {json as loadJSON} from 'd3-request';
import {json as fetchJSON, buffer as fetchBuffer} from 'd3-fetch';
import {fromArrayBuffer} from 'numpy-parser';
import {default as ndarray} from 'ndarray';

import {Store} from 'svelte/store.js';

import Teaser from './diagrams/Teaser.html';
import ExamplePicker from './diagrams/ExamplePicker.html';
import SemanticDict from './diagrams/SemanticDict.html';
import ActivationVecVis from './diagrams/ActivationVecVis.html';
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


const semanticDict = new SemanticDict({
  target: document.getElementById('SemanticDict'),
  store
});

const actVis = new ActivationVecVis({
  target: document.getElementById('ActivationVecVis'),
  store
});

const actGrid = new AllActivationGrids({
  target: document.getElementById('AllActivationGrids'),
  store
});

const actGridMag = new AllActivationGrids({
  target: document.getElementById('AllActivationGridsMagnitude'),
  data: {magnitude: true},
  store
});


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


initialize(
  'ActivationGroups',
  ActivationGroups,
  store,
  function (example) {
    return [
      fetchJSON(`examples/activations/${example}/mixed4d_nmf.json`),
      fetchBuffer(`examples/npy/${example}_mixed4d_nmf.npy`)
    ];
  },
    function (values) {
  const attr_raw = fromArrayBuffer(values[1]);
  const attr = ndarray(attr_raw.data, attr_raw.shape);
    return {
      groups: values[0],
      attr
    };
  }
);


initialize(
  'AttributionGroups',
  AttributionGroups,
  store,
  function (example) {
    return [
      fetchJSON(`examples/groups/${example}/info.json`)
    ];
  },
  function (values) {
    return {
      group_data: values[0]
    };
  }
);


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
  let instance = null;
  el.addEventListener('ready', () => {
    store.observe('example', example => {
      Promise.all(promisesGenerator(example)).then(values => {
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
    })
  })
}
