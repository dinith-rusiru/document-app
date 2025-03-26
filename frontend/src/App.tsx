import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProfileWizard from './pages/ProfileWizard';
import DocumentCategorizer from './pages/DocumentCategorizer';
import SmartRecommendations from './pages/SmartRecommendations';
import UploadForm from "./pages/UploadForm";
import DocumentList from "./pages/DocumentList";
import EditDocument from "./pages/EditDocument";
import Versionadd from "./pages/NewVersionPage";
export function App() {
  return <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile-wizard" element={<ProfileWizard />} />
            <Route path="/document-categorizer" element={<DocumentCategorizer />} />
            <Route path="/smart-recommendations" element={<SmartRecommendations />} />


            {/* raveen routes */}
            <Route path="/upload" element={<UploadForm />} />
        <Route path="/documents" element={<DocumentList />} />
        <Route path="/edit/:id" element={<EditDocument />} />
        <Route path="/version/:id" element={<Versionadd />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>;
}