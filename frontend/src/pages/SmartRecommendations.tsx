import React, { useState } from 'react';
import { BrainIcon, CheckIcon, XIcon, FileTextIcon } from 'lucide-react';
import DocumentCard from '../components/DocumentCard';
const SmartRecommendations = () => {
  const [acceptedRecommendations, setAcceptedRecommendations] = useState<number[]>([]);
  const [rejectedRecommendations, setRejectedRecommendations] = useState<number[]>([]);
  // Mock data
  const categoryRecommendations = [{
    id: 1,
    document: {
      title: 'Q3 Budget Analysis',
      type: 'XLS',
      date: 'Oct 5, 2023',
      tags: ['budget', 'analysis'],
      category: 'Misc'
    },
    recommendedCategory: 'Finance',
    confidence: 92
  }, {
    id: 2,
    document: {
      title: 'Client Meeting Notes',
      type: 'DOC',
      date: 'Nov 12, 2023',
      tags: ['client'],
      category: 'Documents'
    },
    recommendedCategory: 'Meeting Notes',
    confidence: 87
  }];
  const tagRecommendations = [{
    id: 3,
    document: {
      title: 'Product Launch Plan',
      type: 'PDF',
      date: 'Dec 1, 2023',
      tags: ['product'],
      category: 'Planning'
    },
    recommendedTags: ['marketing', 'launch', 'strategy'],
    confidence: 85
  }, {
    id: 4,
    document: {
      title: 'Employee Onboarding',
      type: 'DOC',
      date: 'Nov 25, 2023',
      tags: ['employee'],
      category: 'HR'
    },
    recommendedTags: ['onboarding', 'training', 'procedures'],
    confidence: 90
  }];
  const relatedDocuments = [{
    id: 5,
    document: {
      title: 'Marketing Strategy 2023',
      type: 'PPT',
      date: 'Jan 15, 2023',
      tags: ['marketing', 'strategy'],
      category: 'Planning'
    },
    relatedTo: 'Product Launch Plan',
    relevanceScore: 89
  }, {
    id: 6,
    document: {
      title: 'HR Policies Manual',
      type: 'PDF',
      date: 'Jun 10, 2023',
      tags: ['hr', 'policy', 'manual'],
      category: 'HR'
    },
    relatedTo: 'Employee Onboarding',
    relevanceScore: 94
  }];
  const handleAccept = (id: number) => {
    setAcceptedRecommendations([...acceptedRecommendations, id]);
    setRejectedRecommendations(rejectedRecommendations.filter(recId => recId !== id));
  };
  const handleReject = (id: number) => {
    setRejectedRecommendations([...rejectedRecommendations, id]);
    setAcceptedRecommendations(acceptedRecommendations.filter(recId => recId !== id));
  };
  const isAccepted = (id: number) => acceptedRecommendations.includes(id);
  const isRejected = (id: number) => rejectedRecommendations.includes(id);
  const isPending = (id: number) => !isAccepted(id) && !isRejected(id);
  return <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-2 rounded-full mr-4">
          <BrainIcon className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Smart Recommendations
        </h1>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Category Recommendations
        </h2>
        {categoryRecommendations.map(rec => <div key={rec.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 mb-4 md:mb-0">
                <DocumentCard title={rec.document.title} type={rec.document.type} date={rec.document.date} tags={rec.document.tags} category={rec.document.category} />
              </div>
              <div className="md:ml-4 flex flex-col items-center md:items-start">
                <div className="bg-gray-50 p-3 rounded-lg w-full md:w-auto">
                  <div className="text-sm text-gray-500 mb-1">
                    Recommended Category:
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800">
                      {rec.recommendedCategory}
                    </span>
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {rec.confidence}% match
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button onClick={() => handleAccept(rec.id)} className={`px-4 py-2 rounded-md flex items-center ${isAccepted(rec.id) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <CheckIcon className="h-4 w-4 mr-1" />
                    {isAccepted(rec.id) ? 'Accepted' : 'Accept'}
                  </button>
                  <button onClick={() => handleReject(rec.id)} className={`px-4 py-2 rounded-md flex items-center ${isRejected(rec.id) ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <XIcon className="h-4 w-4 mr-1" />
                    {isRejected(rec.id) ? 'Rejected' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>)}
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Tag Recommendations
        </h2>
        {tagRecommendations.map(rec => <div key={rec.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 mb-4 md:mb-0">
                <DocumentCard title={rec.document.title} type={rec.document.type} date={rec.document.date} tags={rec.document.tags} category={rec.document.category} />
              </div>
              <div className="md:ml-4 flex flex-col items-center md:items-start">
                <div className="bg-gray-50 p-3 rounded-lg w-full md:w-auto">
                  <div className="text-sm text-gray-500 mb-1">
                    Recommended Tags:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {rec.recommendedTags.map((tag, index) => <span key={index} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>)}
                    <span className="ml-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {rec.confidence}% match
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button onClick={() => handleAccept(rec.id)} className={`px-4 py-2 rounded-md flex items-center ${isAccepted(rec.id) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <CheckIcon className="h-4 w-4 mr-1" />
                    {isAccepted(rec.id) ? 'Accepted' : 'Accept'}
                  </button>
                  <button onClick={() => handleReject(rec.id)} className={`px-4 py-2 rounded-md flex items-center ${isRejected(rec.id) ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <XIcon className="h-4 w-4 mr-1" />
                    {isRejected(rec.id) ? 'Rejected' : 'Reject'}
                  </button>
                </div>
              </div>
            </div>
          </div>)}
      </div>
      <div>
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Related Documents
        </h2>
        {relatedDocuments.map(rec => <div key={rec.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex-1 mb-4 md:mb-0">
                <DocumentCard title={rec.document.title} type={rec.document.type} date={rec.document.date} tags={rec.document.tags} category={rec.document.category} />
              </div>
              <div className="md:ml-4 flex flex-col items-center md:items-start">
                <div className="bg-gray-50 p-3 rounded-lg w-full md:w-auto">
                  <div className="text-sm text-gray-500 mb-1">Related to:</div>
                  <div className="flex items-center">
                    <FileTextIcon className="h-4 w-4 mr-1 text-blue-600" />
                    <span className="font-medium text-gray-800">
                      {rec.relatedTo}
                    </span>
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {rec.relevanceScore}% relevant
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button onClick={() => handleAccept(rec.id)} className={`px-4 py-2 rounded-md flex items-center ${isAccepted(rec.id) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <CheckIcon className="h-4 w-4 mr-1" />
                    {isAccepted(rec.id) ? 'Linked' : 'Link'}
                  </button>
                  <button onClick={() => handleReject(rec.id)} className={`px-4 py-2 rounded-md flex items-center ${isRejected(rec.id) ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    <XIcon className="h-4 w-4 mr-1" />
                    {isRejected(rec.id) ? 'Ignored' : 'Ignore'}
                  </button>
                </div>
              </div>
            </div>
          </div>)}
      </div>
    </div>;
};
export default SmartRecommendations;