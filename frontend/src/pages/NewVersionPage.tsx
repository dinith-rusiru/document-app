import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

interface Version {
  _id: string;
  filename: string;
  version: number;
  content: string;
  createdAt: string;
}

const VersionHistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [versions, setVersions] = useState<Version[]>([]);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [versionContent, setVersionContent] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response: AxiosResponse<Version[]> = await axios.get(
          `http://localhost:4002/app/versions/${id}`
        );
        setVersions(response.data);
      } catch (error) {
        console.error("Error fetching versions", error);
      }
    };

    fetchVersions();
  }, [id]);

  const handleNewVersionUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", newFile);
    formData.append("content", versionContent);

    try {
      await axios.post(
        `http://localhost:4002/app/version/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await axios.put(`http://localhost:4002/api/documents/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNewFile(null);
      setVersionContent("");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading new version or updating document", error);
      alert("Failed to upload new version or update document");
    }
  };

  const handleRestoreVersion = async (versionId: string) => {
    try {
      await axios.put(`http://localhost:4002/app/restore/${versionId}`);
      alert("Successfully restored");
    } catch (error) {
      console.error("Error restoring version", error);
      alert("Failed to restore version");
    }
  };

  const handleDelete = async (versionId: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this version?");

    if (!isConfirmed) return;

    try {
      await axios.delete(`http://localhost:4002/app/version/${versionId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting document", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewFile(e.target.files[0]);
    }
  };

  const filteredVersions = versions.filter((version) =>
    version.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Version History", 20, 20);

    filteredVersions.forEach((version, index) => {
      const yOffset = 30 + index * 20;
      doc.text(`Filename: ${version.filename}`, 20, yOffset);
      doc.text(`Version: ${version.version}`, 20, yOffset + 5);
      doc.text(`Content: ${version.content}`, 20, yOffset + 10);
      doc.text(
        `Created At: ${new Date(version.createdAt).toLocaleString()}`,
        20,
        yOffset + 15
      );
    });

    doc.save("version-history.pdf");
  };

  return (
    <div className="bg-blue-400/30 min-h-screen p-6 justify-center items-cente">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Version History</h2>

        {/* Search Bar */}
        <div className="mb-6">
  <input
    type="text"
    placeholder="Search by filename"
    className="w-lg p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

        {/* New Version Upload Form */}
        <form onSubmit={handleNewVersionUpload} className="mb-8">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-3 block w-full text-sm text-gray-500 border rounded-md p-2"
          />
          <input
            type="text"
            className="w-full p-3 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Version Content"
            value={versionContent}
            onChange={(e) => setVersionContent(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Upload New Version
          </button>
        </form>

        {/* Version History List */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Versions</h3>
          {filteredVersions.map((version) => (
            <div
              key={version._id}
              className="bg-gray-50 border p-4 mb-4 rounded-md shadow-sm"
            >
              <p><strong>Filename:</strong> {version.filename}</p>
              <p><strong>Version:</strong> {version.version}</p>
              <p><strong>Content:</strong> {version.content}</p>
              <p><strong>Created At:</strong> {new Date(version.createdAt).toLocaleString()}</p>
              <div className="mt-4 space-x-2">
                <button
                  onClick={() => handleRestoreVersion(version._id)}
                  className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Restore This Version
                </button>
                <button
                  onClick={() => handleDelete(version._id)}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete Version
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Generate PDF Button */}
        <button
          onClick={generatePDF}
          className="bg-green-500 text-white p-3 rounded-md mt-6 hover:bg-green-600 transition-colors"
        >
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default VersionHistoryPage;
