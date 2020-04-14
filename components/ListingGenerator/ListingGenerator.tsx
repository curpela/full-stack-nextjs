import React, { useState } from "react";
import "./ListingGenerator.scss";
import { MdCloudUpload } from "react-icons/md";
import FileUploader from "../../components/Sharable/FileUploader";
import ImagePreviewModal from "../../components/Modals/ImagePreviewModal";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";
import Button from "../../components/Sharable/Button";
import { GoPlus } from "react-icons/go";
import { TiDelete } from "react-icons/ti";
import Iframe from "react-iframe";
import Register from "../authentication/Register";
import Login from "../authentication/Login";
import LandingPage from "../../views/LandingPage";




const SortableImagesContainer = SortableContainer((props: any) => {
  const { preview, children } = props;
  return (
    <div
      className={`photo-upload-preview-image-container-hidden ${
        preview.length > 0 && "photo-upload-preview-image-container-show"
      }`}
    >
      {children}
    </div>
  );
});

const SortableImage = SortableElement((props: any) => {
  const { image, fireModal, i, preview, setPreview } = props;
  const deleteImage = (i: number) => {
    setPreview((x: string[]) => x.filter((m, n) => n !== i));
  };
  return (
    <div
      onClick={(e) => fireModal(i, e)}
      className="photo-upload-preview-image"
      key={i}
    >
      <div
        onClick={() => deleteImage(i)}
        className="photo-upload-preview-image-icon"
      >
        <TiDelete
          name="icon"
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            width: "17px",
            height: "17px",
            color: "red",
          }}
        />
      </div>
      <img
        className="photo-upload-preview-image-src sortableHelper"
        src={image.preview}
      />
    </div>
  );
});

const SortableVideosContainer = SortableContainer((props: any) => {
  const { videoArray, children } = props;
  return (
    <div
      className={`photo-upload-preview-image-container-hidden ${
        videoArray.length > 0 && "photo-upload-preview-image-container-show"
      }`}
    >
      {children}
    </div>
  );
});

const SortableVideo = SortableElement((props: any) => {
  const { video, index, setError, errorHandler } = props;
  setError(false);
  if (video.id) {
    return (
      <>
        <Iframe
          className="photo-upload-preview-video sortableHelper"
          key={index}
          url={
            video.URL.includes("youtube")
              ? `https://www.youtube.com/embed/${video.id}`
              : video.URL
          }
          allowFullScreen
        />
      </>
    );
  } else {
    return <div>{!errorHandler && setError(true)}</div>;
  }
});

interface ListingGeneratorProps {
  authTab: string;
  setAuthTab: (authTab: string) => void;
}

