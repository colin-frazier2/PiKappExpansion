// import  useState  from 'react';
'use client'
import React, { useEffect, useState } from "react";
import '../styles/Home.module.css';
import '../app/globals.css'; 
import {getKnnResults} from '../app/service'; 

const Controls = () => {    
  const [k, setK] = useState(3);
  const [numFraternities, setFraternities]  = useState();
  const [numEnrollment, setEnrollment] = useState();
  const [closestNeighbors, setClosestNeighbors] = useState([]);
  const [rec, setRec] = useState(); 

//   const handleKChange = (event) => {
//     setK(parseInt(event.target.value, 10));
//   };

  const handleEnrollChange = (event) => {
    setEnrollment(parseInt(event.target.value, 10)); 
  }

  const handleFraternityChange = (event) => {
    setFraternities(parseInt(event.target.value, 10)); 
  }

  // useEffect(() => {
  //   getKnnResults(numFraternities, numEnrollment)
  //   .then((r) => r.json())
  //   .then((r) => {
  //     setClosestNeighbors(r.distances)
  //   }); 
  // })

  function showRecommendation() {
    if (rec == 0) {
      return "NO GO";
    } else if (rec == 1) {
      return "GO";
    } else {
      return "";
    }
  }



  return (
    <div>
      <label htmlFor="header">Input Data Below</label>
      <div> 
        <label htmlFor="enrollment">Undergraduate Enrollment (in Thousands)</label>
        <input
            type="number"
            id="Enrollment"
            onChange={handleEnrollChange}
            value={numEnrollment}
            min="1"
            // style={{textarea: '#000000', color: '#000000', maxWidth: "100px"}}
            className="numInput"
        />
        <br></br>
        <label htmlFor="fraternities"> IFC Fraternities on Campus</label>
        <input 
            type="number"
            id="fraternities"
            onChange={handleFraternityChange}
            value={numFraternities}
            min="1"
            className="numInput"
            /> 
        </div>
        <div>
      <button type="button" className= "btn"
        onClick={() => {
          console.log("Fraternities: " + numFraternities); 
          console.log("Enrollment: " + numEnrollment);
          fetch("http://localhost:5000/runKnn?fraternities=" + numFraternities + "&enrollment=" + numEnrollment)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
          })
          .then(data => {
            console.log("Data recieved " + data);
            console.log(data);
            setClosestNeighbors(data.nearest_schools); 
            setRec(data.prediction); 
          })
          .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
          });

        }}
        
      >
        Add Point
      </button>
      </div>
    <h2> <b> Closest Neighbors: </b> </h2>
      <ul> {closestNeighbors.map((item) => (
        <li key={item._id}> Name: {item.Name} ... Fraternities: {item.Fraternities} ... Enrollment: {item['Undergrad Enrollment']} ... Model: {item.Model} </li>
      ))}
      </ul>
      <h2> <b>Recommendation:</b>{showRecommendation()}  </h2>

    </div>
  );
};

export default Controls;
