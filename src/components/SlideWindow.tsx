import type { StorySlide } from "../services/slide-generator"


const SlideWindow = ({slide, idx, currentSlide}: {slide: StorySlide, idx: number, currentSlide: number }) => {
    return (
        <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.color}`}
            ></div>

            <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
                <div className="text-8xl mb-8 transform hover:scale-110 transition-transform">
                    {slide.icon}
                </div>
                <h2 className="text-3xl font-light mb-4 text-center opacity-90">
                    {slide.title}
                </h2>
                <p className="text-6xl font-bold text-center">
                    {slide.value}
                </p>
            </div>
        </div>
    )
}

export default SlideWindow;