import React, { useEffect, useState } from "react"

const Classes = () => {
  let [classes, setClasses] = useState(undefined)
  const [ID, setID] = useState(0)

  const fetchClasses = async () => {
    const apiCall = await fetch("https://www.dnd5eapi.co/api/classes")
    const data = await apiCall.json()
    setClasses(data.results)
  }

  useEffect(() => {
    fetchClasses()
  }, [ID])

  classes && console.log(classes)



  return (
    <div>
      {classes &&
    <div>
      {classes.map((job) => {
        return (
          <div>
          {job.name}
          </div>
        )
      })}
    </div>
    }
    </div>
    
    
  )
}

export default Classes;