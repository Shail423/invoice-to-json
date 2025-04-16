
import { preprocessImage } from './utils/preprocess.js';
import { postprocessOutput } from './utils/postprocess.js';

const fileInput = document.getElementById('fileInput'); // ✅ correct
;
const jsonOutput = document.getElementById('jsonOutput');

let session;
(async () => {
  session = await ort.InferenceSession.create(
    'https://github.com/Shail423/invoice-to-json/releases/download/v1.0/donut_encoder.onnx'
  );
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

fileInput.addEventListener('change', async (e) => {
  if (!session) {
    console.error("❌ session not loaded yet.");
    jsonOutput.textContent = "⚠️ Model not ready. Please wait...";
    return;
  }

  const file = e.target.files[0];
  if (!file) return;

  const imageBitmap = await createImageBitmap(file);
  console.log("📸 Image loaded:", file.name);

  const tensor = await preprocessImage(imageBitmap);
  console.log("🧠 Tensor:", tensor);

  try {
    const feeds = { 'pixel_values': tensor };
    const results = await session.run(feeds);

    console.log("✅ Raw model output:", results);

    const output = postprocessOutput(results);
    console.log("📄 Final JSON output:", output);

    jsonOutput.textContent = JSON.stringify(output, null, 2);
  } catch (err) {
    console.error("❌ Inference Error:", err);
    jsonOutput.textContent = "❌ Error processing the image. See console.";
  }
});

