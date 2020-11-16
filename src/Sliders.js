import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import "./Sliders.css";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

function Sliders() {
  return (
    <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={33}
      totalSlides={4}
    >
      <Slider>
        <Slide index={0}> 
          <img
            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
            alt=""
            className="home__image"
          />
        </Slide>
        <Slide index={1}>
          <img
            src="https://images-fe.ssl-images-amazon.com/images/G/35/digital/video/merch/2020/Other/BRND_MTH20_00000_GWBleedingHero_1500x600_Final_en-AU_FT_PVD5877._CB418050703_.jpg%22%20height=%22600px%22%20width=%221500px%22%20data-a-hires=%22https://images-fe.ssl-images-amazon.com/images/G/35/digital/video/merch/2020/Other/BRND_MTH20_00000_GWBleedingHero_3000x1200_Final_en-AU_FT_PVD5877._CB418050703_.jpg"
            alt=""
            className="home__image"
          />
        </Slide>
        <Slide index={2}>
          <img
            src="https://images-fe.ssl-images-amazon.com/images/G/35/kindle/journeys/NzU5ZWVmZmYt/NzU5ZWVmZmYt-NmYwNzVhNmQt-w1500._CB419133226_.jpg%22%20height=%22600px%22%20width=%221500px%22%20data-a-hires=%22https://images-fe.ssl-images-amazon.com/images/G/35/kindle/journeys/NzU5ZWVmZmYt/NzU5ZWVmZmYt-ZDhjNDU4NzMt-w3000._CB419133224_.jpg"
            alt=""
            className="home__image"
          />
        </Slide>
        <Slide index={3}>
          <img
            src="https://images-fe.ssl-images-amazon.com/images/G/35/kindle/journeys/MThkY2E5OWYt/MThkY2E5OWYt-MzllNTQ0NTgt-w1500._CB403789420_.jpg%22%20height=%22600px%22%20width=%221500px%22%20data-a-hires=%22https://images-fe.ssl-images-amazon.com/images/G/35/kindle/journeys/MThkY2E5OWYt/MThkY2E5OWYt-MGIzMzkwZjYt-w3000._CB403789420_.jpg"
            alt=""
            className="home__image"
          />
        </Slide>
      </Slider>

      <div className="slide">
        <ButtonBack className="slide__buttons">
          <FiberManualRecordIcon />
        </ButtonBack>
        <ButtonNext className="slide__buttons">
          <FiberManualRecordIcon />
        </ButtonNext>
        <ButtonNext className="slide__buttons">
          <FiberManualRecordIcon />
        </ButtonNext>
        <ButtonNext className="slide__buttons">
          <FiberManualRecordIcon />
        </ButtonNext>
      </div>
    </CarouselProvider>
  );
}

export default Sliders;
