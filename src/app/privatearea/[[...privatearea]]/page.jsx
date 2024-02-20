"use client"
import React, {useState} from 'react';
import Header from "@/components/Header";
import QrReader from 'modern-react-qr-reader'

const QRCodeReaderPage = () => {

    const [result, setResult] = useState('No result');

    const handleScan = data => {
        if (data) {
            setResult(data);
        }
    }

    const handleError = err => {
        console.error(err)
    }

    return (
        <main className="min-h-screen">
            <Header/>
            <div>
                <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={handleError}
                    onScan={handleScan}
                    style={{width: '100%'}}
                />
                <p>{result}</p>
            </div>
        </main>
    );
}

export default QRCodeReaderPage;
