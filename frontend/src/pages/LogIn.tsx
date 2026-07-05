import { useState } from 'react'
import styles from '/src/logIn.module.css'
import { useNavigate } from 'react-router-dom'

interface LoginInputs  {
  login?: string;
  password?: string;
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
          login: inputs.login?.trim(),
          password: inputs.password?.trim(),
        })
      });

      if (!response.ok) {
        setMessage("Server error, please try again later"); 
        return;
      }

      const data: LoginResponse = await response.json();


      if (data.success) {
        navigate('/dashboard');
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
    <div className={ styles.loginContainer }>
      <form onSubmit={(e) => e.preventDefault()}>
        <label className={ styles.label }>Enter Login:</label>
        <input 
        className={ styles.input }
          type="text"
          name="login"
          value={inputs.login || ''}
          onChange={handleChange}
        />
        <label className={styles.label}>Enter Password:</label>
        <input
          className={ styles.input }
          type="password"
          name="password"
          value={inputs.password || ''}
          onChange={handleChange}
        />
        <br />
        <p className={ styles.errorMessage }>{message}</p>
        <br />
        <button className={ styles.button } type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default LogIn