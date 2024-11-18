"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./rooms.module.css";

type Room = {
    id: number;
    name: string;
    type: string;
    price: number;
    currency: string;
    description: string;
    images: string[];
};

export default function Rooms() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get<Room[]>("http://localhost:4000/rooms");
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    const filteredRooms = rooms.filter(
        (room) =>
            room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.roomsContainer}>
            <div className={styles.navigation}>
                <Link href="/">
                    <button className={styles.backButton}>← Back to Home</button>
                </Link>
            </div>
            <h1>All Guest Rooms</h1>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search for rooms..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.roomsGrid}>
                {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                        <div key={room.id} className={styles.roomCard}>
                            <img src={room.images[0]} alt={room.name} className={styles.roomImage}/>
                            <div className={styles.roomDetails}>
                                <h2>{room.name}</h2>
                                <p>{room.description}</p>
                                <p>
                                    {room.type} - {room.price} {room.currency}
                                </p>
                                <Link href={`/rooms/${room.id}`}>
                                    <p>
                                        <strong>More details</strong>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rooms found matching your search.</p>
                )}
            </div>
        </div>
    );
}
