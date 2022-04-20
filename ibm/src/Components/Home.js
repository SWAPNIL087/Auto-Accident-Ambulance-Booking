import React from 'react'
import { NavLink, useHistory,Redirect } from 'react-router-dom';
import img1 from './Images/ambulanceImg.jpeg'
import img2 from './Images/strecherImg.jpeg'
import img3 from './Images/Img3.jpeg'
import img from './Images/Logo.png'
import newimg1 from './Images/Stetescope.png'
import newimg2 from './Images/Graphs.png'
import Amb from './Images/AmbulancePic.png'

import './style.css'

const Home = ()=>{
    return(
        <>
        <div className='container'>
            <div className='row w-100 m-auto '>
                <div className='col-8'>
                    <img className='position-fixed bg-image' style={{marginRight:'500px'}} height="500px" width="1000px" src={img}></img>
                </div>
            </div>
        </div>
        
        <br/>

        <div className='container bg-text information'>
            <div className='row m-auto'>
                <div className='col-lg-12'>
                    <h3 className='glow'><strong>Welcome to FastAmbulance</strong></h3>
                    <br/><br/>
                    <p>You can locate the nearest available ambulance and request the same. Instantly get the information & contact details of the driver. Live track the ambulance with an estimated time to reach the hospital. Offer all sorts of first aid inside the ambulance so that the patient becomes stable till he reaches the hospital.</p>
                    <button className='m-0 p-0 border-0'>
                        <NavLink className="nav-link btn btn-primary" to="/User_Home"><span className='text-light'>Book</span></NavLink>
                    </button>
                    <span> nearest Ambulance</span>
                </div>
            </div>
            <div className='row m-auto'>
                <div className='col-lg-6 col-md-6 col-12 mt-5'>
                    <h5 className=' glowPeach  float-left'><strong>Nearest Ambulance</strong></h5>
                    <br/><br/>
                    <p>FastAmbulance uses real time Location thus provides service everywhere and anytime. The gps system tracks the ambulances within radius of 5kms and allows users to book in no time.</p>
                </div>
                <div className='col-6 col-md-6 col-12 mt-5'>
                </div>
            </div>
            <div className='row m-auto'>
                <div className='col-6 col-md-6 col-12 mt-5'>
                    <img src={newimg2} height="350px" width="350px"></img></div>
                <div className='col-lg-6 col-md-6 col-12 mt-5'>
                    <h5 className=' glowPink float-left'><strong>Availability and Assurity</strong></h5>
                    <br/><br/>
                    <p className='mt-5'>User can place multiple booking request and depending on availability of ambulances User will get an booking update instantly hence increasing the probability of booking an ambulance faster thereby reducing the time between accident and ambulance reaching the spot. most of the accidents that lead to death is caused because of delay in reaching hospital we aim to reduce this percentage with the help of fast amnbulance booking</p>
                </div>
            </div>
            <div className='row m-auto'>
                <div className='col-lg-6 col-md-6 col-12 mt-5'>
                    <h5 className=' glow float-left'><strong>Ease</strong></h5>
                    <br/><br/>
                    <p className='mt-5'>India's first, GPS based technology platform for fast and reliable first point medical attention.
With an increasing emphasis on promoting independent living today, having access to the nearest ambulance to you can provide much needed peace of mind in a worst case scenario.</p>
                </div>
                <div className='col-6 col-md-6 col-12 mt-5'>
                    <img src={newimg1} height="350px" width="350px"></img>

                </div>
                
            </div>
        </div>


        <div className='container mt-4'>
            
        </div>
    
        <br/>
        <div className='container mt-5'>
            <div className='row m-auto'>
                <div className='col-lg-4 col-md-6 col-10 mt-2'>
                    <div className='card box p-3'>
                        <h5 style={{color:'#87CEEB'}}>Healing Presence</h5>
                        <img className='ml-2' height="290px" width="290px" src={img1}></img>
                        
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-10 mt-2'>
                    <div className='card box p-3'>
                        <h5 style={{color:"#FFE5B4"}}>Advance speed</h5>
                        <img className='ml-2' height="290px" width="290px" src={img2}></img>
                    </div>
                </div>
                <div className='col-lg-4 col-md-6 col-10 mt-2'>
                    <div className='card box p-3'>
                        <h5 style={{color:"pink"}}>Fastest Availability</h5>
                        <img className='ml-2' height="290px" width="290px" src={img3}></img>
                    </div>
                </div>
            </div>
        </div>
        <div style={{marginTop:"200px"}}>
            
        </div>
        <div className='container'>
            <div className='row m-auto bg-text'>
            <div className='col-lg-6 col-md-6 col-10'>
                    <img src={Amb} height="350px" width="350px"></img>
                </div>
                <div className='mt-5 col-lg-6 col-md-6 col-10'>
                    <br/>
                    <p>
                        Vehicle equipped with IV supplies, patient bed, stretcher, BP monitor, oxygen delivery devices.
                        Suitable for patients not in moderate condition but require instant medical transportation
                        <ul>
                        <li>Emergency Resuscitation Kit.</li>
                        <li>Ambulance Defibrillator.</li>
                        <li>Transport Ventilator.</li>
                        <li>Transport Monitor.</li>
                        <li>Syringe Infusion Pump.</li>
                        </ul>
                    </p>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default Home