import React, { useEffect, useState } from "react"

const Library = () => {
  let [libraries, setLibraries] = useState(undefined)
  const [libraryID, setLibraryID] = useState(0)
  // useEffect(() => {
  //   fetch("https://www.dnd5eapi.co/api")
  //     .then((res) => {
  //       res.json()
  //     })
  //     .then((data) => {
  //       setLibraries(data)
  //     })
  // }, [])
  const fetchLibraries = async () => {
    const apiCall = await fetch("https://www.dnd5eapi.co/api")
    const data = await apiCall.json()
    const test = Object.keys(data)
    setLibraries(test)
  }

  useEffect(() => {
    fetchLibraries()
  }, [libraryID])

  libraries && console.log(libraries)



  return (
    <div>
      {libraries &&
    <div>
      {libraries.map((library) => {
        return (
          <div>
          {library}
          </div>
        )
      })}
    </div>
    }
    </div>
    
    
  )
}

export default Library;