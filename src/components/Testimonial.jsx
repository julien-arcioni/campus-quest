import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import QrReader from 'modern-react-qr-reader';
import {useGeolocated} from "react-geolocated";
import {useUser} from '@clerk/clerk-react';
import localForage from "localforage";

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

    useEffect(() => {
        if (user) {
            localStorage.setItem('userId', user.id);
        }
    }, [user]);

    // Récupérer les quêtes complétées par l'utilisateur
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        console.log('userId local', userId);
        if (user) {
            fetch(`/api/progress?userId=${user.id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    if (Array.isArray(data)) {
                        setCompletedQuests(data);
                    } else {
                        console.error('Erreur : la réponse de l\'API n\'est pas un tableau', data);
                        setCompletedQuests([]);
                    }
                })
                .catch(error => {
                    console.error('Une erreur est survenue lors de la récupération de la progression de l\'utilisateur :', error);
                });        }
    }, [user]);

    useEffect(() => {
        window.addEventListener('online', async () => {
            event.preventDefault();

            // L'utilisateur est revenu en ligne, récupérez les codes QR de localForage
            const scannedQRCodes = await localForage.getItem('scannedQRCodes') || [];

            console.log('revenu en ligne qr code en tmp : ', scannedQRCodes);
            // Envoyez chaque code QR à la base de données
            for (const qrCode of scannedQRCodes) {
                if (qrCode && user && !completedQuests.includes(qrCode)) {
                    // Envoyez une requête POST à l'API
                    fetch('/api/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: user.id,
                            questCode: qrCode
                        }),
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => {
                            if (data === 1) {
                                setCompletedQuests(prevCompletedQuests => [...prevCompletedQuests, qrCode]);
                                setModalMessage('Quête(s) validées en hors ligne envoyées à la BDD');
                                setModalTextButton('Je continue mes quêtes');
                                openModal();
                            } else if (data === 0) {
                                console.log('Oupps vous avez déjà validé cette quête !');
                            } else if (data === -1) {
                                console.log('Aïe ! Une erreur est survenue. Veuillez réessayer plus tard.');
                                console.log('Aïe ! Une erreur est survenue pour : ' . user.id, qrCode);
                            } else {
                                setModalMessage('PB');
                                setModalTextButton('PBBBB');
                                openModal();
                                console.error('Erreur : la réponse de l\'API n\'est pas valide', data);
                            }
                        })
                .catch(error => {
                        console.error('Une erreur est survenue lors de l\'envoi des données à la base de données :', error);
                    console.error('Détails de l\'erreur :', JSON.stringify(error, null, 2));
                });
                }
            }

            // Supprimez les codes QR de localForage
            await localForage.removeItem('scannedQRCodes');
        });
    }, [user, completedQuests]);

    // Ouvrir le lecteur de QR code
    const handleCardClick = (quest) => {
        if (completedQuests.includes(quest.code)) {
            return;
        }

        setSelectedQuest(quest);
        setShowQrReader(true);
    };

    // Lire le QR code et traiter les requêtes qui en découlent
    const handleScan = async data => {
        if (data) {
            if (data !== selectedQuest.code) {
                setShowQrReader(false);
                setModalMessage('Le code QR scanné ne correspond pas à la quête sélectionnée.');
                setModalTextButton('Je scanne à nouveau');
                openModal();
                return;
            }
            if (navigator.onLine) {
                // L'utilisateur est en ligne, envoyez le code QR à la base de données
                setShowQrReader(false);
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
                // L'utilisateur est hors ligne, stockez le code QR dans localForage
                await localForage.setItem('scannedQRCodes', [...await localForage.getItem('scannedQRCodes') || [], data]);
                setShowQrReader(false);
                setModalMessage('Vous êtes hors ligne. Le code QR a été enregistré localement et sera envoyé à la base de données une fois que vous serez en ligne.');
                setModalTextButton('Je continue mes quêtes');
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
                         className={`rounded-md card jshadow-md dark:bg-gray-900 dark:text-gray-100 ${Array.isArray(completedQuests) && completedQuests.includes(quest.code) ? 'opacity-30' : ''}`}
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
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white rounded-lg p-10 relative mx-2 md:mx-auto w-full md:w-1/3">
                                <button className="absolute top-0 right-1 text-lg text-black" onClick={() => setShowQrReader(false)}>Fermer</button>
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
                                    <p className="text-amber-600">Géolocalisation non disponible ou pas activée</p>
                                )}
                                <p className="text-black">{result}</p>
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
                    className="flex flex-col justify-between items-center z-50 p-10 dark:bg-gray-800-400 dark:text-gray-900">
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