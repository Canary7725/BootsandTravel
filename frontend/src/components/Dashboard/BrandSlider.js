import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Camelback from "../../images/Brands/Camelback.png";
import Goldstar from "../../images/Brands/Goldstar.png";
import KTM from "../../images/Brands/KTM.png";
import Thule from "../../images/Brands/Thule.png";

const BrandSlider = () => {
  const settings = {
    speed: 1000,
    slidesToShow: 4,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 0,
    arrows: false,
  };

  return (
    <div className="mt-12 w-full mx-auto px-3 pt-3 pb-2 bg-primary">
      <Slider {...settings}>
        <div>
          <img src={Camelback} alt="" className="h-[40vh] w-[24vw] ml-2" />
        </div>
        <div>
          <img src={Camelback} alt="" className="h-[40vh] w-[24vw] ml-2" />
        </div>
        <div>
          <img src={Camelback} alt="" className="h-[40vh] w-[24vw] ml-2" />
        </div>
        <div>
          <img src={Camelback} alt="" className="h-[40vh] w-[24vw] ml-2" />
        </div>
      </Slider>
    </div>
  );
};

export default BrandSlider;
