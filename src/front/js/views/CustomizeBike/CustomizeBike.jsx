import React, { useState, useEffect } from "react";
import useStore from "../../store/AppContext.jsx";
import { FormattedMessage } from "react-intl";
import fetchGetBikes from "../../utils/fetchGetBikes.js";
import fetchGetPartByTypeTerrainAndSize from "../../utils/fetchGetPartByTypeTerrainAndSize.js";
import fetchGetUserBike from "../../utils/fetchGetUserBike.js";
import { useParams } from "react-router-dom";

import YourBike from "../../component/YourBike/YourBike.jsx";
import BikesCards from "../../component/BikesCards/bikesCards.jsx";
import PartsCards from "../../component/PartsCards/partsCards.jsx";
import "./CustomizeBike.css";

// image, title, description, link

const CustomizeBike = () => {
  const { store } = useStore();
  const params = useParams();
  const [bike, setBike] = useState({});
  const { userInfo } = store;
  const [listOfPart, setListOfPart] = useState([]);
  const [userBike, setUserBike] = useState([]);

  useEffect(() => {
    fetchGetBikes("mtb", setBike);
  }, []);

  useEffect(() => {
    const infoBike = async () => {
      const arrayOfBikes = await fetchGetUserBike(
        userInfo.bike_type,
        userInfo.size
        );
        setUserBike(arrayOfBikes);
      const arrayOfParts = await fetchGetPartByTypeTerrainAndSize(
        userInfo.bike_type,
        userInfo.size
      );
      setListOfPart(arrayOfParts);
    };
    if (userInfo && userInfo.bike_type && userInfo.size) {
      info();
      infoBike();
    }
  }, [userInfo]);

  const myrandom = () => {
    return Math.floor(Math.random() * 10000);
  };
  return (
    <>
      <YourBike list={listOfPart} bikes={userBike} />
      <div className="titleCards mt-5 text-center">
        <FormattedMessage id="myBikesFavouriteView"></FormattedMessage>
      </div>
      <div className="wrapperBikesCards">
        {bike.length
          ? bike.map((element) => {
              return (
                <BikesCards
                  key={myrandom()}
                  image={element.image}
                  title={element.title}
                  description={element.description}
                  link={element.link}
                />
              );
            })
          : null}
      </div>
      <div className="titleCards mt-5 text-center">
        <FormattedMessage id="myPartsFavouriteView"></FormattedMessage>
      </div>
      <PartsCards />
    </>
  );
};

export default CustomizeBike;
