import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components"
import Footer from "../Footer"

const Classes = () => {
  let [classes, setClasses] = useState(undefined)
  const [ID, setID] = useState(0)

  const history = useHistory()

  

  const fetchClasses = async () => {
    const apiCall = await fetch("https://api.open5e.com/classes")
    const data = await apiCall.json()
    setClasses(data.results)
  }

  useEffect(() => {
    fetchClasses()
  }, [ID])
  
const getClass = (slug) => {
    history.push(`/classes/${slug}`)
  }
  classes && console.log(classes)



  return (
    <Wrapper>
      {classes &&
    <Container>
      {classes.map((job) => {
        return (
          <ClassName onClick={() => {
            getClass(job.slug)
          }} >
          {job.name}
          </ClassName>
        )
      })}
    </Container>
    }
    <Footer />
    </Wrapper>
    
    
  )
}

const ClassName = styled.h1`
  border-bottom: 2px solid rgba(0,0,0,.2);
  max-width: 225px;
  font-size: 32px;
  margin-right: 50px;
  &:hover {
    font-weight: bolder;
    font-size: 40px;
    border-bottom: 3px solid rgba(0,0,0);
  }
  cursor: pointer;
`

const Container = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

`

const Wrapper = styled.div`
  height: 82vh;
`

export default Classes;