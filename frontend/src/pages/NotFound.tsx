import sadPepe from '/src/assets/sadPepe.png';
import { Link } from 'react-router-dom';

function NotFound(){
    return(
        <>
            <p style={{fontSize: "60px", margin: "20px"}}>HELLO!!! Looks like you tried to acces page that doesn't exist</p>
            <img src={sadPepe} style={ { width: '1400px', margin: '20px auto' } }/>
            <Link to="/" style={{fontSize: "40px", margin: "20px", backgroundColor: "rgba(255, 0, 0, 0.8)", borderRadius:"10px", color: "rgba(0, 0, 0, 1)"}}>
                GO HOME
            </Link>
            
        </>
    );
};

export default NotFound