import { useEffect, useState } from "react";
import axios from 'axios'
import { Navigate, useParams } from "react-router-dom";



export default function Carsformpage(){
   const {id} = useParams();
   const [title,setTitle] = useState('')
   const [location ,setLocation] = useState('')
   const [addedPhotos,setAddedPhotos] = useState([])
   const [description,setDescription] = useState('')
   const [types,setTypes] = useState([]);
   const [contactInfo,setContactInfo] = useState('');
   const [price,setPrice] = useState('');
   const [redirect,setRedirect] = useState(false);

   useEffect(()=>{
    if(!id) {
        return;
    }
    axios.get('/uniquecar/'+ id).then( response =>{
        const {data} = response ;
        setTitle(data.title)
        setLocation(data.location)
        setAddedPhotos(data.photos)
        setDescription(data.description)
        setTypes(data.carType)
        setContactInfo(data.contactInfo)
        setPrice(data.price)

        
    });
   }, [id]);


   function inputHeader(text){
    return(
        <h2 className="text-2xl mt-4">{text}</h2>
    )
   }

   function inputDescription(text){
    return (
        <p className="text-gray-500 text-sm">{text} </p>
    )
   }

   function preInput(header,description) {
    return (
        <>
        {inputHeader(header)}
        {inputDescription(description)}
        </>
    )
   }

   function  hundletypeclick(ev) {
        const {checked,name} = ev.target;
        if (checked){
            setTypes([...types,name])
            
        }
        else {
            setTypes([...types.filter(selectedName => selectedName !== name )])
            
        }
    }


  
    function uploadPhoto(ev){
    const files =  ev.target.files 
    const data = new FormData();
    for(let i = 0; i < files.length; i++) {
       data.append('photos',files[i])
    }
    
     axios.post('/upload',data, {
        headers : {'Content-Type':'multipart/form-data'}
    }).then(response => {
        const {data:fileNames} = response;
        setAddedPhotos(prev => {
        return [...prev,...fileNames];
    });
    })
   }

   async function saveCar(ev){
     ev.preventDefault();
     if(id){
        // update
        const cardata = {id,title,location, addedPhotos,description,types,contactInfo,price}
      await axios.put('/addcar',cardata)

      setRedirect(true);
     }
     else {
        //new place
      const cardata = {title,location, addedPhotos,description,types,contactInfo,price}
      await axios.post('/addcar',cardata)

      setRedirect(true);
     }
     
   }
   
   if(redirect){
    return <Navigate to={'/account/cars'} />
   }


    return(
        <div className=" px-11 font-semibold">
              <form onSubmit={saveCar}> 
                {preInput('Title','Put the car models and how long has it been used')}
                <input type="text" placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)} />
                {preInput('State location','The state location of you car')}
                <input type='text' placeholder="state location" value={location} onChange={ev => setLocation(ev.target.value)} />
                {preInput('Photos','The more the better')}
                
                <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mt-2">

                    {addedPhotos.length > 0 && addedPhotos.map(link => (
                       <div className=" h-32 flex " key={link}>
                        <img className=" rounded-2xl w-full object-cover"  src={"http://localhost:4000/uploads/" + link}  />
                        </div>
                    ))}

                  <label className=" h-32 cursor-pointer flex items-center gap-2 justify-center border bg-transparent font-semibold rounded-2xl p-2 text-2xl text-gray-600">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                   </svg>

                    Upload 
                  </label>
                </div>


                {preInput('Description','description of the car')}
                <textarea  rows={"7"}  value={description} onChange={ev => setDescription(ev.target.value)} />
                

                {preInput('Car Type','select all the types that match your car')}
                 
                 <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ">
                     <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center" >
                      <input type="checkbox" checked={types.includes('Sports car')}  name="Sports car" onChange={hundletypeclick}  />
                      <span>Sports car</span>
                     </label>

                     <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2" >
                      <input type="checkbox" checked={types.includes('everyday life car')} name="everyday life car" onChange={hundletypeclick}  />
                      <span>everyday life car</span>
                      </label >

                      <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2" >
                      <input type="checkbox" checked={types.includes('4x4')} name="4x4" onChange={hundletypeclick}  />
                      <span>4x4</span>
                      </label>

                      <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2" >
                      <input type="checkbox" checked={types.includes('Luxury car')}  name="Luxury car" onChange={hundletypeclick} />
                      <span>Luxury car</span>
                      </label>

                      <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2" >
                      <input type="checkbox" checked={types.includes('Used')} name="Used" onChange={hundletypeclick} />
                      <span>Used</span>
                      </label>

                      <label className=" border p-4 flex rounded-2xl cursor-pointer justify-center gap-2" >
                      <input type="checkbox" checked={types.includes('Brand new car')} name="Brand new car" onChange={hundletypeclick} />
                      <span>Brand new car</span>
                      </label>    
                </div>


                 {preInput('Contact info','here put all the ways the buyer can reach you with')}
                <textarea rows={"4"} value={contactInfo} onChange={ev => setContactInfo(ev.target.value)} />

                <div>
                    {preInput('Price','Price in tunisian million: 1M = 1 000 000 DT')}
                    <input type="text" placeholder="Price" value={price} onChange={ev => setPrice(ev.target.value)} />

                </div>

                <div className="">
                    <button className="primary my-4">Save</button>
                </div>


              </form>
            </div>
    )
}