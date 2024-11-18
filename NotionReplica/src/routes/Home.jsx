import { useContext } from 'react'
import { UserContext } from '../components/UserContextProvider';

function Home() {
    const { user } = useContext(UserContext)
    return (
        <div>
            <h1> Hello , {user.email}</h1>
        </div>
    );
}

export default Home;