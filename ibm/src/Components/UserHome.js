import React, { useEffect, useState } from 'react';
import useGeoLocation from './useGeoLocation';
import SimpleMap from './Map';

const UHome = ()=>{
    const location = useGeoLocation();
    
    console.log(location,'the location here .......');
    
    return(
        <>
        {
            location.loaded?
            <div>
                <h1>
                    Welcome User..!
                </h1>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-6 col-12 border map'>
                            <SimpleMap lat={location.coordinates.lat} log={location.coordinates.lng}/>
                        </div>
                        <div className='col-lg-6 col-12'>
                            <h4>list of ambulances!</h4>
                            {/* <div id='newMessage'></div> */}
                        </div>
                    </div>

                </div>
            </div>
            :
            <div>
                <h1>Loading......</h1>
            </div>
        }
        </>
    )
}

export default UHome; 