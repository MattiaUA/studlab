import "./preview.css"
import Preview from "./preview"

export default function PreviewCarousel(data) {
  const dataArray = data.data

  return (
    <div className="carousel-container">
      <div className="carousel-scroll">
        {dataArray.map((previewData, idx) => (
          <Preview key={idx} data={previewData} />
        ))}
      </div>
    </div>
  )
}
