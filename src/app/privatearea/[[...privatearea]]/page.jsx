"use client"
import React, {useState, useEffect} from 'react';
import Header from "@/components/Header";
import QrReader from 'modern-react-qr-reader';
import {useGeolocated} from "react-geolocated";
import Testimonial from "@/components/Testimonial";
import BanniereContact from "@/components/BanniereContact";

const QRCodeReaderPage = () => {
    return (
        <main className="min-h-screen dark:bg-gray-800 dark:text-gray-100">
            <Header/>
            <div className="data-bdd dark:bg-gray-800 dark:text-gray-100">
                <h1 className="text-center font-bold text-2xl">Voici vos quêtes disponibles</h1>
                <Testimonial/>
            </div>
            <BanniereContact/>
        </main>
    );
}

export default QRCodeReaderPage;
