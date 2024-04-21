import { useRef } from "react"
import "./preview.css"
import Preview from "./preview";

export default function PreviewCarousel(data) {
    const dataArray = data.data
    const carouselRef = useRef(null);

    return (
        <div className="carousel-container">
            <div className="carousel-scroll" ref={carouselRef}>
                {dataArray.map((previewData, idx) => (
                    <Preview key={idx} data={previewData} />
                ))}
            </div>
        </div>
    )
}