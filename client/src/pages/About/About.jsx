import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import './About.css'
import graphPng from './graph.png'
import spinner from '../../assets/pulse-1.1s-200px.svg';


const About = () => {

  const navigate = useNavigate();

  
  return (
    <div>
      <NavBar />
      <main>
        <section>
          <div className='about-hero'>
            <div className='about-hero-left'>
              <div>LambdaPulse is your solution to monitoring AWS Lambda X-Ray Traces.</div>
                <Link to='/signup'>
                <button className='about-signup-btn' style={{width: '10em'}}>Sign Up</button>
                </Link>
            </div>
            <div className='about-hero-right'>
              <img src={graphPng} width='500vh'></img>
            </div>
          </div>

        </section>
        <section>
        <div className='about-features'>
            <div className='about-features-left'>
              <img src={spinner}  />
            </div>
            <div className='about-features-right'>
              <h4>Features</h4>
              <ul>
                <li>Persist traces beyond X-ray's built in time horizon</li>
                <li>View and filter traces by date & time range</li>
                <li>Visualize traces</li>
                <li>Find and view errors</li>
                <li>View detailed logs per trace</li>
                <li>Visualize system graph</li>
              </ul>            
            </div>
          </div>
        </section>
        <section>
          <div className='about-hero'>
            <div className='about-hero-left'>
             
            </div>
            <div className='about-hero-right'>
              
            </div>
            
          </div>
          <div className='about-cta'>
            <Link to='/signup'>
              <button className='about-signup-btn' style={{width: '20em',height: '4em'}}>Sign Up Now</button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
