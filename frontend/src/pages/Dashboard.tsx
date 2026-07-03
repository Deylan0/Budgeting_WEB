import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '/src/dashboard.css';

function Dashboard(){
    
    const params = useParams<{user_id: string}>();

    return(
        <div>
            <div className='Header'>
                <p>Hello {params.user_id} </p>
            </div>
        </div>
    )
}

export default Dashboard