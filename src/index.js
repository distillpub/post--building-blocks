
import VectorExplain from "./diagrams/VectorExplain.html";

import activation_loader from "./mixed4d.npy";

activation_loader.load((activations) => {
  new VectorExplain({target: document.getElementById("VectorExplain"), data: {activations: activations}});
  console.log("activations", activations);
})
