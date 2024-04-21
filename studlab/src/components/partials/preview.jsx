import ProfilePic from "../profile-pic"
import "./preview.css"

// - Las letras salen del css
export default function Preview(data) {
  const { DocId, userId, title, docImg, theme, userName, userPicture, format } = data.data

  return (
    <div className="preview-element-container">
      <div className="preview-img-container">
        {getFormat(format)}
        <img className="bg-image" src={docImg} alt="Document Background Picture" />
        <div className="profile-pic profile-pic-prev">
          <ProfilePic user={{ id: userId, fotourl: userPicture }}/>
        </div>
      </div>
      <div style={{ padding: "5px" }}>
        <strong>{title}</strong>
        <div className="disp-flex-space-between">
          <div className="name-containe">
            <p>{userName}</p>
          </div>
          <div className="add-img-container">
            <img src="add.png" className="add-pic" />
          </div>
        </div>
      </div>
    </div>
  )
}


function getFormat(format) {
  if (format === 'txt' || format === 'docx' || format === 'pdf') {
    return (
      <img src="doc-icon.png" className="icon-pic " />
    )
  } if (format === 'avi') {
    return (
      <img src="video-icon.png" className="icon-pic " />
    )
  } else {
    <img src="image-icon.png" className="icon-pic " />
  }
}
