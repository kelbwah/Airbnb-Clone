
export default function SeeAllPhotos(props){
    return (
        <div className="absolute w-full h-full z-50 grid place-content-evenly gap-4">
            <button onClick={()=>props.setIsSeeAllPhotos(false)} className="fixed top-6 left-8 hover:bg-gray-100 rounded-full p-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </button>
            <div className="fixed flex rounded-xl flex-col gap-8 w-1/2 h-5/6 inset-x-0 mx-auto inset-y-0 my-auto overflow-y-auto no-scrollbar">
                {props.photos.map((photo) => (
                    <img className="rounded-xl shadow-xl" src={photo}/>
                ))}  
            </div>
               
             
        </div>
    )
}