import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverGlow = true,
}) => {
  return (
    <div className={`${styles.card} ${hoverGlow ? styles.glow : ''} ${className}`}>
      <div className={styles.inner}>
        {children}
      </div>
      <div className={styles.borderEffect} />
    </div>
  );
};
