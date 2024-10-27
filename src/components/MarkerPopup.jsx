import PropTypes from 'prop-types'; // Import PropTypes
import RemarkForm from './RemarkForm';

const MarkerPopup = ({ markerData, handleRemark }) => {
    return (
        <div>
            <p>{markerData.address || "Drag me to get address!"}</p>
            <RemarkForm handleRemark={handleRemark} />
        </div>
    );
};

// Add prop types validation
MarkerPopup.propTypes = {
    markerData: PropTypes.shape({
        address: PropTypes.string, // markerData should have an address of type string
    }).isRequired, // markerData is required
    handleRemark: PropTypes.func.isRequired, // handleRemark is required
};

export default MarkerPopup;

