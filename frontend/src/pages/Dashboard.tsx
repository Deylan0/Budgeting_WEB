import { useEffect, useState, useRef } from 'react';
import { useNavigate, NavLink, Outlet, useOutletContext, data} from 'react-router-dom';
import styles from '/src/dashboard.module.css';

interface Category {
    id: number;
    name: string;
    monthly: number;
    goal: number;
}

function Dashboard(){
    const [username, setUsername] = useState<string>();
    const [categories, setCategories] = useState<Category[]>([]);
    const isDataLoaded = useRef(false);
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
                setUsername(data.username);
            }else{
                navigate("/notfound")
            }
        })
        .catch(err => {
        console.error("Failed to check session:", err);
        navigate('/notfound');
        });

        fetch("/pullCategories.php", { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            setCategories(data.categories);
            isDataLoaded.current = true;
        })
        .catch(err => {
            console.error("Failed to fetch categories:", err);
        });

    },[])

    useEffect(()=>{
        if (!isDataLoaded.current) {
            return;
        }
        const updateCategories = async () =>{
            const response = await fetch("/updateCategories.php", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({categories: categories})
            });

            if (!response.ok) {
            console.log("Server error, please try again later"); 
            return;
            }
        }
        const timeoutId = setTimeout(() => {
            updateCategories();
        }, 1000)
        return () => clearTimeout(timeoutId);
        
    },[categories])


    
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
                <Outlet  context={[categories, setCategories] as [Category[], React.Dispatch<React.SetStateAction<Category[]>>] }/>
            </main>
        </div>
    )
}

export default Dashboard

export function useCategories(){
    return useOutletContext<[Category[], React.Dispatch<React.SetStateAction<Category[]>>]>();
}