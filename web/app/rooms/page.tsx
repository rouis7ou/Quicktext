// app/rooms/page.tsx
"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './rooms.module.css'; // Importation du fichier CSS


type Room = {
    id: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    description: string;
    images: string[];
};

export default function Rooms() {
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            const response = await axios.get<Room[]>('http://localhost:4000/rooms');
            setRooms(response.data);
        };

        fetchRooms();
    }, []);

    return (
        <div className={styles.roomsContainer}>
            <h1>Our guest Rooms</h1>
            <div className={styles.roomsGrid}>
                {rooms.map((room) => (
                    <div key={room.id} className={styles.roomCard}>
                        <img src="/room.jpg" alt={room.name} className={styles.roomImage} />
                        <div className={styles.roomDetails}>
                            <h2>{room.name}</h2>
                            <a>{room.description}</a>
                            <a>{room.type} - {room.price} {room.currency}</a>
                            <Link href={`/rooms/${room.id}`}>
                                <p><strong>More details</strong></p>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}