import React from 'react';

const Testimonial = () => {
    return (
        <section className="dark:bg-gray-800 dark:text-gray-100">
            <main className="container mx-auto mt-10">
                <section className="mb-10">
                    <h2 className="text-2xl font-bold">C'est parti !</h2>
                    <p>Connecte-toi ou crée un compte pour commencer ton aventure.</p>
                </section>

                <section className="py-6 sm:py-12 dark:bg-gray-800 dark:text-gray-100">
                    <div className="container p-6 mx-auto space-y-8 flex flex-col align-center">
                        <div className="space-y-2 text-center">
                            <h2 className="text-3xl font-bold">Fonctionnalités de Campus Quest</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                            <article className="flex flex-col dark:bg-gray-900">
                                <a rel="noopener noreferrer" href="#"
                                   aria-label="Te nulla oportere reprimique his dolorum">
                                    <img alt="" className="object-cover w-full h-52 dark:bg-gray-500"
                                         src="https://source.unsplash.com/200x200/?fashion?1"/>
                                </a>
                                <div className="flex flex-col flex-1 p-6">
                                    <a rel="noopener noreferrer" href="#"
                                       aria-label="Te nulla oportere reprimique his dolorum"></a>
                                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">Remplis des quêtes</h3>
                                </div>
                            </article>
                            <article className="flex flex-col dark:bg-gray-900">
                                <a rel="noopener noreferrer" href="#"
                                   aria-label="Te nulla oportere reprimique his dolorum">
                                    <img alt="" className="object-cover w-full h-52 dark:bg-gray-500"
                                         src="https://source.unsplash.com/200x200/?fashion?2"/>
                                </a>
                                <div className="flex flex-col flex-1 p-6">
                                    <a rel="noopener noreferrer" href="#"
                                       aria-label="Te nulla oportere reprimique his dolorum"></a>
                                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">Suivi de ton avancement</h3>
                                </div>
                            </article>
                            <article className="flex flex-col dark:bg-gray-900">
                                <a rel="noopener noreferrer" href="#"
                                   aria-label="Te nulla oportere reprimique his dolorum">
                                    <img alt="" className="object-cover w-full h-52 dark:bg-gray-500"
                                         src="https://source.unsplash.com/200x200/?fashion?3"/>
                                </a>
                                <div className="flex flex-col flex-1 p-6">
                                    <a rel="noopener noreferrer" href="#"
                                       aria-label="Te nulla oportere reprimique his dolorum"></a>
                                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">Une expérience immersive</h3>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section className="flex items-center flex-col">
                    <p>Prêt à relever le défi ? Commence ton exploration dès aujourd'hui !</p>
                    <a href="/privatearea"
                       className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md mt-4">Commencer</a>

                    <a href="/quest"
                       className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md mt-4">Me géolocaliser</a>
                </section>
            </main>
        </section>
    );
};

export default Testimonial;
