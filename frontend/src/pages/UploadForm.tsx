import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
// Removed incorrect import
interface DocumentResponse {
  _id: string;
}

function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const navigate = useNavigate();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // First upload to documents
      const documentResponse: AxiosResponse<DocumentResponse> = await axios.post(
        "http://localhost:4002/api/documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Second upload to versions
      await axios.post(
        `http://localhost:4002/app/version/${documentResponse.data._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploadStatus("File uploaded successfully!");
      console.log("Document ID:", documentResponse.data._id);
      navigate('/documents')
    } catch (error) {
      setUploadStatus("File upload failed!");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex bg-blue-400/25 min-h-screen r">
      <form onSubmit={handleUpload} className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl mb-4 text-center">Upload a Document</h2>
        <div className="mb-4">
          <input 
            type="file" 
            onChange={handleFileChange} 
            className="w-full p-2 border rounded"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Upload
        </button>
        {uploadStatus && (
          <div className={`mt-4 text-center ${uploadStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}`}>
            {uploadStatus}
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadForm;