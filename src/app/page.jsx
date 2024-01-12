import Image from 'next/image';
import Header from '../components/Header';
import Testimonial from '../components/Testimonial';

export default function Home() {
    return (
        <main className="min-h-screen">
            <Header />
            <Testimonial />
        </main>
    )
}
