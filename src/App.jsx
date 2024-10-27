import { useEffect, useState } from 'react';
import MapLayout from './page/Map/MapLayout';
import Sidebar from './components/Sidebar'; // Ensure correct casing

function App() {
  const [remarkHistory, setRemarkHistory] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('remarkHistory')) || [];
    setRemarkHistory(savedHistory);
  }, []);

  const handleAddRemark = (remarkData) => {
    const newHistory = [...remarkHistory, remarkData];
    setRemarkHistory(newHistory);
    localStorage.setItem('remarkHistory', JSON.stringify(newHistory));
  };

  const handleSelectRemark = (remark) => {
    setSelectedPosition(remark.position);
  };

  return (
    <div className="grid grid-cols-[250px_auto] lg:grid-cols-[250px_1fr] h-screen">
      <Sidebar remarkHistory={remarkHistory} onSelectRemark={handleSelectRemark} />
      <MapLayout onAddRemark={handleAddRemark} selectedPosition={selectedPosition} />
    </div>
  );
}

export default App;
