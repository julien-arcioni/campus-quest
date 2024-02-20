"use client";
import Header from '../components/Header';
import Testimonial from '../components/Testimonial';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header/>
            <p>Prêt à relever le défi ? Commence ton exploration dès aujourd'hui !</p>
            <div className="mx-auto mt-4">
            <a href="/privatearea"
               className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md mt-4">Commencer</a>

            <a href="/quest"
               className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-md mt-4">Me géolocaliser</a>
            </div>
            {/*<Testimonial/>*/}
        </main>
    )
}
