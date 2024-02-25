import Contact from '@/components/Contact';
import Header from '@/components/Header';

export default function Page() {
    return (
        <div>
            <Header/>
            <div className="flex justify-center items-center h-screen">
                <Contact/>
            </div>
        </div>
    )
}