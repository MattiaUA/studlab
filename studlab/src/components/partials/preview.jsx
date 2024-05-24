import ProfilePic from "./profile-pic"
import { Link } from 'react-router-dom';
import "./preview.css"

// - Las letras salen del css
export default function Preview(data) {
  const { DocId, userId, title, docImg, theme, userName, userPicture, format } = data.data


  return (
    <div className="preview-element-container">
      <div className="preview-img-container">
        {getFormat(format)}
        <Link to={`/preview/${DocId}`}>
          <img className="bg-image" src={docImg} alt="Document Background Picture" />
        </Link>
        <div className="profile-pic profile-pic-prev">
          <ProfilePic user={{ id: userId, fotourl: userPicture }} />
        </div>
      </div>
      <div style={{ padding: "5px" }}>
        <strong>{title}</strong>
        <div className="disp-flex-space-between">
          <div className="name-containe">
            <p>{userName}</p>
          </div>
          <div className="add-img-container">
            <img src="/add.png" className="add-pic" />
          </div>
        </div>
      </div>
    </div>
  )
}


function getFormat(format) {
  if (format === 'pdf') {
    return (
      <img src="/doc-icon.png" className="icon-pic " />
    )
  } if (format === 'avi' || format === 'mp4') {
    return (
      <img src="/video-icon.png" className="icon-pic " />
    )
  } else {
    return (
      <img src="../../../public/image-icon.png" className="icon-pic " />
    )
  }
}
