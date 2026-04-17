// components/VideoModal.tsx
"use client";

import { useEffect } from "react";
import styles from "./Hero.module.css";
import { FiX, FiPlay } from "react-icons/fi";

interface VideoModalProps {
  title: string;
  onClose: () => void;
}

export function VideoModal({ title, onClose }: VideoModalProps) {
  // إغلاق المودال عند ضغط ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="Close">
          <FiX size={20} />
        </button>
        
        {/* هنا يمكن استبدال الـ placeholder بفيديو حقيقي */}
        <div className={styles.modalPlaceholder}>
          <button className={styles.playButtonLarge} aria-label="Play video">
            <FiPlay />
          </button>
          <span className={styles.modalTitle}>{title}</span>
        </div>
        
        {/* مثال لفيديو حقيقي (معلق) */}
        {/* <video 
          className={styles.modalVideo}
          src="/videos/demo.mp4"
          controls
          autoPlay
        /> */}
      </div>
    </div>
  );
}