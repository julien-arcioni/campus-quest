import React, {useEffect, useState} from 'react';
import QrReader from 'modern-react-qr-reader';
import {useGeolocated} from "react-geolocated";
import Modal from 'react-modal';

const Testimonial = () => {
    const [quests, setQuests] = useState([]);
    const [showQrReader, setShowQrReader] = useState(false);
    const [selectedQuest, setSelectedQuest] = useState(null);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        fetch('/api/quests')
            .then(response => response.json())
            .then(data => setQuests(data));
    }, []);

    const handleCardClick = (quest) => {
        setSelectedQuest(quest);
        setShowQrReader(true);
    };

    const handleScan = data => {
        if (data) {
            console.log(data);
            console.log(selectedQuest.code);
            if (data === selectedQuest.code) {
                setModalMessage("Code valide");
                setModalIsOpen(true);
            } else {
                setModalMessage("Code invalide");
                setModalIsOpen(true);
            }
        }
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    // const validateQuest = (questId) => {
    //     fetch(`/api/quests/${questId}/validate`, {
    //         method: 'POST',
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             // Handle the response from the server
    //         });
    // }

    const [result, setResult] = useState(null);

    const campusPosition = {
        // latitude: 49.20091715716765,
        // longitude: -0.3499711869506036
        latitude: 49.200834747727214,
        longitude: -0.35030825744906413
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

    // const handleScan = data => {
    //     if (data) {
    //         setResult(data);
    //     }
    // }

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
        <section className="dark:bg-gray-800 dark:text-gray-100 text-center">
            <main className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {quests.map((quest, index) => (
                    <div key={index} className="rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100"
                         onClick={() => handleCardClick(quest)}>
                        <div className="flex flex-col justify-between p-6 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-semibold tracki">{quest.title}</h2>
                                <p className="dark:text-gray-100">{quest.description}</p>
                            </div>
                            <button type="button"
                                    className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md dark:bg-violet-400 dark:text-gray-900">Compléter la quête
                            </button>
                        </div>
                    </div>
                ))}
                {showQrReader && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 w-1/2 translate-x-1/2">
                        <div className="absolute inset-0 bg-transparent"></div>
                        <div className="mx-auto w-full md:w-1/2">
                            {renderMessage() === 1 ? (
                                <QrReader
                                    delay={300}
                                    facingMode={"environment"}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{width: '100%'}}
                                />
                            ) : renderMessage() === 0 ? (
                                <p className="text-amber-600">Vous êtes à plus de {distanceThreshold} mètres du campus</p>
                            ) : (
                                <p>Géolocalisation non disponible ou pas activée</p>
                            )}
                            <p className="text-white">{result}</p>
                        </div>
                    </div>
                )}
            </main>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Message Modal"
            >
                <h2>{modalMessage}</h2>
                <button onClick={closeModal}>Fermer</button>
            </Modal>
        </section>
    );
};

export default Testimonial;