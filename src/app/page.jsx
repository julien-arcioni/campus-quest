import Image from 'next/image';
import Header from '../components/Header';
import Testimonial from '../components/Testimonial';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header/>
            <Testimonial/>
            <a rel="noopener noreferrer" href="/login"
               className="flex items-center px-4">Se connecter</a>
        </main>
    )
}