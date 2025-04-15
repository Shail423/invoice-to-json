
export async function preprocessImage(imageBitmap) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0, 256, 256);
  const { data } = ctx.getImageData(0, 0, 256, 256);

  const floatData = new Float32Array(1 * 3 * 256 * 256);
  for (let i = 0; i < 256 * 256; i++) {
    floatData[i] = data[i * 4] / 255; // R
    floatData[i + 256 * 256] = data[i * 4 + 1] / 255; // G
    floatData[i + 2 * 256 * 256] = data[i * 4 + 2] / 255; // B
  }

  return new ort.Tensor('float32', floatData, [1, 3, 256, 256]);
}
