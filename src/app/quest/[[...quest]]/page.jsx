"use client"
import React, {useState, useEffect} from 'react';
import Header from "@/components/Header";
import { useGeolocated } from "react-geolocated";

const Geoloc = () => {
    // utiliser le hook useGeolocated pour obtenir les données de géolocalisation
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setHydrated(true);
    }, []);

    if (!hydrated) {
        return null;
    }

    const renderMessage = () => {
        if (!isGeolocationAvailable) {
            return <p>Votre navigateur ne supporte pas la géolocalisation</p>;
        } else if (!isGeolocationEnabled) {
            return <p>La géolocalisation n'est pas activée</p>;
        } else if (coords) {
            return (
                <div>
                    <p>Latitude : {coords.latitude}</p>
                    <p>Longitude : {coords.longitude}</p>
                </div>
            );
        } else {
            return <p>En attente des données de géolocalisation…</p>;
        }
    };

    return (
        <main className="min-h-screen dark:bg-gray-800 dark:text-gray-100">
            <Header/>
            <div className="mx-auto w-1/6">
                {renderMessage()}
            </div>
        </main>
    );

}
export default Geoloc;
