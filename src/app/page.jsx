"use client";
import Header from '../components/Header';
import HomeComponent from '../components/Home';

export default function Home() {
    return (
        <main className="min-h-screen dark:bg-gray-800 dark:text-gray-100">
            <Header/>
            <HomeComponent/>
        </main>
    )
}
