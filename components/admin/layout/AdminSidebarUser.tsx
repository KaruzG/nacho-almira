"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiUser } from "react-icons/fi";

const styles = {
  container: "px-6 py-6 border-t border-secondary-dark/10",
  wrapper: "flex items-center gap-3",
  avatar: "w-9 h-9 rounded-full bg-secondary-dark/20 flex items-center justify-center overflow-hidden",
  info: "flex flex-col",
  name: "text-secondary text-sm font-medium leading-tight",
  role: "text-secondary-dark text-[10px] font-bold tracking-widest uppercase",
};

export default function AdminSidebarUser() {
  const { data: session } = useSession();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.avatar}>
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || "User"}
              className="w-full h-full object-cover"
            />
          ) : (
            <FiUser size={16} className="text-secondary-dark" />
          )}
        </div>
        <div className={styles.info}>
          <span className={styles.name}>
            {session?.user?.name || "Admin"}
          </span>
          <span className={styles.role}>Director</span>
        </div>
      </div>
    </div>
  );
}
