import ExamplePicker from './diagrams/ExamplePicker.html';
import NeuronVis from './diagrams/NeuronVis.html';
import ActivationVis from './diagrams/ActivationVis.html';
import ActivationGrid from './diagrams/ActivationGrid.html';

const exPick = new ExamplePicker({
  target: document.getElementById('ExamplePicker')
});

const neuronVis = new NeuronVis({
  target: document.getElementById('NeuronVis')
});

const actVis = new ActivationVis({
  target: document.getElementById('ActivationVis')
});

const actGrid = new ActivationGrid({
  target: document.getElementById('ActivationGrid')
});

const actGridMag = new ActivationGrid({
  target: document.getElementById('ActivationGridMagnitude'),
  data: {magnitude: true}
});

// Wire components together.
exPick.observe('selected', (example) => {
  neuronVis.set({example});
  actVis.set({example});
  actGrid.set({example});
  actGridMag.set({example});
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