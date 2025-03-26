import React, { useState, ChangeEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";

const EditDocument: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [file, setFile] = useState<File | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    if (!file) {
      setUpdateStatus("Please select a file to update");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.put(`http://localhost:4002/api/documents/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUpdateStatus("File updated successfully!");
      setFile(null);
    } catch (error) {
      console.error("Error updating document:", error);
      setUpdateStatus("Failed to update file");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Document</h2>
      <div className="mb-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="w-full p-2 border rounded"
        />
      </div>
      <button 
        onClick={handleUpdate} 
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Update
      </button>
      {updateStatus && (
        <div className={`mt-4 text-center ${updateStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {updateStatus}
        </div>
      )}
    </div>
  );
};

export default EditDocument;