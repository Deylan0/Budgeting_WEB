import { useEffect, useState } from 'react';
import { useNavigate, NavLink, Outlet} from 'react-router-dom';
import styles from '/src/dashboard.module.css';
import Configuration from './Configuration';


function Dashboard(){
    const [id, setId] = useState<number>();
    const [username, setUsername] = useState<string>();
    const options = [
        {label: 'Configuration', path: 'configuration'},
        {label: 'Overview', path: ''},
    ];
    const navigate = useNavigate();

    const navLinkClass = ({ isActive  }: { isActive: boolean; }) =>
    [
        styles.navLink,
        isActive ? styles.active : ""
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
            <nav className={styles.navList}>
                {options.map((option)=>
                    <NavLink 
                    to={option.path ? `/dashboard/${option.path}` : '/dashboard'}
                    end 
                    key={option.label}
                    className={navLinkClass}
                    >
                        {option.label}
                    </NavLink>
                )}
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Dashboard