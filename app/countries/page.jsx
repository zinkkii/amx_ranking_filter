"use client";

import styles from "../page.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Countries() {
  const router = useRouter();

  return (
    <>
      <div className={styles.description}>
        <div style={{ cursor: "pointer" }}>
          <Image
            onClick={() => router.push("/")}
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </div>
      </div>
      <div className={styles.filter}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
    </>
  );
}
