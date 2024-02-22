"use client"
import React, {useState, useEffect} from 'react';
import Header from "@/components/Header";
import QrReader from 'modern-react-qr-reader';
import {useGeolocated} from "react-geolocated";
import Testimonial from "@/components/Testimonial";

const QRCodeReaderPage = () => {
    return (
        <main className="min-h-screen">
            <Header/>
            <div className="data-bdd">
                <h1 className="text-center font-bold text-2xl">Voici vos quêtes disponibles</h1>
                <Testimonial/>
            </div>
        </main>
    );
}

export default QRCodeReaderPage;
