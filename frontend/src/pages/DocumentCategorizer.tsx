import React, { useState } from 'react';
import { FolderPlusIcon, TagIcon, XIcon, PlusIcon } from 'lucide-react';
import DocumentCard from '../components/DocumentCard';
import TagInput from '../components/TagInput';
const DocumentCategorizer = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newFolder, setNewFolder] = useState('');
  // Mock data
  const documents = [{
    id: 1,
    title: 'Q4 Financial Report',
    type: 'PDF',
    date: 'Dec 15, 2023',
    tags: ['finance', 'quarterly'],
    category: 'Reports'
  }, {
    id: 2,
    title: 'Marketing Strategy',
    type: 'DOC',
    date: 'Dec 10, 2023',
    tags: ['marketing', 'strategy'],
    category: 'Planning'
  }, {
    id: 3,
    title: 'Client Contract',
    type: 'PDF',
    date: 'Dec 5, 2023',
    tags: ['legal', 'client'],
    category: 'Contracts'
  }, {
    id: 4,
    title: 'Team Meeting Notes',
    type: 'DOC',
    date: 'Nov 28, 2023',
    tags: ['meeting', 'notes'],
    category: 'Notes'
  }, {
    id: 5,
    title: 'Product Roadmap',
    type: 'PPT',
    date: 'Nov 20, 2023',
    tags: ['product', 'planning'],
    category: 'Planning'
  }, {
    id: 6,
    title: 'Employee Handbook',
    type: 'PDF',
    date: 'Nov 15, 2023',
    tags: ['hr', 'policy'],
    category: 'HR'
  }];
  const categories = ['Reports', 'Planning', 'Contracts', 'Notes', 'HR', 'Other'];
  const folders = ['Work Documents', 'Personal Files', 'Project Alpha', 'Archive', 'Shared'];
  const toggleDocumentSelection = (id: number) => {
    if (selectedDocuments.includes(id)) {
      setSelectedDocuments(selectedDocuments.filter(docId => docId !== id));
    } else {
      setSelectedDocuments([...selectedDocuments, id]);
    }
  };
  const handleAddCategory = () => {
    if (newCategory.trim()) {
      // Add new category logic would go here
      setNewCategory('');
    }
  };
  const handleAddFolder = () => {
    if (newFolder.trim()) {
      // Add new folder logic would go here
      setNewFolder('');
    }
  };
  const handleApplyTags = () => {
    // Apply tags to selected documents logic would go here
    setSelectedDocuments([]);
    setTags([]);
  };
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Document Categorizer
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Categories
            </h2>
            <ul className="space-y-2 mb-4">
              {categories.map(category => <li key={category} className="flex items-center justify-between">
                  <span className="text-gray-700">{category}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Assign
                  </button>
                </li>)}
            </ul>
            <div className="mt-4 flex">
              <input type="text" placeholder="New category..." className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newCategory} onChange={e => setNewCategory(e.target.value)} />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition-colors" onClick={handleAddCategory}>
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <h2 className="text-lg font-medium text-gray-800 mt-6 mb-4">
              Folders
            </h2>
            <ul className="space-y-2 mb-4">
              {folders.map(folder => <li key={folder} className="flex items-center justify-between">
                  <span className="text-gray-700">{folder}</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    Move
                  </button>
                </li>)}
            </ul>
            <div className="mt-4 flex">
              <input type="text" placeholder="New folder..." className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={newFolder} onChange={e => setNewFolder(e.target.value)} />
              <button className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition-colors" onClick={handleAddFolder}>
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          {selectedDocuments.length > 0 && <div className="bg-white rounded-lg shadow-md p-4 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-800">
                  Selected Documents
                </h2>
                <span className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded-full">
                  {selectedDocuments.length}
                </span>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Add Tags
                </label>
                <TagInput tags={tags} setTags={setTags} placeholder="Add tags..." />
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center" onClick={handleApplyTags}>
                  <TagIcon className="h-4 w-4 mr-2" />
                  Apply Tags
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center" onClick={() => setSelectedDocuments([])}>
                  <XIcon className="h-4 w-4 mr-2" />
                  Clear
                </button>
              </div>
            </div>}
        </div>
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <span>
                Tip: Click on documents to select them for batch categorization
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full flex items-center">
                <TagIcon className="h-4 w-4 mr-1" />
                Add Tags
              </button>
              <button className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center">
                <FolderPlusIcon className="h-4 w-4 mr-1" />
                Move to Folder
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map(doc => <div key={doc.id} onClick={() => toggleDocumentSelection(doc.id)} className={`cursor-pointer transition-all ${selectedDocuments.includes(doc.id) ? 'ring-2 ring-blue-500 scale-[1.02]' : 'hover:shadow-lg'}`}>
                <DocumentCard title={doc.title} type={doc.type} date={doc.date} tags={doc.tags} category={doc.category} />
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
export default DocumentCategorizer;