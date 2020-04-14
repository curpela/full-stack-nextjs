import React, { useRef, useEffect } from "react";
import "./PostModal.scss";
import UserAvatar from "../Sharable/UserAvatar";
import useOnclickOutside from "react-cool-onclickoutside";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PreviousArrow, NextArrow } from "./Arrows";

interface Post {
  url: string;
}

interface Props {
  post: any;
  image: string;
  postModal: boolean;
  setPostModal: (arg0: boolean) => boolean;
}

export default function PostModal(props: Props) {
  const { post, image, postModal, setPostModal } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    useOnclickOutside(ref, () => {
      setPostModal(false);
    });
  });

  var settings = {
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="post-modal" ref={ref}>
      <div className="post-modal-left">
        <div className="post-modal-image-container">
          <Slider {...settings} className="post-modal-slider">
            {post.url.map((image: string, i: number) => {
              return (
                <div className="post-modal-image-container" key={i}>
                  <img src={image} className="post-modal-image"></img>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>

      <div className="post-modal-right">
        <div className="post-modal-content">
          <div className="post-modal-title">
            <div className="post-modal-user-avatar">
              <UserAvatar image={post.url} height="50px" width="50px" />
            </div>
            <div className="post-modal-credentials">
              <p className="post-modal-user-name">Anthony Venturini</p>
              <p className="post-modal-time">2 hours ago</p>
            </div>
            <div className="post-modal-footer">
              {/* <div className="post-modal-attributes">
            <div className="post-modal-likes">
              <IoIosHeartEmpty className="post-modal-like-icon" />
              <p className="post-modal-number-of-likes">1.6k</p>
            </div>
            <div className="post-modal-comments">
              <FaRegComments className="post-modal-comments-icon" />
              <p className="post-modal-number-of-comments">127</p>
            </div>
          </div> */}
            </div>
          </div>
          <p className="post-modal-word-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="post-modal-comment-section">
          <div className="post-modal-comment-author-avatar"></div>
          <div className="post-modal-comment-author">JDvento</div>
          <div className="post-modal-comment">
            <p className="post-modal-comment-content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.
            </p>
          </div>
        </div>
        <input
          className="post-modal-comment-input"
          placeholder="Add Comment"
        ></input>
      </div>
    </div>
  );
}
