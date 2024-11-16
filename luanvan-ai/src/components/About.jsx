// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();

    const handleIndexClick = () => {
        navigate('/');
    };

    return (
        <div className="about-container">
            <h1>About Us</h1>
            <button
                className="rounded-lg p-2 text-xs bg-green-200 hover:bg-green-300 mr-4 text-black"
                onClick={handleIndexClick}
            >
                Trở về trang chủ
            </button>
        </div>
    );
}

export default About;