from transformers import DonutProcessor, VisionEncoderDecoderModel
import torch
from PIL import Image
import convert_to_onnx


# Load pretrained model
model_name = "naver-clova-ix/donut-base-finetuned-docvqa"
model = VisionEncoderDecoderModel.from_pretrained(model_name)
processor = DonutProcessor.from_pretrained(model_name)
model.eval()

# create a dummy input (or use actual image)
dummy_input = torch.randn(1, 3, 256, 256)  # Example input shape for a vision model


# Export the encoder
onnx_filename = "onnx/donut_encoder.onnx"
torch.onnx.export(
    model.encoder,
    dummy_input,
    onnx-filename,
    input_names=[ "pixel_values"],
    output_names=["Last_hidden_state"],
    dynamic_axes={"pixel_values": {0: "batch_size"}, "last_hidden_state": {0: "batch_size"}},
    opset_version=14,
    do_constant_folding=True, 
)

print(f"✅ Model exported as {onnx_filename}")