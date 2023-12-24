import { useState, useEffect } from 'react';
import '../App.css';
import searchIcon from '../assets/search.svg';
import ImageDetail from './ImageDetail';

const ImageSearch = () => {

    const AccessKey1 = `${import.meta.env.VITE_AccessKey}`

    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [noResults, setNoResults] = useState(false);
   

    const fetchImages = async () => {
        let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${AccessKey1}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.results.length === 0 && page === 1) {
            setNoResults(true);
        } else {
            setNoResults(false);
            // If it's the first page of results, setImages directly; otherwise, concatenate the results
            setImages((prevImages) => (page === 1 ? data.results : [...prevImages, ...data.results]));
        }
    };

    useEffect(() => {
        if (keyword !== '') {
            // Clear previous results only when a new search is performed
            if (page === 1) {
                setImages([]);
            }
            fetchImages();
        }
    }, [page, keyword]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        const searchTerm = document.getElementById('search-box').value;
        if (searchTerm.trim() !== '') {
            setKeyword(searchTerm);
            setNoResults(false);
        } else {
            setNoResults(true);
        }
    };

    const handleShowMore = () => {
        setPage(page + 1);
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleCloseImageDetail = () => {
        setSelectedImage(null);
    };

    return (
        <div className='h-screen overflow-y-auto bg-blue-600'>
            <div className='text-center mt-10 mb-5 text-5xl font-medium text-white'>
                <h1>Image Search</h1>
            </div>
            <form id='search-field' className='flex justify-center' onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Enter image to search'
                    id='search-box'
                    className='w-96 h-10 rounded-full p-5 ml-3'
                />
                <div className= 'w-10 h-10 md:w-10 rounded-full ml-1 mr-4'>
                    <img
                        src={searchIcon}
                        alt='search-icon'
                        className='pt-2 pl-3 cursor-pointer'
                        onClick={handleSubmit}
                    />
                </div>
            </form>
            {noResults ? (
                <div className='text-white text-center mt-5'>No results found.</div>
            ) : (
                <div id='search-result' className='flex flex-wrap justify-center'>
                    {images.map((image, index) => (
                        <img
                            key={image.id}
                            src={image.urls.small}
                            alt={image.alt_description}
                            className={`my-2 mx-2 w-80 h-80 cursor-pointer ${(index + 1) % 5 === 0 ? 'mb-2' : ''
                                }`}
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
            )}
            {images.length > 0 && !noResults && (
                <div id='show-more' className='flex justify-center'>
                    <button
                        onClick={handleShowMore}
                        className='bg-white hover:bg-orange-400 text-black font-bold py-2 px-4 rounded-full mt-5'>
                        Show More
                    </button>
                </div>
            )}
            {selectedImage && (
                <ImageDetail selectedImage={selectedImage} onClose={handleCloseImageDetail} />
            )}
        </div>
    );
};

export default ImageSearch;