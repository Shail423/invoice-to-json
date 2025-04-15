
import { preprocessImage } from './utils/preprocess.js';
import { postprocessOutput } from './utils/postprocess.js';

const fileInput = document.getElementById('fileInput');
const jsonOutput = document.getElementById('jsonOutput');

let session;
(async () => {
  session = await ort.InferenceSession.create('models/donut_encoder.onnx');
})();

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const imageBitmap = await createImageBitmap(file);
  const tensor = await preprocessImage(imageBitmap);

  const feeds = { 'pixel_values': tensor };
  const results = await session.run(feeds);

  const output = postprocessOutput(results);
  jsonOutput.textContent = JSON.stringify(output, null, 2);
});
