import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import backup from "../../images/login-image.jpg";

const ImageSlider = () => {
  const settings = {
    dots: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <div className="mt-8 h-2/3 w-full mx-auto px-6">
      <Slider {...settings}>
        <div>
          <h3>
            <img src={backup} alt="" />
          </h3>
        </div>
        <div>
          <h3>
            <img src={backup} alt="" />
          </h3>
        </div>
        <div>
          <h3>
            <img src={backup} alt="" />
          </h3>
        </div>
      </Slider>
    </div>
  );
};

export default ImageSlider;
