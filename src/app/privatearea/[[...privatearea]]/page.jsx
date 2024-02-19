"use client"
import React, { useState } from 'react';
import Header from "@/components/Header";
import { QrReader } from 'react-qr-reader';

const QRCodeReaderPage = () => {
    const [result, setResult] = useState('');
    const [facingMode, setFacingMode] = useState('user');

    const handleScan = data => {
        if (data) {
            setResult(data);
        }
    }

    const handleError = err => {
        console.error(err);
    }

    const toggleFacingMode = () => {
        setFacingMode(prevMode => (prevMode === 'user' ? 'environment' : 'user'));
    };

    // Utilisation de paramètres par défaut pour définir les propriétés du composant QrReader
    const qrReaderProps = {
        delay: 300,
        onError: handleError,
        onScan: handleScan,
        style: { width: '100%' },
        facingMode: facingMode
    };

    return (
        <main className="min-h-screen">
            <Header />
            <div className="mx-auto w-1/6">
                <h1>QR Code Reader</h1>
                <QrReader {...qrReaderProps} />
                <p>{result}</p>
                <button onClick={toggleFacingMode}>Changer de caméra</button>
            </div>
        </main>
    );
}

export default QRCodeReaderPage;