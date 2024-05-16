import video1 from '../assets/video1.mp4'


export default function IndexPage(){
    return(
      
     <div className='flex' >
     <video src={video1} autoPlay loop muted id="myVideo" className='object-cover z-4  p-0  w-full h-full    ' />
    </div>
    
     
    )
}