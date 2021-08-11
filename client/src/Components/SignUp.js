import React, { useState } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confEmail, setConfEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const user = { name: name, email: email, password: password}

  const newUser = (ev) => {
    ev.preventDefault()
    fetch("/add-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
          if (data.status === 200) {
            setUserStatus(true);
          }
        })
        .catch((err) => {
          console.log(err.message)
          setUserStatus("error");
        })
  };

  const handleClear = () => {
    setName("")
    setEmail("")
    setConfEmail("")
    setPassword("")
    setConfPassword("")
    setUserStatus("")
  }
  console.log(name);
  console.log(password);
  console.log(confPassword);
  console.log(email);
  console.log(confEmail);
  console.log(userStatus)

  return (
    <div>
      <form>
        Username:{" "}
        <input
          placeholder="Desired Username"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        Email:
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        Confirm Email:
        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setConfEmail(e.target.value)}
        />
        Password:
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        Confirm Password:
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setConfPassword(e.target.value)}
        />
        <button onClick={handleClear}>Clear</button>
        <input type="submit" onClick={newUser} />
      </form>
    </div>
  );
};

export default SignUp;
