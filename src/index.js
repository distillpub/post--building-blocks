import ActivationCube from './diagrams/ActivationCube.html';
import ExamplePicker from './diagrams/ExamplePicker.html';
import SemanticDict from './diagrams/SemanticDict.html';
import ActivationVecVis from './diagrams/ActivationVecVis.html';
import AllActivationGrids from './diagrams/AllActivationGrids.html';
import AttributionSpatial from './diagrams/AttributionSpatial.html';
import AttributionChannel from './diagrams/AttributionChannel.html';

const actCube = new ActivationCube({
  target: document.getElementById('ActivationCube')
});

const exPick = new ExamplePicker({
  target: document.getElementById('ExamplePicker')
});

const semanticDict = new SemanticDict({
  target: document.getElementById('SemanticDict')
});

const actVis = new ActivationVecVis({
  target: document.getElementById('ActivationVecVis')
});

const actGrid = new AllActivationGrids({
  target: document.getElementById('AllActivationGrids')
});

const actGridMag = new AllActivationGrids({
  target: document.getElementById('AllActivationGridsMagnitude'),
  data: {magnitude: true}
});

const attrSpatial = new AttributionSpatial({
  target: document.getElementById('AttributionSpatial')
});

const attrChannel = new AttributionChannel({
  target: document.getElementById('AttributionChannel')
});

// Wire components together.
exPick.observe('selected', (example) => [semanticDict, actVis, actGrid, actGridMag,
  attrSpatial, attrChannel].forEach((diagram) => diagram.set({example})));

semanticDict.observe('pos', (pos) => actVis.set({pos}));
actVis.observe('pos', (pos) => semanticDict.set({pos}));

actGrid.observe('pos_hover', (pos_hover) => actGridMag.set({pos_hover}));
actGridMag.observe('pos_hover', (pos_hover) => actGrid.set({pos_hover}));