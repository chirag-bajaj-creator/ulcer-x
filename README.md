<!DOCTYPE html>
<html>
<head>
  
</head>
<body>

<h1 align="center">🦶 Ulcer X</h1>
<p align="center"><strong>Deep Learning & Explainable AI for Diabetic Foot Ulcer (DFU) Classification</strong></p>

<p align="center">
  <span class="badge blue">Model: DenseNet121 | InceptionV3 | EfficientNetV2-L</span>
  <span class="badge green">XAI: GradCAM</span>
  <span class="badge yellow">License: MIT</span>
</p>

<hr>

<h2>🧠 Overview</h2>
<div class="highlight">
  Ulcer X is a CNN-based DFU classification system trained on medical image data and enhanced with Explainable AI using Grad-CAM. It assists healthcare professionals in identifying Wagner Grades (0–5) from foot ulcer images.
</div>

<h2>📌 Features</h2>
<ul>
  <li>✅ Multi-class classification (Grades 0–5)</li>
  <li>🔍 Explainability via Grad-CAM</li>
  <li>🔁 Transfer learning with multiple CNNs</li>
  <li>📊 Real-time prediction visualization</li>
</ul>

<h2>📂 Dataset</h2>
<ul>
  <li><strong>Source:</strong> DFUC2021 Official Dataset</li>
  <li><strong>Structure:</strong> <code>Grade_0/</code> to <code>Grade_5/</code> folder split</li>
  <li><strong>Preprocessing:</strong> CLAHE, Resize to 224x224 or 480x480</li>
</ul>

<h2>📊 Evaluation Metrics</h2>
<table>
  <tr>
    <th>Metric</th>
    <th>Value (Avg)</th>
  </tr>
  <tr>
    <td>Accuracy</td>
    <td>77% – 85%</td>
  </tr>
  <tr>
    <td>F1-Score</td>
    <td>0.71</td>
  </tr>
  <tr>
    <td>Precision</td>
    <td>0.75</td>
  </tr>
  <tr>
    <td>Recall</td>
    <td>0.76</td>
  </tr>
</table>

<h2>🧪 Model Pipeline</h2>
<pre>
image → preprocessing (CLAHE, resizing) → CNN (EffNetV2L/Inception) →
GAP → Dense layers → Softmax output (Grades 0–5)
</pre>

<h2>🚀 How to Run</h2>
<ol>
  <li>Clone the repository:
    <pre>git clone https://github.com/yourusername/ulcer-x.git</pre>
  </li>
  <li>Install requirements:
    <pre>pip install -r requirements.txt</pre>
  </li>
  <li>Launch notebook:
    <pre>jupyter notebook dfu_final.ipynb</pre>
  </li>
</ol>

<h2>📸 Demo: Grad-CAM Outputs</h2>
<table>
  <tr>
    <th>Input Image</th>
    <th>Predicted Grade</th>
    <th>Grad-CAM Overlay</th>
  </tr>
  <tr>
    <td><img src="assets/sample1.png" width="200"></td>
    <td>Grade 3</td>
    <td><img src="assets/cam1.png" width="200"></td>
  </tr>
  <tr>
    <td><img src="assets/sample2.png" width="200"></td>
    <td>Grade 1</td>
    <td><img src="assets/cam2.png" width="200"></td>
  </tr>
</table>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li>Python</li>
  <li>TensorFlow / Keras</li>
  <li>OpenCV, NumPy, Matplotlib</li>
  <li>Grad-CAM Visualization Tools</li>
</ul>

<h2>📈 Models Used</h2>
<ul>
  <li>DenseNet121</li>
  <li>InceptionV3</li>
  <li>MobileNetV3-Large</li>
  <li>EfficientNetV2-L</li>
  <li>MLP Baseline</li>
</ul>

<h2>👨‍⚕️ Use Cases</h2>
<ul>
  <li>AI-assisted diagnosis in DFU treatment</li>
  <li>Remote rural screening via mobile apps</li>
  <li>Clinical decision support tool</li>
</ul>

<h2>📜 License</h2>
<p>MIT License. See <code>LICENSE</code> file for more information.</p>

<h2>🤝 Credits</h2>
<ul>
  <li>DFUC2021 Dataset Providers</li>
  <li>Grad-CAM XAI Contributors</li>
  <li>TensorFlow and Keras Teams</li>
</ul>


<h2>⭐ Show Support</h2>
<p>If you found this project helpful, give it a ⭐ and share it!</p>

</body>
</html>
