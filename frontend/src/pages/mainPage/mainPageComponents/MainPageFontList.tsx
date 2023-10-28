import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// button img

import classes from './MainPageFontList.module.css';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';

// 컴포넌트
import FontBoxComponent from 'pages/fontListPage/fontListPageComponents/FontBoxComponent';

import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { mainRedColor } from 'common/colors/CommonColors';

const MainPageFontList: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className={classes.container}>
      <div className={classes.headerBox}>
        <h1 className={classes.swiperHeader}>
          "여러분의 손글씨도 폰트가 될 수 있습니다."
          <br /> 폰트 제작 서비스, <span className={classes.swiperRedHeader}>또박또박</span>
        </h1>
      </div>
      <div className={classes.swiperLargeBox}>
        <FaCircleChevronLeft
          size={50}
          color={mainRedColor}
          onClick={() => {
            swiperRef.current?.slidePrev(); // swiper의 slidePrev 실행
          }}
          className={classes.customBtn}
        />
        <Swiper
          onBeforeInit={(swiper: SwiperInstance) => (swiperRef.current = swiper)} // ref에 swiper 저장
          slidesPerView={3}
          spaceBetween={21}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className={classes.swiper}
        >
          {FontBoxSwiper()}
        </Swiper>
        <FaCircleChevronRight
          size={50}
          color={mainRedColor}
          onClick={() => {
            swiperRef.current?.slideNext(); // swiper의 slideNext 실행
          }}
          className={classes.customBtn}
        />
      </div>
    </div>
  );
};
export default MainPageFontList;

const NUMBER_OF_SWIPERSLID = 200;
const FontBoxSwiper = () => {
  let boxes = [];
  for (let i = 0; i < NUMBER_OF_SWIPERSLID; i++) {
    boxes.push(
      <SwiperSlide key={i + 'f'} className={classes.swiperSlid}>
        <FontBoxComponent />
      </SwiperSlide>,
    );
  }

  return boxes;
};
