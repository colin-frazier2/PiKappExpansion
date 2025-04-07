'use client'
import React, { useState, useEffect, useRef } from "react";
// import { IgrLegendModule, IgrDataChartCoreModule, IgrDataChartScatterModule, IgrDataChartScatterCoreModule, IgrDataChartInteractivityModule, IgrDataChartAnnotationModule } from "@infragistics/igniteui-react-charts";
import { IgrCategoryXAxis, IgrCategoryYAxis, IgrDataChart } from "igniteui-react-charts";
// import { IgrLegend, IgrDataChart, IgrNumericXAxis, IgrNumericYAxis, IgrScatterSeries } from "@infragistics/igniteui-react-charts";


// var plotData;
// fetch("http://localhost:5000/chapterData")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     // Parse the JSON response
//     return response.json();
//   })
//   .then(data => {
//     console.log("Data recieved " + data);
//     console.log(data); 
//     plotData = data; 
//   })
//   .catch(error => {
//     // Handle any errors that occurred during the fetch
//     console.error('There was a problem with the fetch operation:', error);
//   });

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/chapterData");
      const jsonData = await response.json();
      // console.log(jsonData); 
      setData(jsonData); 
    }; 

    fetchData(); 
  }, []); 


  return (
    // <div className="container-fill"> 
    //   {
    //     data.map((data) => (
    //       <IgrDataChart
    //         dataSource={data}
    //         // key={data._id}
    //         chartType="Point"
    //         includedProperties={["Fraternities", "Enrollment"]}
    //         xAxisTitle="Value"
    //         yAxisTitle="Value"
    //       >
    //       {/* <IgrCategoryXAxis dataSource={data.Fraternities} key={"xAxis"} />
    //       <IgrCategoryYAxis dataSource={data.Enrollment} key={"yAxis"}/> */}
    //       </IgrDataChart>
    //     ))
    //   }
    // </div>

    <IgrDataChart
    dataSource={data}
    // key={data._id}
    chartType="Point"
    includedProperties={["Fraternities", "Undergrad Enrollment"]}
    xAxisTitle="Value"
    yAxisTitle="Value"
  >
  {/* <IgrCategoryXAxis dataSource={data.Fraternities} key={"xAxis"} />
  <IgrCategoryYAxis dataSource={data.Enrollment} key={"yAxis"}/> */}
  </IgrDataChart>
  );
};

export default ChartComponent;  

// const Plot = () => {
//     // const canvas = useRef(null); 
//     // const [points, setPoints] = useState(); 


//   return (
//     <canvas
//       // ref={canvasRef}
//       // onClick={handleClick}
//       style={{ border: '1px solid #ccc', backgroundColor: '#fff' }}
//     />
//   );
// };

// export default Plot;