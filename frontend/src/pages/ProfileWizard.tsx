import React, { useState, Fragment } from 'react';
import { UserIcon, CheckIcon } from 'lucide-react';
const ProfileWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    documentTypes: [] as string[],
    categories: [] as string[]
  });
  const documentTypeOptions = ['Reports', 'Presentations', 'Spreadsheets', 'Contracts', 'Notes', 'Other'];
  const categoryOptions = ['Work', 'Finance', 'Personal', 'Projects', 'Archive', 'Legal'];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, array: 'documentTypes' | 'categories') => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setFormData({
      ...formData,
      [array]: isChecked ? [...formData[array], value] : formData[array].filter(item => item !== value)
    });
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };
  return <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full">
            <UserIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">
            Profile Wizard
          </h1>
        </div>
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map(stepNumber => <Fragment key={stepNumber}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {step > stepNumber ? <CheckIcon className="h-6 w-6" /> : stepNumber}
                </div>
                {stepNumber < 3 && <div className={`flex-1 h-1 mx-2 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`} />}
              </Fragment>)}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm">Basic Info</span>
            <span className="text-sm">Document Preferences</span>
            <span className="text-sm">Finish</span>
          </div>
        </div>
        {step === 1 && <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Project Manager" />
              </div>
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <select id="department" name="department" value={formData.department} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>}
        {step === 2 && <div>
            <h2 className="text-lg font-medium text-gray-800 mb-4">
              Document Preferences
            </h2>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Common Document Types
              </label>
              <div className="grid grid-cols-2 gap-2">
                {documentTypeOptions.map(option => <div key={option} className="flex items-center">
                    <input type="checkbox" id={`type-${option}`} name="documentTypes" value={option} checked={formData.documentTypes.includes(option)} onChange={e => handleCheckboxChange(e, 'documentTypes')} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor={`type-${option}`} className="ml-2 text-sm text-gray-700">
                      {option}
                    </label>
                  </div>)}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Categories
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categoryOptions.map(option => <div key={option} className="flex items-center">
                    <input type="checkbox" id={`category-${option}`} name="categories" value={option} checked={formData.categories.includes(option)} onChange={e => handleCheckboxChange(e, 'categories')} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                    <label htmlFor={`category-${option}`} className="ml-2 text-sm text-gray-700">
                      {option}
                    </label>
                  </div>)}
              </div>
            </div>
          </div>}
        {step === 3 && <div className="text-center py-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Profile Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Your profile has been set up successfully. You can now start
              managing your documents efficiently.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 text-left mb-6">
              <h3 className="font-medium text-gray-800 mb-2">
                Profile Summary
              </h3>
              <p>
                <span className="font-medium">Name:</span> {formData.name}
              </p>
              <p>
                <span className="font-medium">Role:</span> {formData.role}
              </p>
              <p>
                <span className="font-medium">Department:</span>{' '}
                {formData.department}
              </p>
              <p>
                <span className="font-medium">Document Types:</span>{' '}
                {formData.documentTypes.join(', ')}
              </p>
              <p>
                <span className="font-medium">Categories:</span>{' '}
                {formData.categories.join(', ')}
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => window.location.href = '/'}>
              Go to Dashboard
            </button>
          </div>}
        {step < 3 && <div className="flex justify-between mt-8">
            <button onClick={prevStep} className={`px-4 py-2 border rounded-lg ${step === 1 ? 'border-gray-300 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`} disabled={step === 1}>
              Back
            </button>
            <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {step === 2 ? 'Finish' : 'Next'}
            </button>
          </div>}
      </div>
    </div>;
};
export default ProfileWizard;