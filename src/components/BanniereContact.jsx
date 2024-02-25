import React from 'react';

const BanniereContact = () => {
    return (
        <section className="py-6 dark:bg-gray-800 dark:text-gray-50">
            <div
                className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:flex-row lg:justify-between">
                <h1 className="text-3xl font-semibold leadi text-center lg:text-left">Une question ou une demande ? Contactez-nous !</h1>
                <a href="/contact"
                    className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Nous contacter
                </a>
            </div>
        </section>
    );
};

export default BanniereContact;
