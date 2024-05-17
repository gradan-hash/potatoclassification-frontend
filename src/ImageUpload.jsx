import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Dropped file:", acceptedFiles[0]);
    setFile(acceptedFiles[0]); // Set the file object
    setImageUrl(URL.createObjectURL(acceptedFiles[0])); // Create and set the URL for display
    setPrediction(null);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handlePredict = async () => {
    if (!file) return;
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/predict",
        formData
      );
      setPrediction(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error making prediction:", error);
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        width: "100%", // Full width
        backgroundColor: "#f4f4f4", // Light background color
      }}>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed green",
          padding: "20px",
          cursor: "pointer",
          width: "50%", // Responsive width
          maxWidth: "600px", // Max width for larger screens
        }}>
        <input {...getInputProps()} />
        <p
          style={{
            color: "black", // Max width for image
          }}>
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      {imageUrl && (
        <div
          style={{
            marginTop: "20px",
            width: "50%", // Responsive width
            maxWidth: "600px", // Max width for image
          }}>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }} // Responsive and cover fit
          />
          <button
            onClick={handlePredict}
            style={{
              display: "block",
              width: "100%",
              padding: "10px 20px",
              margin: "10px auto",
            }}>
            Predict
          </button>
        </div>
      )}
      {isLoading && <p>Loading...</p>}
      {prediction && (
        <div
          style={{
            width: "50%",
            maxWidth: "600px",
            textAlign: "center",
            color: "black",
          }}>
          <p>Image Class_Name: {prediction.class}</p>
          <p>Confidence: {prediction.confidence.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
