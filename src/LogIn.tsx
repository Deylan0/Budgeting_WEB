import { useState } from 'react'
import './logIn.css'
import { useNavigate } from 'react-router-dom'

interface LoginInputs  {
  login?: string;
  password?: string;
}

interface LoginResponse  {
  success: boolean;
  message: string;
}

function LogIn() {
  const [inputs, setInputs] = useState<LoginInputs>({});
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (): Promise<void> => {
    const response = await fetch("http://localhost/BudgetingWeb/api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ⚠️ poprawiono "applications" → "application"
      body: JSON.stringify({
        login: inputs.login,
        password: inputs.password,
      })
    });
    const data: LoginResponse = await response.json();
    if (data.success) {
      setMessage("");
      navigate("/");
    } else {
      setMessage(data.message);
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