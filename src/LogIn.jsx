import { useState } from 'react'
import './logIn.css'
import { useNavigate } from 'react-router-dom'

function LogIn() {
  const [inputs, setInputs ] = useState({})

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (inputs.login === "admin" && inputs.password === "2caba41d2fc2"){
      navigate("/");
    }else{
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values =>({...values, [name]: value}))
  }
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Enter Login:</label>
        <input
        type="text"
        name="login"
        value={inputs.login}
        onChange={handleChange}
        />
        <label>Enter Password:</label>
        <input
        type="text"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        />
        <br/>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default LogIn
