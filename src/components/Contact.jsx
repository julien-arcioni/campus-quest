import React from 'react';
const Contact = () => {
    return (
        <main className="min-h-screen dark:bg-gray-800 dark:text-gray-100">
        <div
            className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100">
            <div className="flex flex-col justify-between">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold leadi lg:text-5xl">Contactez-nous</h2>
                    <div className="dark:text-gray-400">Une question ou une demande au support ? Ecrivez-nous !</div>
                </div>
                {/*<img src="assets/svg/doodle.svg" alt="" className="p-6 h-52 md:h-64"/>*/}
            </div>
            <form noValidate="" className="space-y-6">
                <div>
                    <label htmlFor="name" className="text-sm">Nom Prénom</label>
                    <input id="name" type="text" placeholder="" className="mt-2 dark:border dark:border-white w-full p-3 rounded dark:bg-gray-800"/>
                </div>
                <div>
                    <label htmlFor="email" className="text-sm">Email</label>
                    <input id="email" type="email" className="dark:border dark:border-white w-full p-3 mt-2 rounded dark:bg-gray-800"/>
                </div>
                <div>
                    <label htmlFor="message" className="text-sm">Message</label>
                    <textarea id="message" rows="3" className="mt-2 dark:border dark:border-white w-full p-3 rounded dark:bg-gray-800"></textarea>
                </div>
                <button type="submit"
                        className="w-full p-3 text-sm font-bold tracki uppercase rounded dark:bg-violet-400 dark:text-gray-900">Envoyer
                </button>
            </form>
        </div>
        </main>
    );
};

export default Contact;
