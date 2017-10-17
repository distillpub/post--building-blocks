import ExamplePicker from './diagrams/ExamplePicker.html';
import VectorExplain from './diagrams/VectorExplain.html';

const exPick = new ExamplePicker({
  target: document.getElementById('ExamplePicker')
});

const vecExpl = new VectorExplain({
  target: document.getElementById('VectorExplain')
})

// Wire components together.
exPick.observe('selected', (selected) => {
  vecExpl.set({example: selected});
});

exPick.observe('act', (act) => {
  vecExpl.set({activation: act})
});

exPick.observe('max_act', (max_act) => {
  vecExpl.set({max_act})
});