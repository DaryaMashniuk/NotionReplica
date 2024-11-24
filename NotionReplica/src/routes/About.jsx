import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserContextProvider';

function About() {
    const { user } = useContext(UserContext);

    return (
        <div className="bg-white text-black p-4 about-me rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">About me</h1>
            <p className="text-lg">Email: {user.email}</p>
            <p className="text-lg">Name: {user.name}</p>
            <p className="text-lg">Nickname: {user.nickname}</p>
            <p className="text-lg">Age: {user.age}</p>
            <p className="text-lg">Gender: {user.gender}</p>
            <p className="text-lg">Date sign up: {user.registerDate}</p>
            <Link to="/notes" className="bg-gray-200 text-black py-2 px-4 rounded mt-4 inline-block hover:bg-gray-800 ">
                Go to notes
            </Link>
        </div>
    );
}

export default About;