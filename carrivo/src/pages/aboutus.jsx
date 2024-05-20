import image1 from '../assets/image1.png'


export default function AboutUs() {
    return (
        <div className=' mt-4 font'>
            <div className='text-center '>
             <h1 className=' text-4xl font-bold my-2'> About Us </h1>
             <p className=' mt-4'>A consumer-to-consumer cars website where individuals can buy and sell vehicles directly, providing a platform for peer-to-peer transactions without the need for dealerships.</p>
            </div>

            <div className=' my-20'>
                <section className='grid grid-cols-2 gap-8 mx-4 '>
                    <div className='about-image '>
                        <img className=' rounded-xl object-cover' src={image1} />
                    </div>

                    <div className=' lg:my-3'> 
                       <h2 className=' font-semibold text-3xl mb-8 underline'>Carrivo </h2>
                       <p>This letter describes the accumulated work between me and my colleague (Mohamed Ben Milled, who s 
                       also applying at the University of Passau) that has been put into completing our end-of-studies project. 
                       Our project thesis consisted of a 3-month internship at data guiding in which we had to come up with a 
                       unique C to C e-commerce platform and analyze its data.
                       Our project was developed based on the scrum method, meaning that we had a set of meetings, tools, 
                       and roles in order to advance our project more efficiently. Our work started with the conception aspect for 
                       two sprints by handling all its use cases and event sequences while at the same time Conceiving how all 
                       dimensions variables correlate with each other.
                       </p>
                       <br />
                       <a href="" target='_blank' className='bg-blue-400 w-full p-2 text-white rounded-2xl mt-7'>View Open-source code </a>
                    </div>
                </section>
            </div>
          
        </div>

        
    )
}