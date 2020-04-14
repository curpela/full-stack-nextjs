import React from "react";
import { IoMdArrowRoundForward } from "react-icons/io";
import dynamic from "next/dynamic";
import "./LandingPage.scss"


interface AddressProps {
    address: string;
    setAddress: (address: string) => void;
  }

const AddressInput = dynamic<AddressProps>(
    () => import("../components/ListingGenerator/AddressInput") as any,
    { ssr: false }
  );
  
interface LandingPageProps {
    error: boolean,
    setError: (error: boolean) => void,
    setStep: (step: number) => void,
    address: string,
    setAddress: (address: string) => void
}

const LandingPage: React.FC<LandingPageProps> = ({error, setError, setStep, address, setAddress}) => {

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
    <div className="landing-page-container">
      <div className="landing-page-header">
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
            <IoMdArrowRoundForward style={{ width: "38px", height: "26px" }} />
          </button>
        </form>
      </div>
      <div className="landing-page-header-image-container">
        <img
          src="/static/LandingImage.png"
          className="landing-page-header-image"
        ></img>
      </div>
    </div>
  );
};

export default LandingPage;
