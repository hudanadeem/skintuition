import "./ImageUpload.scss";

function ImageUpload({ onImageUpload, fileName }) {
  return (
    <div className="image__upload">
      <div className="image__upload--group">
        <div className="image__upload--icon">
          <img
            src="/src/assets/icons/upload.png"
            alt="Upload Icon"
            className="image__upload--icon--img"
          />
        </div>

        <input
          type="text"
          readOnly
          value={fileName}
          placeholder="Upload Image"
          className="image__upload--input"
        />

        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={onImageUpload}
          className="image__upload--hidden"
        />

        <button
          type="button"
          className="image__upload--browse"
          onClick={() => document.getElementById("image-upload").click()}
        >
          Browse
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
