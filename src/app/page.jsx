"use client";
import Header from '@/components/Header';
import HomeComponent from '@/components/Home';
import BanniereContact from "@/components/BanniereContact";

export default function Home() {
    return (
        <main className="dark:bg-gray-800 dark:text-gray-100">
            <Header/>
            <HomeComponent/>
            <BanniereContact/>
        </main>
    )
}
