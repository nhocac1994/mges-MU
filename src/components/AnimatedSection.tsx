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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.05, // Giảm threshold để trigger sớm hơn
        rootMargin: '50px' // Thêm margin để trigger trước khi vào viewport
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

  const variants = {
    hidden: getInitialPosition(),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration: duration * 0.7, // Giảm duration để nhanh hơn
        delay: delay * 0.5, // Giảm delay
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

