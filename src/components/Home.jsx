import React from 'react';
import {useUser} from '@clerk/clerk-react';
import {useEffect} from 'react';

const HomeComponent = () => {

    return (
        <main className="min-h-screen dark:bg-gray-800 dark:text-gray-100">
            <section>
                <div className="dark:bg-violet-400">
                    <div
                        className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-900">
                        <h1 className="text-5xl font-bold leadi sm:text-6xl xl:max-w-3xl dark:text-gray-900">
                            Commencez votre aventure dès maintenant
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 xl:max-w-3xl dark:text-gray-900">
                            Découvrez des quêtes à réaliser dans votre campus, entre amis ou entre collègues.
                        </p>
                        <div className="flex flex-wrap justify-center">
                            <a href="/privatearea"
                                    className="px-8 py-3 m-2 text-lg font-semibold rounded dark:bg-gray-800 dark:text-gray-50">Commencer
                            </a>
                            <a href="/quest"
                                    className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-700 dark:text-gray-900">Me géolocaliser
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomeComponent;