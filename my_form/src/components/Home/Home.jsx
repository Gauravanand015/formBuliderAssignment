import './Home.module.css'
import {useNavigate} from 'react-router-dom'
export const Home = () =>{
    const navigate = useNavigate()

    const handleClick = ()=>{
        navigate("/login")
    }   

    return (
        <div>
            <button onClick={handleClick}>Click here to Start</button>
        </div>
    )
}