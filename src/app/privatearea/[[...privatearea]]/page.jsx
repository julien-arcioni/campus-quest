"use client"
import React, { useState } from 'react';
import Header from "@/components/Header";
import { QrReader } from 'react-qr-reader';

const QRCodeReaderPage = () => {
    const [result, setResult] = useState('');

    const handleScan = data => {
        if (data) {
            setResult(data);
        }
    }

    const handleError = err => {
        console.error(err);
    }

    // Utilisation de paramètres par défaut pour définir les propriétés du composant QrReader
    const qrReaderProps = {
        delay: 300,
        onError: handleError,
        onScan: handleScan,
        style: { width: '100%' }
    };

    return (
        <main className="min-h-screen">
            <Header />
            <div className="mx-auto w-1/6">
                <h1>QR Code Reader</h1>
                <QrReader {...qrReaderProps} />
                <p>{result}</p>
            </div>
        </main>
    );
}

export default QRCodeReaderPage;