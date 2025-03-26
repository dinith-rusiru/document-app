import React from "react";
import { Link } from "react-router-dom";

interface DocumentItemProps {
  doc: {
    _id: string;
    filename: string;
    version: string;
  };
  onDelete: (id: string) => void;
}

const DocumentItem: React.FC<DocumentItemProps> = ({ doc, onDelete }) => {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-sm mb-4 bg-white hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{doc.filename}</h3>
      <p className="text-sm text-gray-600 mb-4">Version: {doc.version}</p>
      <div className="flex space-x-4">
        <Link 
          to={`/edit/${doc._id}`} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Edit
        </Link>
        <button 
          onClick={() => onDelete(doc._id)} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
        <Link 
          to={`/version/${doc._id}`} 
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Create New Version
        </Link>
      </div>
    </div>
  );
};

export default DocumentItem;
