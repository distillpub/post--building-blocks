import {json as loadJSON} from 'd3-request';
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

const store = window.store = new Store({example: 'dog_cat'});
loadJSON('examples/labels.json', (err, labels) => store.set({labels}));

const teaser = window.teaserFig = new Teaser({
  target: document.getElementById('Teaser'),
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

const actGrid = new AllActivationGrids({
  target: document.getElementById('AllActivationGrids'),
  store
});

const actGridMag = new AllActivationGrids({
  target: document.getElementById('AllActivationGridsMagnitude'),
  data: {magnitude: true},
  store
});

const attrSpatial = new AttributionSpatial({
  target: document.getElementById('AttributionSpatial'),
  store
});

const attrChannel = new AttributionChannel({
  target: document.getElementById('AttributionChannel'),
  store
});

let actGroups = null;
document.getElementById('ActivationGroups')
  .addEventListener('ready', () => {
    store.observe('example', (ex) => {
      loadJSON(`examples/activations/${ex}/mixed4d_nmf.json`, (err, groups) => {
        if (!actGroups) {
          actGroups = new ActivationGroups({
            target: document.getElementById('ActivationGroups'),
            data: {groups},
            store
          });
        } else {
          actGroups.set({groups});
        }
      });
    });
  });

const attrGroups = new AttributionGroups({
  target: document.getElementById('AttributionGroups'),
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
