import { useEffect, useState } from 'react';
import { useNavigate, NavLink, Outlet} from 'react-router-dom';
import styles from '/src/dashboard.module.css';


function Dashboard(){
    const [id, setId] = useState<number>();
    const [username, setUsername] = useState<string>();
    const options = ['configuration', 'dashboard'];
    const navigate = useNavigate();

    const navLinkClass = ({ isActive, isPending, isTransitioning }: {
    isActive: boolean;
    isPending: boolean;
    isTransitioning: boolean;
    }) =>
    [
        styles.navLink,
        isActive ? styles.active : "",
        isPending ? styles.pending : "",
        isTransitioning ? styles.transitioning : "",
    ].join(" ");

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
        <div className={styles.dashboardDiv}>
            <header className={ styles.header}>
                <h1>Hello  { username }. Welcome to your budged managing dashboard!</h1>
            </header>
            <nav className={styles.navOptions}>
                {options.map((option)=>
                    <NavLink 
                    to={`/dashboard/${option}`} 
                    end 
                    key={option}
                        className={navLinkClass}
                    >
                        {option}
                    </NavLink>
                )}
            </nav>
            <Outlet />
        </div>
    )
}

export default Dashboard