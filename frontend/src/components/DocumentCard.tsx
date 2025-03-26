import React from 'react';
import { FileIcon, StarIcon, MoreVerticalIcon } from 'lucide-react';
interface DocumentCardProps {
  title: string;
  type: string;
  date: string;
  tags: string[];
  category: string;
  isFavorite?: boolean;
}
const DocumentCard = ({
  title,
  type,
  date,
  tags,
  category,
  isFavorite = false
}: DocumentCardProps) => {
  return <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <FileIcon className="h-8 w-8 text-blue-500 mr-3" />
          <div>
            <h3 className="text-lg font-medium text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500">
              {type} • {date}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          {isFavorite && <StarIcon className="h-5 w-5 text-yellow-400 mr-2" fill="currentColor" />}
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVerticalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-2">
          {category}
        </span>
        {tags.map((tag, index) => <span key={index} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-1">
            {tag}
          </span>)}
      </div>
    </div>;
};
export default DocumentCard;