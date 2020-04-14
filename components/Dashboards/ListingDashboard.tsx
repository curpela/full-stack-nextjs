import React from "react";
import "./ListingDashboard.scss";
import Link from "next/link";
import Button from "../Sharable/Button";
import { GoCreditCard, GoPlus } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import UserAvatar from "../Sharable/UserAvatar";


const houses = [
  {
    id: 1,
    address: "48592 Jerome",
    aptNumber: "",
    city: "Shelby Township",
    state: "MI",
    zip: "48315",
    admins: [
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1556955112-28cde3817b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1487975460695-a2e5c4ea12c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    images: [
      "https://images.unsplash.com/photo-1487975460695-a2e5c4ea12c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1556955112-28cde3817b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1487975460695-a2e5c4ea12c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ]
  },
  {
    id: 2,
    address: "48592 Jerome",
    aptNumber: "",
    city: "Shelby Township",
    state: "MI",
    zip: "48315",
    images: [
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1556955112-28cde3817b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1487975460695-a2e5c4ea12c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    admins: [
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1556955112-28cde3817b0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      "https://images.unsplash.com/photo-1487975460695-a2e5c4ea12c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
      "https://images.unsplash.com/photo-1515095182805-4367ad159fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    addressSlug: "111-Jerome"
  }
];

const user = {
  id: 1,
  type: "photographer"
};

export default function ListingDashboard() {
  //image
  //house address
  //add 3rd party
  //Amount owed
  return (
    <div className="listing-dashboard">
      <h1 className="listing-dashboard-title">Listings Dashboard</h1>
      <div className="listing-dashboard-tabs">
        <h2>House Address</h2>
        <h2 style={{ marginLeft: "95px" }}>Invite 3rd Party</h2>
        <h2 style={{ marginLeft: "70px" }}>Admins</h2>
        <h2>Invoicing</h2>
      </div>
      <div className="listing-dashboard-container">
        {houses.map(house => {
          return (
            <div className="listing-dashboard-house">
              <Link href="/house/[address]" as={`/house/${house.addressSlug}`}>
                <div className="listing-dashboard-house-creds">
                  <img
                    src={house.images[0]}
                    className="listing-dashboard-house-image"
                  />

                  <div className="listing-dashboard-house-address">
                    <p className="listing-dashboard-house-address-street-number">
                      {house.address}
                    </p>
                    <p className="listing-dashboard-house-address-city-state-zip">
                      {" "}
                      {house.city}, {house.state} {house.zip}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="listing-dashboard-house-invite">
                <input
                  className="listing-dashboard-house-invite-input"
                  placeholder="Enter Email..."
                ></input>
                <div className="listing-dashboard-house-invite-icon">
                  <Button
                    text={<GoPlus />}
                    width="33px"
                    height="33px"
                    padding="6px 8px"
                    borderBottomLeftRadius="0px"
                    borderTopLeftRadius="0px"
                  />
                </div>
              </div>
              <div className="listing-dashboard-house-admins">
                {house.admins.map((admin, i) => {
                    return(
                  <div className="listing-dashboard-house-admins-icon">
                                        
                    <UserAvatar
                      image={admin}
                      width="100%"
                      height="100%"
                      border="1.5px solid black"
                    />
                    {/* <img
                      src={admin}
                      style={{ width: "100%", height: "100%" }}
                    /> */}
                  </div>)
                })}
              </div>
              <div className="listing-dashboard-house-invoicing">
                <p className="listing-dashboard-house-outstanding-balance">
                  $300
                </p>
                {user.type === "photographer" ? (
                  <Button
                    text={
                      <FaRegEdit style={{ width: "14px", height: "14px" }} />
                    }
                    width="24px"
                    height="24px"
                    padding="2px 7px"
                    borderRadius="4px"
                  />
                ) : (
                  <Button
                    text={
                      <GoCreditCard style={{ width: "14px", height: "14px" }} />
                    }
                    width="24px"
                    height="22px"
                    padding="2px 4px"
                    borderRadius="4px"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
