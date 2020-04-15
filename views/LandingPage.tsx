import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import dynamic from "next/dynamic";
import "./LandingPage.scss";

interface AddressProps {
  address: string;
  setAddress: (address: string) => void;
}

const AddressInput = dynamic<AddressProps>(
  () => import("../components/ListingGenerator/AddressInput") as any,
  { ssr: false }
);

interface LandingPageProps {
  error: boolean;
  setError: (error: boolean) => void;
  setStep: (step: number) => void;
  address: string;
  setAddress: (address: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  error,
  setError,
  setStep,
  address,
  setAddress,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.length === 0) {
      setError(true);
    } else {
      setError(false);
      setStep(1);
    }
  };

  return (
    <div className="landing-page">
      <div className="landing-page-header-container">
        <div className="landing-page-header">
          <div className="landing-page-header-left">
            <div className="landing-page-header-welcome-message">
              <h1>Create beautiful listings.</h1>
              <p className="landing-page-header-explainer">
                Try our real estate listing and photography delivery platform.
              </p>
            </div>
            <form
              className="landing-page-header-address-form"
              onSubmit={(e) => handleSubmit(e)}
            >
              <AddressInput
                address={address}
                setAddress={setAddress}
              ></AddressInput>
              <button className="landing-page-header-address-submit-button">
                <IoMdArrowRoundForward
                  style={{ width: "38px", height: "26px" }}
                />
              </button>
            </form>
          </div>

          <div className="landing-page-header-right">
            <img
              src="/static/LandingImage.png"
              className="landing-page-header-image"
            ></img>
          </div>
        </div>
      </div>
      <div className="landing-page-content">
        <div className="landing-page-content-top">
          <div className="landing-page-content-top-left">
            <h2>Content Goes Here</h2>
            <p>Sub content goes here area weawefeaw awef awef awef awef awe faw efaw efaw fawe fawe fawe faw fawe awef awef awef aw aw </p>
          </div>
          <div className="landing-page-content-top-right">
            <img src="/static/LandingImage.png"></img>
          </div>
        </div>
        <div className="landing-page-content-middle">
          <div className="landing-page-content-middle-left">
            <img src="/static/LandingBackground.jpg"></img>
          </div>
          <div className="landing-page-content-middle-right">
            <h2>Content Goes Here</h2>
            <p>Sub content goes here area weawefeaw awef awef awef awef awe faw efaw efaw fawe fawe fawe faw fawe awef awef awef aw aw </p>
          </div>
        </div>
        <div className="landing-page-content-bottom">
          <div className="landing-page-content-bottom-left">
            <h2>Content Goes Here</h2>
            <p>Sub content goes here area wfeaw awef a awef awef awe faw efaw e fawe fawe fawe faw fawe awef awef awef aw aw </p>
          </div>
          <div className="landing-page-content-bottom-right">
            <img src="/static/LandingImage.png"></img>
          </div>
        </div>
        <div className="landing-page-content-base-cta"></div>
      </div>
    </div>
  );
};

export default LandingPage;
