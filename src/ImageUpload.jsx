import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    setFile(URL.createObjectURL(acceptedFiles[0]));
    setPrediction(null); // Reset prediction state
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handlePredict = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setPrediction(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error making prediction:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: '2px dashed green', padding: '20px', cursor: 'pointer' }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      {file && (
        <div>
          <img src={file} alt="Uploaded" style={{ width: '100%', marginTop: '20px' }} />
          <button onClick={handlePredict} style={{ margin: '10px', padding: '10px 20px' }}>Predict</button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {prediction && (
        <div>
          <p>Class: {prediction.class}</p>
          <p>Confidence: {prediction.confidence.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
