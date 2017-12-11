import ExamplePicker from './diagrams/ExamplePicker.html';
import NeuronVis from './diagrams/NeuronVis.html';
import ActivationVis from './diagrams/ActivationVis.html';
import AllActivationGrids from './diagrams/AllActivationGrids.html';
import AttributionSpatial from './diagrams/AttributionSpatial.html';
import AttributionChannel from './diagrams/AttributionChannel.html';

const exPick = new ExamplePicker({
  target: document.getElementById('ExamplePicker')
});

const neuronVis = new NeuronVis({
  target: document.getElementById('NeuronVis')
});

const actVis = new ActivationVis({
  target: document.getElementById('ActivationVis')
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
exPick.observe('selected', (example) => {
  neuronVis.set({example});
  actVis.set({example});
  actGrid.set({example});
  actGridMag.set({example});
  attrSpatial.set({example});
  attrChannel.set({example});
});

neuronVis.observe('pos', (pos) => {
  actVis.set({pos});
});

neuronVis.observe('present_vector', (present_vector) => {
  actVis.set({present_vector});
});

actGrid.observe('pos_hover', (pos_hover) => {
  actGridMag.set({pos_hover});
});

actGridMag.observe('pos_hover', (pos_hover) => {
  actGrid.set({pos_hover});
});