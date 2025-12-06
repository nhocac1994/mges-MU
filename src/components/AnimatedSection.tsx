'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useEffect, useState } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.6
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trên mobile, giảm animation để scroll mượt hơn
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: isMobile ? 0.01 : 0.05, // Threshold thấp hơn trên mobile
        rootMargin: isMobile ? '100px' : '50px' // Margin lớn hơn trên mobile để trigger sớm
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: 60, opacity: 0 };
      case 'down':
        return { y: -60, opacity: 0 };
      case 'left':
        return { x: 60, opacity: 0 };
      case 'right':
        return { x: -60, opacity: 0 };
      default:
        return { y: 60, opacity: 0 };
    }
  };

  // Trên mobile, giảm animation để scroll mượt hơn
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  const variants = {
    hidden: getInitialPosition(),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? duration * 0.4 : duration * 0.7, // Nhanh hơn trên mobile
        delay: isMobile ? 0 : delay * 0.5, // Không delay trên mobile
        ease: [0.25, 0.46, 0.45, 0.94] as const // Easing mượt hơn, ít giật hơn
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

