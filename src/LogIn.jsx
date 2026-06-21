import { useState } from 'react'
import './logIn.css'

function LogIn() {
  const [inputs, setInputs ] = useState({})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values =>({...values, [name]: value}))
  }
  return (
    <div>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "350px",left: "200px", rotate: "30deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "670px",left: "670px", rotate: "67deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "210px",left: "700px", rotate: "69deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "800px",left: "578px", rotate: "50deg"}}/>
      <img className="pajonczek" src="src/assets/kochaniemoje.png" style={{top: "905px",left: "008px", rotate: "18deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "172px",left: "007px", rotate: "19deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "200px",right: "470px", rotate: "30deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "900px",right: "156px"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "455px",right: "635px", rotate: "79deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "455px",right: "595px", rotate: "79deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "455px",right: "685px", rotate: "79deg"}}/>
      <img className="pajonczek" src="src/assets/pajonczek.png" style={{top: "200px",right: "470px", rotate: "30deg"}}/>
      <form>
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
        <button type="submit" name="submitbutton">Submit</button>
      </form>
    </div>
  )
}

export default LogIn
