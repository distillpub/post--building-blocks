import examples from '../static/examples';
import VectorExplain from './diagrams/VectorExplain.html';

let loadedVE = false;
let activations = {};

examples.forEach((ex) => {
  require(`../static/examples/${ex}_mixed4d.npy`).load((act) => {
    activations[ex] = act;
    if (!loadedVE && act.shape) {
      new VectorExplain({
        target: document.getElementById("VectorExplain"),
        data: {
          examples: examples,
          selected: examples[0],
          activations: activations
        }
      });
      loadedVE = true;
    }
  });
});