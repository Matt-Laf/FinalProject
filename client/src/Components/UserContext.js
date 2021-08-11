import React, { createContext, useEffect, useState } from "react"

export const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const [userByName, setUserByName] = useState(null)

  // useEffect(() => {
  //   fetch("/users/:name")
  //     .then((res) => res)
  //     .then((data) => {
  //       setUser(data.data)
  //     })
  // }, [user])

  useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data)
        setUser(data.data[2])
        console.log(data.data)
      }).catch(err => {
        console.log("error message" + err.message)
      }) 
  }, [])

  // useEffect(() => {
  //   fetch("/users")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data.data);
  //       let storedUser = localStorage.getItem("loggedInUser")
  //       if (storedUser) {
  //         let findUser = data.data.find((user) => {
  //           return user.name === storedUser
  //         })
  //         if (findUser) {
  //           setUser(user)
  //           console.log(user)
  //         }
  //       }
  //     });
  // }, []);
  return (
    <UserContext.Provider
      value = {{
        user, 
        setUser,
        userByName,
        setUserByName,
        users,
        setUsers
      }}>
        {children}
      </UserContext.Provider>
  )
}