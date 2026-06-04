"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { easeInUp } from "@/animations/easeInUp";

export default function SettingsPage() {
  const styles = {
    label: "text-[12px] font-bold tracking-widest uppercase text-secondary-dark",
    statusOnline: "text-[12px] font-bold tracking-widest uppercase text-green-400",
    statusOffline: "text-[12px] font-bold tracking-widest uppercase text-red-600"
  }

  const [mongoDBStatus, setMongoDBStatus] = useState("");
  const [cloudinaryStatus, setCloudinaryStatus] = useState("");

  useEffect(() => {
    const testServers = async () => {
      const res = await fetch("/api/testServers");
      const data = await res.json();
      setMongoDBStatus(data.mongodb);
      setCloudinaryStatus(data.cloudinary);
    };
    testServers();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-2">Project Management</p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary">Settings</h1>
      </div>
      <motion.div 
        {...easeInUp}
        className="bg-primary-light border border-secondary-dark/10 rounded-xl py-10 px-10 max-w-md">
        <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-secondary mb-6 flex items-center gap-2">
          <FiSettings className="text-accent" /> Server status
        </h2>
        <ul className="space-y-4">
          <li className="flex flex-row justify-between"><label className={styles.label}>DATABASE:</label> <span className={mongoDBStatus ? styles.statusOnline : styles.statusOffline}> {mongoDBStatus ? "online" : "offline"} </span></li>
          <li className="flex flex-row justify-between"><label className={styles.label}>MEDIA CDN:</label> <span className={cloudinaryStatus ? styles.statusOnline : styles.statusOffline}> {cloudinaryStatus ? "online" : "offline"}</span></li>
          <li className="flex flex-row justify-between"><label className={styles.label}>Auth SV:</label> <span className={styles.statusOnline}>  online</span></li>
          <li className="flex flex-row justify-between"><label className={styles.label}>MAIN SV:</label> <span className={styles.statusOnline}>  online</span></li>
        </ul>
      </motion.div>
    </div>
  );
}
