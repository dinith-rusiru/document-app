import React, { useState } from 'react';
import { SearchIcon, PlusIcon, FolderIcon, FileTextIcon, StarIcon } from 'lucide-react';
import DocumentCard from '../components/DocumentCard';
import { Link } from 'react-router-dom';
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // Mock data for demonstration
  const recentDocuments = [{
    id: 1,
    title: 'Project Proposal',
    type: 'PDF',
    date: 'Jan 15, 2023',
    tags: ['work', 'proposal'],
    category: 'Projects'
  }, {
    id: 2,
    title: 'Meeting Notes',
    type: 'DOC',
    date: 'Jan 20, 2023',
    tags: ['meeting', 'notes'],
    category: 'Notes',
    isFavorite: true
  }, {
    id: 3,
    title: 'Budget Report',
    type: 'XLS',
    date: 'Feb 5, 2023',
    tags: ['finance', 'report'],
    category: 'Finance'
  }, {
    id: 4,
    title: 'Product Roadmap',
    type: 'PPT',
    date: 'Feb 10, 2023',
    tags: ['roadmap', 'strategy'],
    category: 'Strategy',
    isFavorite: true
  }];
  const folders = [{
    id: 1,
    name: 'Projects',
    count: 12
  }, {
    id: 2,
    name: 'Finance',
    count: 8
  }, {
    id: 3,
    name: 'Personal',
    count: 15
  }, {
    id: 4,
    name: 'Archive',
    count: 24
  }];
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Document Dashboard
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input type="text" placeholder="Search documents..." className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Link to="/upload">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
            <PlusIcon className="h-5 w-5 mr-2" />
            <span>New Document</span>
          </button></Link>
          
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Folders</h2>
            <ul className="space-y-2">
              {folders.map(folder => <li key={folder.id}>
                  <a href="#" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
                    <FolderIcon className="h-5 w-5 text-blue-500 mr-3" />
                    <span className="text-gray-700">{folder.name}</span>
                    <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  </a>
                </li>)}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  Projects
                </span>
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Finance
                </span>
                <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                  Notes
                </span>
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                  Personal
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Recent Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentDocuments.map(doc => <DocumentCard key={doc.id} title={doc.title} type={doc.type} date={doc.date} tags={doc.tags} category={doc.category} isFavorite={doc.isFavorite} />)}
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Quick Access
            </h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <FileTextIcon className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-gray-700">Recent Files</span>
                </button>
                <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <StarIcon className="h-8 w-8 text-yellow-400 mb-2" />
                  <span className="text-gray-700">Favorites</span>
                </button>
                <Link to="/documents">
                <button className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <FolderIcon className="h-8 w-8 text-blue-500 mb-2" />
                  <span className="text-gray-700">All Documents</span>
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Home;