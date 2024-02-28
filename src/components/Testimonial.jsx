import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import QrReader from 'modern-react-qr-reader';
import {useGeolocated} from "react-geolocated";
import {useUser} from '@clerk/clerk-react';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.2s ease-in-out',
        opacity: 1,
    },
    overlay: {
        transition: 'opacity 0.2s ease-in-out',
        opacity: 1,
    }
};

Modal.setAppElement('body');

const Testimonial = () => {
    const [quests, setQuests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showQrReader, setShowQrReader] = useState(false);
    const [selectedQuest, setSelectedQuest] = useState(null);
    const [completedQuests, setCompletedQuests] = useState([]);


    // Récupérer l'utilisateur connecté
    const {user} = useUser();
    const userId = user ? user.id : null;

    // Modal
    const [modalMessage, setModalMessage] = useState('');
    const [modalTextButton, setModalTextButton] = useState('');
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        const modalContent = document.querySelector('.ReactModal__Content');
        const modalOverlay = document.querySelector('.ReactModal__Overlay');

        modalContent.style.opacity = 0;
        modalOverlay.style.opacity = 0;

        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    }


    // Récupérer les quêtes
    useEffect(() => {
        fetch('/api/quests')
            .then(response => response.json())
            .then(data => {
                setQuests(data);
                setIsLoading(false);
            });
        }, []);


    // Récupérer les quêtes complétées par l'utilisateur
    useEffect(() => {
        if (user) {
            fetch(`/api/progress?userId=${user.id}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCompletedQuests(data);
                    } else {
                        // console.error('Erreur : la réponse de l\'API n\'est pas un tableau', data);
                        setCompletedQuests([]);
                    }
                });
        }
    }, [user]);

    // Ouvrir le lecteur de QR code
    const handleCardClick = (quest) => {
        if (completedQuests.includes(quest.code)) {
            return;
        }

        setSelectedQuest(quest);
        setShowQrReader(true);
    };

    // Lire le QR code et traiter les requêtes qui en découlent
    const handleScan = data => {
        if (data) {
            if (data === selectedQuest.code) {
                setModalMessage("Code valide, en cours d'enregistrement...");
                setModalTextButton('Je continue mes quêtes');
                openModal();

                // Envoyez une requête POST à l'API
                fetch('/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        questCode: selectedQuest.code
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data === 1) {
                            setShowQrReader(false);
                            setModalMessage('Quête validée avec succès !');
                            setModalTextButton('Je continue mes quêtes');
                            openModal();
                            setCompletedQuests(prevCompletedQuests => [...prevCompletedQuests, selectedQuest.code]);

                        } else if (data === 0) {
                            setShowQrReader(false);
                            setModalMessage('Oupps vous avez déjà validé cette quête !');
                            setModalTextButton('Je valide une quête différente');
                            openModal();
                        } else if (data === -1) {
                            setShowQrReader(false);
                            setModalMessage('Aïe ! Une erreur est survenue. Veuillez réessayer plus tard.');
                            setModalTextButton('Je réessaye')
                            openModal();
                        }
                    });
            } else {
                setShowQrReader(false);
                setModalMessage('Code invalide !');
                setModalTextButton('Je vérifie mon QR code')
                openModal();
            }
        }
    }

    const [result, setResult] = useState(null);
    const campusPosition = {
        latitude: 49.17821482096826,
        longitude: -0.38856331144122436
        // latitude: 49.200834747727214,
        // longitude: -0.35030825744906413
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
        // Géolocalisation non supportée
        if (!isGeolocationAvailable) {
            return -1;
            // Géolocalisation n'est pas activée
        } else if (!isGeolocationEnabled) {
            return -1;
        } else if (coords) {
            const distance = getDistanceFromLatLonInKm(campusPosition.latitude, campusPosition.longitude, coords.latitude, coords.longitude);
            // Est sur le campus
            if (distance <= distanceThreshold) {
                return 1;
                // N'est pas sur le campus
            } else {
                return 0;
            }
        } else {
            // Géolocalisation non disponible
            return -1;
        }
    }

    const handleError = err => {
        console.error(err)
    }

    return (
        <section className="dark:bg-gray-800 dark:text-gray-100 text-center">
            {isLoading ? (
                    <div className="flex items-center justify-center space-x-2 h-lvh">
                        <div
                            className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400">
                        </div>
                    </div>
                ) :
                <main className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {quests.map((quest, index) => (
                    <div key={index}
                         className={`rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100 ${Array.isArray(completedQuests) && completedQuests.includes(quest.code) ? 'opacity-30' : ''}`}
                         onClick={() => Array.isArray(completedQuests) && !completedQuests.includes(quest.code) && handleCardClick(quest)}>
                    {/*<div key={index} className="rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100"*/}
                    {/*     onClick={() => handleCardClick(quest)}>*/}
                        <div className="flex flex-col justify-between p-6 space-y-8">
                            <div className="space-y-2">
                                <p className="">{quest.name}</p>
                                <p className="dark:text-gray-100 text-xl">{quest.description}</p>
                            </div>
                            {completedQuests.includes(quest.code) ? (
                                <button type="button"
                                        className="cursor-auto flex items-center justify-center w-full p-3 font-semibold tracki rounded-md dark:bg-violet-400 dark:text-gray-900">Quête
                                    déjà complétée
                                </button>
                            ) : (
                                <button type="button"
                                        className="flex items-center justify-center w-full p-3 font-semibold tracki rounded-md dark:bg-violet-400 dark:text-gray-900">Compléter
                                    la quête
                                </button>
                            )}
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
                                <p className="text-amber-600">Vous êtes à plus de {distanceThreshold} mètres du
                                    campus</p>
                            ) : (
                                <p>Géolocalisation non disponible ou pas activée</p>
                            )}
                            <p className="text-white">{result}</p>
                        </div>
                    </div>
                )}
            </main>
                }
                <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel={modalMessage}
                contentButton={modalTextButton}
            >
                <div
                    className="flex flex-col justify-between items-center p-10 dark:bg-gray-800-400 dark:text-gray-900">
                    <div className="absolute top-2.5 right-3 close-block">
                        <button className="dark:bg-violet-400 dark:text-gray-900" onClick={closeModal}>X</button>
                    </div>
                    <div className="mt-4">
                        <h2>{modalMessage}</h2>
                    </div>
                    <div className="mt-4">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded dark:bg-violet-400 dark:text-gray-900"
                            onClick={closeModal}>{modalTextButton}</button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};
export default Testimonial;