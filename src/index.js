import {json as loadJSON} from 'd3-request';
import {Store} from 'svelte/store.js';

import Teaser from './diagrams/Teaser.html';
import ExamplePicker from './diagrams/ExamplePicker.html';
import SemanticDict from './diagrams/SemanticDict.html';
import ActivationVecVis from './diagrams/ActivationVecVis.html';
import AllActivationGrids from './diagrams/AllActivationGrids.html';
import AttributionSpatial from './diagrams/AttributionSpatial.html';
import AttributionChannel from './diagrams/AttributionChannel.html';
import AttributionGroups from './diagrams/AttributionGroups.html';
import Grammar from './diagrams/Grammar.html';

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

const attrGroups = new AttributionGroups({
  target: document.getElementById('AttributionGroups'),
  store
});

const grammar = new Grammar({
  target: document.getElementById('Grammar'),
  store
});