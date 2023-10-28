import { React}  from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
        // this prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
          access: username,
          secret: password
        };

        fetch("https://huff-movies-aa259f3af035.herokuapp.com/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then ((data) => {
          console.log("Login Response:", data);
          if (data.user){
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("No Such User");
          }
        })
        .catch((e) => {
          alert("Something went wrong");
        });
      };
      // import { React } from "react";
      // import { useState } from 'react';
      // import  axios  from "axios";

      //   async function fetchLogin(onLoggedIn, userData, setShowErrorMessage, setErrorMessage) {
      //     axios
      //       .post(`https://huff-movies-aa259f3af035.herokuapp.com/login`, {
      //         Username: userData.Username,
      //         Password: userData.Password,
      //       })
      //       .then((response) => {
      //         localStorage.setItem('user', JSON.stringify(response.data.user));
      //         localStorage.setItem('token', response.data.token);
      //         onLoggedIn(response.data.user, response.data.token);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //         setShowErrorMessage(true);
      //         setErrorMessage('Username or Password was incorrect');
      //       });
      //   }

      //   export default function LoginView({ onLoggedIn }) {
      //     const [username, setUsername] = useState('');
      //     const [password, setPassword] = useState('');

        
      //     const handleSubmit = (event) => {
      //       event.preventDefault();
        
      //       if (username === '' || password === '') {
      //         setShowErrorMessage(true);
      //         setErrorMessage('Please fill in all required* fields');
      //         return;
      //       }
        
      //       const userData = {
      //         Username: username,
      //         Password: password,
      //       };
        
      //       fetchLogin(onLoggedIn, userData, setShowErrorMessage, setErrorMessage);
      //     };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        minLength="6"
        maxLength="15"
         />
      </label>
      <label>
        Password:
        <input type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required
        minLength="5"
        maxLength="15"


        />
      </label>
      <button type="submit">
        Submit
      </button>
    </form>
  );

}
