import { useState } from 'react'
import '/src/logIn.css'
import { useNavigate } from 'react-router-dom'

interface LoginInputs  {
  login?: string;
  password: string;
}

interface LoginResponse  {
  success: boolean;
  message: string | "";
  username?: string;
}

function LogIn() {
  const [inputs, setInputs] = useState<LoginInputs>({});
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try{
      const response = await fetch("/login.php", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({
          login: inputs.login,
          password: inputs.password,
        })
      });

      if (!response.ok) {
        setMessage("Server error, please try again later"); 
        return;
      }

      const data: LoginResponse = await response.json();


      if (data.success) {
        navigate('/dashboard/'+data.username);
      } else {
        setMessage(data.message);
      }
    }catch (error) {
      if (error instanceof Error) {
      setMessage(`${error.message}`);
    } else {
      setMessage("Unknown error contact admin");
    }
    }
  
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Enter Login:</label>
        <input
          type="text"
          name="login"
          value={inputs.login || ''}
          onChange={handleChange}
        />
        <label>Enter Password:</label>
        <input
          type="password"
          name="password"
          value={inputs.password || ''}
          onChange={handleChange}
        />
        <br />
        <p style={{ color: "red" }}>{message}</p>
        <br />
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default LogIn