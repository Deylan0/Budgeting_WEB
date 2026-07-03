import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '/src/dashboard.css';

function Dashboard(){
    const [id, setId] = useState<number>();
    const [username, setUsername] = useState<string>();

    const navigate = useNavigate();

    useEffect(()=>{
        fetch("/userData.php", { credentials: "include"})
        .then(res => res.json())
        .then(data =>{
            if(data.loggedIn){
                setId(data.userId);
                setUsername(data.username);
            }else{
                navigate("/notfound")
            }
        })
        .catch(err => {
        console.error("Failed to check session:", err);
        navigate('/notfound');
        });

    },[])
    
    return(
        <div>
            <div className='Header'>
                <p>Hello  { username }</p>
            </div>
        </div>
    )
}

export default Dashboard