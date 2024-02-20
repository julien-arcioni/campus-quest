"use client"
import React, {useState, useEffect} from 'react';
import Header from "@/components/Header";
import QrReader from 'modern-react-qr-reader';
import {useGeolocated} from "react-geolocated";

const QRCodeReaderPage = () => {

    const [result, setResult] = useState(null);

    const campusPosition = {
        // latitude: 49.20091715716765,
        // longitude: -0.3499711869506036
        latitude: 49.177989,
        longitude: -0.389227
    };

    const positionOptions = {
        enableHighAccuracy: true,
        timeout: 10000
    };

    const {coords, isGeolocationAvailable, isGeolocationEnabled} = useGeolocated(positionOptions);
    const distanceThreshold = 1000; // en mètres

    const deg2rad = (deg) => {
        return deg * Math.PI / 180;
    }

    const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Rayon de la terre en mètres
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance en mètres
        return d;
    }

    const renderMessage = () => {
        if (!isGeolocationAvailable) {
            // return <p>Votre navigateur ne supporte pas la géolocalisation</p>;
            return -1;
        } else if (!isGeolocationEnabled) {
            // return <p>La géolocalisation n'est pas activée</p>;
            return -1;
        } else if (coords) {
            const distance = getDistanceFromLatLonInKm(campusPosition.latitude, campusPosition.longitude, coords.latitude, coords.longitude);
            if (distance <= distanceThreshold) {
                // return <p>Vous êtes sur le campus</p>;
                return 1;
            } else {
                // return <p>Vous êtes à {distance} mètres du campus</p>;
                return 0;
            }
        } else {
            // return <p>En attente des données de géolocalisation…</p>;
            return -1;
        }
    }

    const handleScan = data => {
        if (data) {
            setResult(data);
        }
    }

    const handleError = err => {
        console.error(err)
    }

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    return (
        <main className="min-h-screen">
            <Header/>
            <div className="mx-auto w-1/6">
                {renderMessage() === 1 ? (
                    <QrReader
                    delay={300}
                    facingMode={"environment"}
                    onError={handleError}
                    onScan={handleScan}
                    style={{width: '100%'}}
                />
                ) : renderMessage() === 0 ? (
                <p>Vous êtes à plus de {distanceThreshold} mètres du campus</p>
                ) : (
                <p>Géolocalisation non disponible ou pas activée</p>
                )}
                <p>{result}</p>
            </div>
        </main>
    );
}

export default QRCodeReaderPage;
