import { useState, useRef } from 'react';
import axios from 'axios';

// Define the API URL based on environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-api-url.com';

export default function Home() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // Check if file is an image
    if (!selectedFile.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    setFile(selectedFile);
    setError('');
    setResult(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.match('image.*')) {
      setFile(droppedFile);
      setError('');
      setResult(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(droppedFile);
    } else {
      setError('Please drop an image file (JPEG, PNG, etc.)');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select an image to upload');
      return;
    }
    
    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await axios.post(`${API_URL}/api/prediction/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setResult(response.data.prediction);
        // Scroll to results
        document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        setError(response.data.error || 'An error occurred during processing');
      }
    } catch (err) {
      setError(`Error: ${err.response?.data?.error || err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview('');
    setResult(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg mb-8 shadow-md text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Diabetic Foot Ulcer Classification</h1>
          <p className="text-lg opacity-90">Upload an image to classify the grade and get precautions</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <section className="card">
            <h2 className="text-xl font-bold text-dark border-b border-gray-200 pb-3 mb-5">Upload Image</h2>
            
            {error && (
              <div className="alert alert-danger mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div 
                className="upload-area"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <i className="fas fa-cloud-upload-alt text-4xl text-primary mb-3"></i>
                <p>Drag & Drop your image here</p>
                <p>OR</p>
                <button type="button" className="btn mt-2">Choose File</button>
                <p className="text-sm text-gray-500 mt-2">Supported formats: JPEG, PNG, JPG</p>
              </div>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*" 
                className="hidden" 
              />
              
              {preview && (
                <div className="mt-5 text-center">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-md" 
                  />
                </div>
              )}
              
              <div className="mt-5 space-y-3">
                <button 
                  type="submit" 
                  className="btn btn-full"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Classify Image'}
                </button>
                <button 
                  type="button" 
                  onClick={handleReset}
                  className="btn btn-full btn-danger"
                >
                  Reset
                </button>
              </div>
            </form>
          </section>

          {/* Results Section */}
          <section id="result-section" className="card">
            <h2 className="text-xl font-bold text-dark border-b border-gray-200 pb-3 mb-5">Classification Results</h2>
            
            {loading && <div className="loader"></div>}
            
            {result ? (
              <div className="result-container">
                <div className="flex items-center mb-5">
                  <div className={`text-2xl font-bold mr-3 grade-${result.grade.split('_')[1]}`}>
                    {result.grade.replace('_', ' ')}
                  </div>
                  <div className="bg-gray-200 px-3 py-1 rounded-full text-sm">
                    {result.confidence.toFixed(2)}% Confidence
                  </div>
                </div>
                
                <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-primary mb-5">
                  {result.description}
                </div>
                
                <h3 className="text-lg font-semibold text-dark mb-3">Recommended Precautions:</h3>
                <ul className="space-y-2">
                  {result.precautions.map((precaution, index) => (
                    <li key={index} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                      <span className="text-secondary mr-2">•</span>
                      {precaution}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-10">
                <i className="fas fa-upload text-4xl mb-3"></i>
                <p>Upload an image to see classification results</p>
              </div>
            )}
          </section>
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Diabetic Foot Ulcer Classification System &copy; 2025</p>
        </footer>
      </div>
    </div>
  );
}
