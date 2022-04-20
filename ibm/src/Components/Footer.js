import React, { useEffect, useState } from 'react';
import './FooterStyle.scss'

const Footer = ()=>{
    const[custom,setCustome] = useState({})

    useEffect(()=>{
        const delay = setTimeout(() => {
            var tem = {
                size:2+Math.random()*4+'rem',
                distance:6+Math.random()*4 +'rem',
                marginLeft:-60+Math.random()*810 +'%', 
                position:-5+Math.random()*110 +'%', 
                time:6+Math.random()*2 +'s', 
                delay:-10*(2+Math.random()*2) +'s'
            }
            setCustome(tem)
        }, 500);
        return ()=>clearTimeout(delay)
    },[])

    return(
        <>
            <div className="main"></div>
              <div className="footer" style={{marginTop:25+'%',marginBottom:'0px'}}>
                  <div className="bubbles">
                          {Array.apply(0, Array(150)).map((x, i)=> {
                              return (
                              <div key={i}>
                                  <div className="bubble" style={{size:2+Math.random()*4+'rem',
                          distance:6+Math.random()*4 +'rem',
                          marginLeft:-60+Math.random()*810 +'%', 
                          position:-5+Math.random()*110 +'%', 
                          time:6+Math.random()*2 +'s', 
                          delay:-10*(2+Math.random()*2) +'s'}}></div>
                              </div>
                              )
                          })}
                  </div>
{/* size:${2+Math.random()*4}rem; --distance:${6+Math.random()*4}rem; --position:${-5+Math.random()*110}%; --time:${2+Math.random()*2}s; --delay:${-1*(2+Math.random()*2)}s; */}
              <div className="content">
                  <div>
                      <b className='text-light'>CopyRight @2022</b>
                      <h3><b>Fast Ambulance</b></h3>
                  </div>
              </div>
          </div>
          <svg style={{position:'fixed', top:100 + 'vh'}}>
              <defs>
                  <filter id="blob">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="blob"></feColorMatrix>
                      <feComposite in="SourceGraphic" in2="blob" operator="atop"></feComposite>
                  </filter>
              </defs>
          </svg>
        </>
    )
}

export default Footer