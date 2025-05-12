import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FaHome, FaSearch, FaUserPlus, FaUserMd } from 'react-icons/fa';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage/HomePage';
import Vets from './pages/Vets/Vets';
import OwnerSearch from './pages/OwnerSearch/OwnerSearch';
import OwnerForm from './pages/OwnerForm/OwnerForm';
import OwnerDetails from './pages/OwnerDetails/OwnerDetails';
import EditOwner from './pages/EditOwner/EditOwner';
import AddPet from './pages/AddPet/AddPet';
import EditPet from './pages/EditPet/EditPet';
import AddVisit from './pages/AddVisit/AddVisit';
import OwnersList from './pages/OwnersList/OwnersList';

import './App.css';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vets" element={<Vets />} />
            <Route path="/owners" element={<OwnersList />} />
            <Route path="/owners/search" element={<OwnerSearch />} />
            <Route path="/owners/new" element={<OwnerForm />} />
            <Route path="/owners/:id" element={<OwnerDetails />} />
            <Route path="/owners/:id/edit" element={<EditOwner />} />
            <Route path="/owners/:id/pets/new" element={<AddPet />} />
            <Route path="/owners/:id/pets/:petId/edit" element={<EditPet />} />
            <Route path="/owners/:id/pets/:petId/visits/new" element={<AddVisit />} />
            <Route path="/owners/edit/:id" element={<EditOwner />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;