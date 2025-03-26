import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
}
const TagInput = ({
  tags,
  setTags,
  placeholder = 'Add tags...'
}: TagInputProps) => {
  const [input, setInput] = useState('');
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  return <div className="flex flex-wrap items-center border rounded-md px-2 py-1 focus-within:border-blue-500 bg-white">
      {tags.map((tag, index) => <div key={index} className="flex items-center bg-blue-100 text-blue-700 rounded-full px-2 py-1 m-1 text-sm">
          <span>{tag}</span>
          <button type="button" onClick={() => removeTag(tag)} className="ml-1 text-blue-700 hover:text-blue-900 focus:outline-none">
            <XIcon className="h-3 w-3" />
          </button>
        </div>)}
      <input type="text" className="flex-1 outline-none py-1 px-2 min-w-[120px]" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder={tags.length === 0 ? placeholder : ''} />
    </div>;
};
export default TagInput;