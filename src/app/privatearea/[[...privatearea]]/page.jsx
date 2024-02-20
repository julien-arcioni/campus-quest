"use client"
import React, {useState} from 'react';
import Header from "@/components/Header";

const QRCodeReaderPage = () => {
    return (
        <main className="min-h-screen">
            <Header/>
            <div className="mx-auto w-1/6">
                <h1>QR Code Reader</h1>
            </div>
        </main>
     );

}

export default QRCodeReaderPage;