const ListingGenerator: React.FC<ListingGeneratorProps> = ({
  authTab,
  setAuthTab,
}) => {
  const [preview, setPreview] = useState(Array());
  const [post, setPost] = useState({
    text: "",
    media: Array(),
  });
  const [step, setStep] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [video, setVideo] = useState({
    URL: "",
    id: "",
  });
  const [videoArray, setVideoArray] = useState(Array());
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [errorHandler, setErrorHandler] = useState(false);

  const handleChange = (e: React.FormEvent<EventTarget>): void => {
    let target = e.target as HTMLInputElement;
    e.persist();
    {
      error && setErrorHandler(true);
    }
    setError(false);
    setVideo({ ...video, URL: target.value });
  };



  const fireModal = (index: number, e: MouseEvent) => {
    e.preventDefault();
    const target = e.target as HTMLTextAreaElement;
    var target_class = target.nodeName;
    if (target_class == "IMG") {
      setImageModal(true);
      setModalIndex(index);
    } else {
      return null;
    }
  };

  let addressSlug = address.replace(/,/g, "").split(" ").join("-").slice(0, -4);

  const addVideo = (e: React.FormEvent<EventTarget>) => {
    video.id = video.URL.split("=")[1];
    e.preventDefault();
    setErrorHandler(false);
    setVideoArray((x: string[]) => [...x, video]);
    setVideo({ URL: "", id: "" });
  };

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => setPreview(arrayMove(preview, oldIndex, newIndex));

  return (
    <div className="photo-upload">
      {step === 0 && authTab === "" ? (
       <LandingPage error={error} setError={setError} setStep={setStep} address={address} setAddress={setAddress}/>
      ) : (
        <div className="photo-upload-page-container">
          <FileUploader
            noClick
            preview={preview}
            setPreview={setPreview}
            post={post}
            setPost={setPost}
          >
            <div
              className={`photo-upload-dnd ${
                (step >= 3 || step === 0) &&
                "photo-upload-content-container-hidden"
              }`}
            >
              <h1 className={`photo-upload-title`}>Listing Generator</h1>
              <div className="photo-upload-dnd-container">
                <FileUploader
                  preview={preview}
                  post={post}
                  setPost={setPost}
                  setPreview={setPreview}
                >
                  <div className="photo-upload-icon-container">
                    <MdCloudUpload className="photo-upload-icon" />
                  </div>
                  <div
                    className={`photo-upload-content-container ${
                      preview.length > 0 &&
                      "photo-upload-content-container-hidden"
                    }`}
                  >
                    <p className="photo-upload-content">
                      Drag & Drop{" "}
                      <span style={{ fontWeight: 700 }}>high res</span> listing
                      photos <br /> or <br /> Click{" "}
                      <span className="underline">here</span> to upload
                    </p>
                  </div>
                  <div
                    className={`photo-upload-content-container ${
                      (step >= 2 || preview.length < 1) &&
                      "photo-upload-content-container-hidden"
                    }`}
                  >
                    <p className="photo-upload-content">
                      Drag images to change photo order or click images to
                      preview. <br />
                      Upload more images <span className="underline">here</span>
                      .
                    </p>
                  </div>
                  <div
                    className={`photo-upload-content-container ${
                      step !== 2 && "photo-upload-content-container-hidden"
                    }`}
                  >
                    <p className="photo-upload-content">
                      If you have any videos or 3D tours, add the URL(s) below.{" "}
                    </p>
                  </div>
                </FileUploader>
                {step === 1 ? (
                  <div
                    className={`photo-upload-content-container-hidden ${
                      preview.length > 0 && "photo-upload-submit-button"
                    }`}
                    onClick={() => setStep(2)}
                  >
                    <Button text="Next Step" padding="12px 16px"></Button>
                  </div>
                ) : (
                  <div
                    className={`photo-upload-content-container-hidden ${
                      preview.length > 0 && "photo-upload-submit-button"
                    }`}
                    onClick={() => {
                      setStep(3);
                      setAuthTab("register");
                    }}
                  >
                    <Button text="Next Step" padding="12px 16px"></Button>
                  </div>
                )}
              </div>
            </div>
          </FileUploader>
          {step === 2 && (
            <>
              <form className="photo-upload-video-URL">
                <input
                  placeholder="Add video or 3D tour URL"
                  value={video.URL}
                  onChange={(e) => handleChange(e)}
                  className="photo-upload-video-URL-input"
                ></input>
                <div
                  className="photo-upload-video-URL-button"
                  onClick={(e) => addVideo(e)}
                >
                  <Button
                    text={<GoPlus style={{ width: "22px", height: "22px" }} />}
                    padding="12px 16px"
                    width="50px"
                    height="46px"
                    minWidth="50px"
                    borderTopLeftRadius="0px"
                    borderBottomLeftRadius="0px"
                  ></Button>
                </div>
              </form>
              {error && (
                <div
                  style={{
                    margin: "0 auto",
                    paddingTop: "5px",
                    maxWidth: "850px",
                    width: "85%",
                    color: "red",
                    fontFamily: "sofia-pro",
                    fontSize: "1.5rem",
                  }}
                >
                  Please enter a valid URL
                </div>
              )}
            </>
          )}
          {videoArray.length > 0 && step < 3 && (
            <SortableVideosContainer
              distance={1}
              axis="xy"
              onSortEnd={onSortEnd}
              videoArray={videoArray}
            >
              <h2 className="photo-upload-preview-image-heading">
                Video Preview
              </h2>
              {videoArray.map((video, index) => (
                <>
                  <SortableVideo
                    video={video}
                    index={index}
                    key={index}
                    errorHandler={errorHandler}
                    setError={setError}
                  />
                </>
              ))}
            </SortableVideosContainer>
          )}
          {preview.length > 0 && step <= 2 && (
            <SortableImagesContainer
              distance={1}
              axis="xy"
              onSortEnd={onSortEnd}
              preview={preview}
            >
              <h2 className="photo-upload-preview-image-heading">
                Header Image
              </h2>
              {preview.map((image, i) => {
                return (
                  <>
                    <SortableImage
                      image={image}
                      fireModal={fireModal}
                      i={i}
                      index={i}
                      key={i}
                      preview={preview}
                      setPreview={setPreview}
                    />
                  </>
                );
              })}
            </SortableImagesContainer>
          )}
          {imageModal && (
            <ImagePreviewModal
              setPreview={setPreview}
              preview={preview}
              index={modalIndex}
              setIndex={setModalIndex}
              setImageModal={setImageModal}
              imageModal={imageModal}
            />
          )}
          {imageModal && <div className="photo-upload-modal"></div>}
          {(authTab === "register" || authTab === "login") && (
            <div className="photo-upload-final">
              {/* {step >=3 && <h3 className="photo-upload-final-explainer">Please sign up or log in to view listing</h3>} */}

              {authTab === "register" ? (
                <Register
                  text="Please sign up to view your listing:"
                  address={address}
                  addressSlug={addressSlug}
                  images={preview}
                  videos={videoArray}
                  authTab={authTab}
                  setAuthTab={setAuthTab}
                />
              ) : (
                <Login
                  address={address}
                  addressSlug={addressSlug}
                  images={preview}
                  videos={videoArray}
                  authTab={authTab}
                  setAuthTab={setAuthTab}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListingGenerator;
