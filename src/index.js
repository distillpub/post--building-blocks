import ExamplePicker from './diagrams/ExamplePicker.html';
import NeuronVis from './diagrams/NeuronVis.html';
import ActivationVis from './diagrams/ActivationVis.html';
import AllActivationGrids from './diagrams/AllActivationGrids.html';
// import AttributionNeurons from './diagrams/AttributionNeurons.html';
// import AttributionSpatial from './diagrams/AttributionSpatial.html';
import AttributionSpatialHidden from './diagrams/AttributionSpatialHidden.html';

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

const attrSpatialHidden = new AttributionSpatialHidden({
  target: document.getElementById('AttributionSpatialHidden')
});

// Wire components together.
exPick.observe('selected', (example) => {
  neuronVis.set({example});
  actVis.set({example});
  actGrid.set({example});
  actGridMag.set({example});
  // attrNeurons.set({ example });
  // attrSpatial.set({example});
  attrSpatialHidden.set({example});
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