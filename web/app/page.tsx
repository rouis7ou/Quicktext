"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

type Room = {
    id: string;
    name: string;
    type: string;
    price: number;
    currency: string;
    description: string;
    images: string[];
    status: string; // Ajout du statut
};

export default function Home() {
    const [availableRooms, setAvailableRooms] = useState<Room[]>([]);

    useEffect(() => {
        const fetchAvailableRooms = async () => {
            try {
                const response = await axios.get<Room[]>("http://localhost:4000/rooms");
                // Filtrer les chambres avec un statut "available"
                const filteredRooms = response.data.filter((room) => room.availability === true);
                setAvailableRooms(filteredRooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchAvailableRooms();
    }, []);

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <Image
                    className={styles.logo}
                    src="/quicktext.png"
                    alt="Next.js logo"
                    width={150}
                    height={50}
                    priority
                />
                <ol >
                    <p className={styles.introduction}>
                        Houssem's Test for <code className={styles.code}>FullStack Developer</code> position.
                    </p>
                </ol>
                <Link href="/rooms">
                    <button className={styles.button}>All our rooms</button>
                </Link>
                <h2 className={styles.sectionTitle}>Available Rooms</h2>
                <div className={styles.roomsGrid}>
                    {availableRooms.length > 0 ? (
                        availableRooms.map((room) => (
                            <div key={room.id} className={styles.roomCard}>
                                <img src={room.images[0] || "/room.jpg"} alt={room.name} className={styles.roomImage} />
                                <div className={styles.roomDetails}>
                                    <h3>{room.name}</h3>
                                    <p>{room.type}</p>
                                    <p>
                                        {room.price} {room.currency}
                                    </p>
                                    <Link href={`/rooms/${room.id}`}>
                                        <button className={styles.button}>View Details</button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No available rooms at the moment.</p>
                    )}
                </div>
                <Link href="/rooms">
                    <button className={styles.button}>All our rooms</button>
                </Link>
            </main>

            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p className={styles.footerText}>© 2024 Houssem Rouis.</p>
                    <div className={styles.socialLinks}>
                        <a
                            href="https://www.facebook.com/rouis7ou/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                        >
                            Facebook
                        </a>
                        <a
                            href="https://www.linkedin.com/in/rouis-houssem97/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/rouis7ou"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.socialLink}
                        >
                            GitHub
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
