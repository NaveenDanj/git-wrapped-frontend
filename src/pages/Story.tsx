
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import  type{ RootState} from '../store';
import type { Wrapped } from '../types/wrapped-type';
import { SlideGenerator, type StorySlide } from '../services/slide-generator';
import SlideWindow from '../components/SlideWindow';

const StoryPage = () => {
    const [searchParams] = useSearchParams();
    const wrappedId = searchParams.get("wrappedId");
    const [currentSlide, setCurrentSlide] = useState(0);
    const [slides, setSlides] = useState<StorySlide[]>([]);
    const userwrappedList = useSelector( (state:RootState) => state.wrapped.userWrapped);
    let currentWrapped: Wrapped | null = null;

    useEffect(() => {
        if (!wrappedId) {
            return;
        }
        currentWrapped = userwrappedList.find(wrap => wrap.id === wrappedId) || null;
        if (currentWrapped && currentWrapped.data) {
            const data = currentWrapped.data;
            const newSlides = SlideGenerator.generateSlides(currentWrapped.year, data);
            setSlides(newSlides);
        }

    }, [wrappedId, userwrappedList])

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentSlide, slides]);

    const nextSlide = () => {
        setCurrentSlide((prev) =>
            prev === slides.length - 1 ? prev : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            
            <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            idx < currentSlide
                                ? 'bg-white'
                                : idx === currentSlide
                                ? 'bg-white'
                                : 'bg-white/30'
                        }`}
                    ></div>
                ))}
            </div>

            <div className="relative w-full h-full">
                {slides.map((slide, idx) => (
                    <SlideWindow key={slide.id} slide={slide} idx={idx} currentSlide={currentSlide} />
                ))}
            </div>

            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 z-20">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg backdrop-blur transition-all"
                >
                    Prev
                </button>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="px-6 py-3 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg backdrop-blur transition-all"
                >
                    Next
                </button>
            </div>

            <div
                onClick={prevSlide}
                className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer"
            ></div>
            <div
                onClick={nextSlide}
                className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer"
            ></div>

            <div className="absolute top-12 right-6 text-white/70 text-sm backdrop-blur px-4 py-2 rounded-full">
                {currentSlide + 1} / {slides.length}
            </div>
        </div>
    );
};

export default StoryPage;