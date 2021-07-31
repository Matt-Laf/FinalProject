import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const Job = () => {
  const { index } = useParams()
  let [job, setJob] = useState(undefined)
  const [proficiency, setProficiency] = useState(undefined)
  const [ID, setID] = useState(0)

  const fetchJob = async () => {
    const apiCall = await fetch(`https://www.dnd5eapi.co/api/classes/${index}`)
    const data = await apiCall.json()
    setJob(data)
    setProficiency(data.proficiency_choices[0].from)
  }

  useEffect(() => {
    fetchJob()
  }, [ID])

  job && console.log(job.proficiencies)
  proficiency && console.log(proficiency)


  return (
    <div>
      {job && proficiency &&
    <div>
      <div>{job.name}</div>
      <div>Hit Die: {job.hit_die}</div>
      <div>
        Proficencies: 
        <div>Choose {job.proficiency_choices[0].choose}</div>
        <div>{proficiency.map((choice) => {
          return (
            <div>{choice.name.slice(7)}</div>
          )
        })}</div>
      </div>
      
    </div>
    }
    </div>
    
    
  )
}

export default Job;