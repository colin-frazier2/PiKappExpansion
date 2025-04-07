const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


export const getKnnResults = async (numFraternities, numEnrollment) => {
    try {
        const params = new URLSearchParams({
            fraternities: numFraternities,
            enrollment: numEnrollment
        }); 
        const url = `http://localhost:5000/runKnn?${params}`;
        const response = await fetch(url);
        return response.json(); 
    }
    catch (error) {
        // Handle any errors that occurred during the fetch
        // console.error('There was a problem with the fetch operation:', error);
        console.error('An error occurred: ', error); 
    }
}