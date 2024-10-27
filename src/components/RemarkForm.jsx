import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react'; // No need to import React in React 17 or above

const RemarkForm = ({ handleRemark }) => {
    const [remark, setRemark] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the handleRemark function passed from the parent component
        handleRemark(remark);
        // Clear the input field after submission
        setRemark("");
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="mt-2">
                <input
                    type="text"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter remark"
                    className="border rounded p-1 w-full"
                />
                <button type="submit" className="mt-1 bg-blue-500 text-white rounded px-2 py-1">
                    Save Remark
                </button>
            </form>
        </div>
    );
};

// Add prop types validation
RemarkForm.propTypes = {
    handleRemark: PropTypes.func.isRequired, // handleRemark is required and should be a function
};

export default RemarkForm;
