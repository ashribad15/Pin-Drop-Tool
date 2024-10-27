import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";

export default function Sidebar({ remarkHistory, onSelectRemark }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // Use functional update for state
  };

  return (
    <div className="min-h-screen">
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <RxHamburgerMenu className="text-gray-900 px-2 rounded-sm" />
      </span>
      <div
        className={`sidebar fixed top-0 bottom-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 lg:left-0 ${
          isSidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              InTandem
            </h1>
            <RxCross2
              className="text-white cursor-pointer ml-28 lg:hidden"
              onClick={toggleSidebar}
              aria-label="Close Sidebar"
            />
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        <div className="p-2.5 mt-3 text-gray-200">
          <h2 className="font-bold">Remark History</h2>
          {remarkHistory.map((remark) => (
            <div
              key={remark.id || remark.remark} // Use unique id if available
              className="p-2.5 my-2 flex items-center rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={() => onSelectRemark(remark)}
              role="button" // Improve accessibility
              tabIndex={0} // Allow keyboard navigation
              onKeyPress={(e) => e.key === 'Enter' && onSelectRemark(remark)} // Handle keyboard interaction
            >
              <SlLocationPin />
              <span className="text-[15px] ml-4">{remark.remark}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Add prop types validation
Sidebar.propTypes = {
  remarkHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // assuming each remark has a unique id
      remark: PropTypes.string.isRequired, // remark should be a string and is required
    })
  ).isRequired, // remarkHistory is required
  onSelectRemark: PropTypes.func.isRequired, // onSelectRemark should be a function and is required
};
