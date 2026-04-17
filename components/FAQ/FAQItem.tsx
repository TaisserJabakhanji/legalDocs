// components/sections/FAQ/FAQItem.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import styles from "./FAQ.module.css";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, answer]);

  return (
    <article className={`${styles.item} ${isOpen ? styles.open : ""}`}>
      <button
        className={styles.questionBtn}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className={styles.questionText}>{question}</span>
        <FiChevronDown className={styles.icon} />
      </button>
      
      <div className={styles.answerWrapper} style={{ height: `${height}px` }}>
        <div className={styles.answer} ref={contentRef}>
          {answer}
        </div>
      </div>
    </article>
  );
}