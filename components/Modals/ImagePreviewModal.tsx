import React, { useRef, useEffect } from "react";
import "./ImagePreviewModal.scss";
import useOnclickOutside from "react-cool-onclickoutside";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PreviousArrow, NextArrow } from "./Arrows";

interface Preview {
  preview: string;
}

interface Props {
  preview: any;
  imageModal: boolean;
  setImageModal: (arg0: boolean) => void;
  index: number;
  setPreview?: (argo0: any) => void;
  setIndex?: (argo0: any) => void;
}

const ImagePreviewModal: React.FC<Props> = ({
  preview,
  imageModal,
  setImageModal,
  index,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useOnclickOutside(ref, () => {
      setImageModal(false);
    });
  });

  let imageIndex = index;

  var settings = {
    dots: false,
    dotsClass: "slick-dots",
    infinite: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div key={index} className="image-preview-modal" ref={ref}>
      <div className="image-preview-modal-left">
        <div
          className="image-preview-modal-image-container"
          style={{ borderRadius: "10px", background: "black" }}
        >
          <Slider {...settings} className="image-preview-modal-slider">
            {preview.map((image?: any, i?: number) => {
              return (
                <div className="image-preview-modal-image-container" key={i}>
                  <img
                    src={
                      preview[imageIndex].preview
                        ? preview[imageIndex].preview
                        : preview[imageIndex]
                    }
                    className="image-preview-modal-image"
                  />
                  {imageIndex === preview.length - 1
                    ? (imageIndex = 0)
                    : imageIndex++}
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      {/* <div className="image-preview-modal-right">
        <div className="image-preview-modal-content">
          <div className="image-preview-modal-title">
            <div className="image-preview-modal-user-avatar">
              <UserAvatar image='https://ca.slack-edge.com/T4JUEB3ME-UF0MEJPQS-456f70806ec0-512' height="50px" width="50px" />
            </div>
            <div className="image-preview-modal-credentials">
              <p className="image-preview-modal-user-name">Anthony Venturini</p>
              <p className="image-preview-modal-time">2 hours ago</p>
            </div>
            <div className="image-preview-modal-footer">
    
        </div>
          </div>
          <p className="image-preview-modal-word-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
         
        </div> */}
    </div>
  );
};

export default ImagePreviewModal;
