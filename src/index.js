import ExamplePicker from './diagrams/ExamplePicker.html';
import VectorExplain from './diagrams/VectorExplain.html';
import ActivationVecExplain from './diagrams/ActivationVecExplain.html';

const exPick = new ExamplePicker({
  target: document.getElementById('ExamplePicker')
});

const vecExpl = new VectorExplain({
  target: document.getElementById('VectorExplain')
});

const actVis = new ActivationVecExplain({
  target: document.getElementById('ActivationVecExplain')
});

// Wire components together.
exPick.observe('selected', (example) => {
  vecExpl.set({example});
  actVis.set({example});
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