// app/home/page.tsx
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
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
                <ol className={styles.list}>
                    <p className={styles.introduction}>
                        Houssem's Test for <code className={styles.code}>FullStack Developer</code> position.
                    </p>
                </ol>
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
