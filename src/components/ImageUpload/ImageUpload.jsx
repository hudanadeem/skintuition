import "./ImageUpload.scss";

function ImageUpload({ onImageUpload, fileName }) {
  return (
    <div className="analysis-page__upload">
      <div className="analysis-page__upload-group">
        <div className="analysis-page__upload-icon">
          <img
            src="/src/assets/icons/upload.png"
            alt="Upload Icon"
            className="analysis-page__upload-icon-img"
          />
        </div>

        <input
          type="text"
          readOnly
          value={fileName}
          placeholder="Upload Image"
          className="analysis-page__upload-input"
        />

        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={onImageUpload}
          className="analysis-page__upload-hidden"
        />

        <button
          type="button"
          className="analysis-page__upload-browse"
          onClick={() => document.getElementById("image-upload").click()}
        >
          Browse
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
