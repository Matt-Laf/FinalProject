import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


const Weapons = () => {
  const history = useHistory()
  const [weapons, setWeapons] = useState("")
  const [ID, setID] = useState(0)

  const fetchWeapons = async () => {
    const apiCall = await fetch("https://api.open5e.com/weapons")
    const data = await apiCall.json()
    setWeapons(data.results)
    console.log(data.results)
  }

  useEffect(() => {
    fetchWeapons();
  }, [ID]);

  return (
    weapons &&
    <div>
      {weapons.map((weapon, i) => {
        return (
          <div>
            <div>{weapon.name}</div>
            <div>{weapon.category}</div>
            <div>{weapon.damage_dice}</div>
            <div>{weapon.damage_type}</div>
            <div>properties: {weapon.properties}</div>
          </div>
        )
      })}
    </div>
  )
}
  

export default Weapons;