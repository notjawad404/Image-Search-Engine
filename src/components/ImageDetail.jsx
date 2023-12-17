/* eslint-disable react/prop-types */
import '../App.css';

const ImageDetail = ({ selectedImage, onClose }) => {
    return (
        <div className='fixed top-0 left-0 w-full h-screen overflow-y-auto bg-blue-600 bg-opacity-75 flex items-center justify-center'>
            <div className='bg-red-800 p-8 rounded-lg w-3/5 h-full overflow-y-auto text-white'>
                <div className='flex justify-end mb-4'>
                    <button onClick={onClose} className='bg-red-500 text-white py-2 px-4 rounded-full'>
                        Close
                    </button>
                </div>
                <img
                    src={selectedImage.urls.regular}
                    alt={selectedImage.alt_description}
                    className='mb-4 rounded w-full'
                />
                <div className='text-lg font-semibold'>
                    {selectedImage.description || 'No description available'}
                </div>
            </div>
        </div>
    );
};

export default ImageDetail;