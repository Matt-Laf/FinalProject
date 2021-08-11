import React, { useContext, useEffect, useState } from "react"
import { NavLink, useHistory, useParams } from "react-router-dom"
import { UserContext } from "./UserContext"

const SignIn = () => {

  const { name } = useParams
  const {user, setUser, users, setUsers} = useContext(UserContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState("")


  let history = useHistory()



  const findUser = () => {
    let verification = users.find((user) => {
      if (username === user.name && password === user.password) {
        setUser(user)
        localStorage.setItem("loggedInUser", user.name)
        return user.name === username
      }
    })
    if (verification) {
      return history.push("/")
    } else {
      window.alert("User not found")
    }
  }

console.log(users)
console.log(user)

  return (
    <div>
      <form>
        <label>Username <input type="text" onChange={(e) => setUsername(e.target.value)}/></label>
        <label>Password <input type="password" onChange={(e) => setPassword(e.target.value)}/></label>
        <button onClick={findUser}>Login</button>
        
        <NavLink exact to="/sign-up">No Account? Sign up now!</NavLink>
      </form>
    </div>
  )
}

export default SignIn;