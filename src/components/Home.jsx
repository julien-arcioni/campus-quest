import React from 'react';
import {useUser} from '@clerk/clerk-react';
import {useEffect} from 'react';

const HomeComponent = () => {

    return (
        <main className="min-h-screen dark:bg-gray-800 dark:text-gray-100">
            <p>Prêt à relever le défi ? Commence ton exploration dès aujourd'hui !</p>
            <div className="mx-auto mt-4">
                <a href="/privatearea"
                   className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md mt-4">Commencer</a>

                <a href="/quest"
                   className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md mt-4">Me géolocaliser</a>
            </div>
        </main>
    );
};

export default HomeComponent;