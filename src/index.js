import ExamplePicker from './diagrams/ExamplePicker.html';
import NeuronVis from './diagrams/NeuronVis.html';
import ActivationVis from './diagrams/ActivationVis.html';
import ActivationGrid from './diagrams/ActivationGrid.html';

const exPick = new ExamplePicker({
  target: document.getElementById('ExamplePicker')
});

const vecExpl = new NeuronVis({
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
  vecExpl.set({example});
  actVis.set({example});
  actGrid.set({example});
  actGridMag.set({example});
});

exPick.observe('act', (act) => {
  vecExpl.set({activation: act})
});

exPick.observe('max_act', (max_act) => {
  vecExpl.set({max_act});
  actVis.set({max_act});
});

vecExpl.observe('pos', (pos) => {
  actVis.set({pos});
});

vecExpl.observe('present_vector', (present_vector) => {
  actVis.set({present_vector});
});

actGrid.observe('pos_hover', (pos_hover) => {
  actGridMag.set({pos_hover});
});

actGridMag.observe('pos_hover', (pos_hover) => {
  actGrid.set({pos_hover});
});