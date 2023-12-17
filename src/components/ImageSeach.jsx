import '../App.css';

import searchIcon from '../assets/search.png';

export default function ImageSeach() {

  return (
    <div className=' h-screen overflow-y-auto bg-blue-600'>
    <div className=' text-center mt-10 mb-5 text-5xl font-medium text-white'>
    <h1>Image Search</h1>
    </div>
    <div id='search-field' className='flex justify-center'>
        <input type='text' placeholder='Enter image to search' id='search-box' className=' w-96 h-10 rounded-full p-5'/>
        <div className = ' bg-orange-400 hover:bg-white w-10 h-10 rounded-full ml-1'>
            <img src={searchIcon} alt='search-icon' className='pt-2 pl-3 cursor-pointer'/>
        </div>
    </div>
    <div id='search-result'>
        
    </div>
    <div id='show-more' className='flex justify-center'>
        <button className='bg-white hover:bg-orange-400 text-black font-bold py-2 px-4 rounded-full mt-5'>
            Show More
        </button>
    </div>
    </div>
  )
}
