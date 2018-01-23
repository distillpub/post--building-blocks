import {json as loadJSON} from 'd3-request';

import Teaser from './diagrams/Teaser.html';
import ActivationCube from './diagrams/ActivationCube.html';
import ExamplePicker from './diagrams/ExamplePicker.html';
import SemanticDict from './diagrams/SemanticDict.html';
import ActivationVecVis from './diagrams/ActivationVecVis.html';
import AllActivationGrids from './diagrams/AllActivationGrids.html';
import AttributionSpatial from './diagrams/AttributionSpatial.html';
import AttributionChannel from './diagrams/AttributionChannel.html';
import AttributionGroups from './diagrams/AttributionGroups.html';

const example = 'dog_cat';

const teaser = window.teaserFig = new Teaser({
  target: document.getElementById('Teaser'),
  data: {example}
});

const actCube = new ActivationCube({
  target: document.getElementById('ActivationCube')
});

const exPick = new ExamplePicker({
  target: document.getElementById('ExamplePicker'),
  data: {example}
});

const semanticDict = new SemanticDict({
  target: document.getElementById('SemanticDict'),
  data: {example}
});

const actVis = new ActivationVecVis({
  target: document.getElementById('ActivationVecVis'),
  data: {example}
});

const actGrid = new AllActivationGrids({
  target: document.getElementById('AllActivationGrids'),
  data: {example}
});

const actGridMag = new AllActivationGrids({
  target: document.getElementById('AllActivationGridsMagnitude'),
  data: {magnitude: true, example}
});

const attrSpatial = new AttributionSpatial({
  target: document.getElementById('AttributionSpatial'),
  data: {example}
});

const attrChannel = new AttributionChannel({
  target: document.getElementById('AttributionChannel'),
  data: {example}
});

const attrGroups = new AttributionGroups({
  target: document.getElementById('AttributionGroups'),
  data: {example}
})

// Wire components together.
function syncExample (example) {
  [semanticDict, actVis, actGrid, actGridMag,
    attrSpatial, attrChannel, attrGroups]
      .forEach(diagram => diagram.set({example}));
}

exPick.observe('example', syncExample);

loadJSON('examples/labels.json', (err, labels) => {
  [teaser, attrSpatial, attrChannel, attrGroups].forEach((diagram) => diagram.set({labels}));
});

semanticDict.observe('pos', (pos) => actVis.set({pos}));
actVis.observe('pos', (pos) => semanticDict.set({pos}));

actGrid.observe('pos_hover', (pos_hover) => actGridMag.set({pos_hover}));
actGridMag.observe('pos_hover', (pos_hover) => actGrid.set({pos_hover}));