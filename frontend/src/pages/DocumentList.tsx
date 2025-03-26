import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import DocumentItem from "../components/DocumentItem";

// Define interface for Document structure
interface Document {
  _id: string;
  filename: string;
  content?: string;
  version?: number;
  createdAt?: string;
  // Add other relevant fields as needed
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents from backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response: AxiosResponse<Document[]> = await axios.get(
          "http://localhost:4002/api/documents"
        );
        setDocuments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching documents", error);
        setError("Failed to fetch documents");
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Handle document deletion
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4002/api/documents/${id}`);
      setDocuments(documents.filter((doc) => doc._id !== id));
    } catch (error) {
      console.error("Error deleting document", error);
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading documents...</div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div className="text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-w-full flex min-h-screen bg-blue-400/30 container mx-auto px-4 py-8">
      <div><h2 className="text-2xl font-bold p-6">Document List</h2></div>
      {documents.length === 0 ? (
        <div className="text-center text-gray-500">No documents found</div>
      ) : (
        <div className="grid gap-4">
          {documents.map((doc) => (
            <DocumentItem 
              key={doc._id} 
              doc={doc} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentList;