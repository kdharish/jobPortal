import React from "react";
import staricData from "./staticdata.json";
import { useState } from "react";
function Home() {
 const [jobList,setjoblist ] = useState(staricData);




  return( 
      <>
          <h1 className="text-center text-2xl mt-10">Welcome Employee</h1>;
          <ul>
              {
                  jobList.map((job) => {
                    console.log(job,"----")
                     return  (
                        <div className="border-2 border-gray-300 rounded-md p-4">
                            <h3>{job.title}</h3>
                            <h4>{job.company}</h4>
                            <h5>{job.location}</h5>
                            <h5>{job.experience}</h5>
                            <h5>{job.salary}</h5>
                            <h6>{job.job_type}</h6>
                            <h6>{job.posted}</h6>
                            </div>
                     
                    )
                     
                })
              }
          </ul>
      </>
  )
}

export default Home;