'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { IMockData } from '../../data/mockData';
import Image from 'next/image';
import { useRandomBorderRadius } from '@/app/hooks/useRandomBorderRadius';

import LeftArrow from '../../assets/left-arrow.svg';
import RightArrow from '../../assets/right-arrow.svg';
import LeftArrowSmall from '../../assets/left-arrow-small.svg';
import RightArrowSmall from '../../assets/right-arrow-small.svg';

import styles from './Slider.module.css';

const Slider = ({ data }: IMockData) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    const [windowWidth, setWindowWidth] = useState<number>(0);
    let prevSlideType = '';

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleScroll = (event: React.WheelEvent<HTMLDivElement>): void => {
        const scrollAmount: number = event.deltaY;
        if (scrollAmount !== 0 && sliderRef.current !== null) {
            sliderRef.current.scrollLeft += scrollAmount;
        }
    };

    const handleArrowClick = (direction: string) => {
        const slider = sliderRef.current;
        const slide = slideRef.current;

        if (slider !== null && slide !== null) {
            const slideWidth = slide.offsetWidth;
            const scrollAmount =
                direction === 'next' ? slideWidth : -slideWidth;
            slider.scrollLeft += scrollAmount;
        }
    };

    const memoizedSlider = useMemo(() => {
        return data.map((item) => {
            const isDoubleWidth = item.title.length > 35;
            let slideType = '';

            if (isDoubleWidth) {
                slideType = 'doubleWidth';
            } else {
                slideType = Math.random() < 0.5 ? 'circle' : 'petal';
                if (slideType === prevSlideType) {
                    slideType = slideType === 'circle' ? 'petal' : 'circle';
                }
            }

            prevSlideType = slideType;

            return (
                <div
                    key={item.id}
                    className={`${styles.slide}  ${
                        isDoubleWidth ? styles.doubleWidth : ''
                    } `}
                    ref={slideRef}
                >
                    <div
                        className={`${styles.imgWrap} ${styles[slideType]} `}
                        style={
                            slideType === 'petal' && !isDoubleWidth
                                ? {
                                      borderRadius: useRandomBorderRadius(),
                                  }
                                : {}
                        }
                    >
                        <img
                            className={styles.img}
                            src={item.img}
                            alt={item.title}
                            loading='lazy'
                        />
                    </div>

                    <div
                        className={
                            isDoubleWidth
                                ? styles.doubleWidthContent
                                : styles.slideContent
                        }
                    >
                        <h4 className={styles.title}>{item.title}</h4>
                        <p className={styles.date}>{item.date}</p>
                    </div>
                </div>
            );
        });
    }, [data, prevSlideType]);

    return (
        <div className={styles.sliderContainer}>
            <div
                className={`${styles.slider} `}
                onWheel={handleScroll}
                ref={sliderRef}
            >
                {memoizedSlider}
            </div>
            <button
                className={`${styles.arrow} ${styles.prev}`}
                onClick={() => handleArrowClick('prev')}
            >
                <Image
                    src={windowWidth < 1024 ? LeftArrowSmall : LeftArrow}
                    alt='left-arrow'
                />
            </button>
            <button
                className={`${styles.arrow} ${styles.next}`}
                onClick={() => handleArrowClick('next')}
            >
                <Image
                    src={windowWidth < 767 ? RightArrowSmall : RightArrow}
                    alt='right-arrow'
                />
            </button>
        </div>
    );
};

export default Slider;
