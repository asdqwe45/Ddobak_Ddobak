import React, { useRef } from 'react';
import classes from './FontUserReview.module.css';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperInstance } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper as SwiperCore } from 'swiper/types';

// icons
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';


const NUMBER_OF_SWIPERSLID = 200;
const FontBoxSwiper = () => {
  let boxes = [];
  for (let i = 0; i < NUMBER_OF_SWIPERSLID; i++) {
    boxes.push(
      <SwiperSlide key={i + 'f'} className={classes.swiperSlid}>
        <h3>이미지와 리뷰</h3>
      </SwiperSlide>,
    );
  }

  return boxes;
};
const FontUserReview: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <>
      <div className={classes.container}>
        <h1>폰트 활용 후기</h1>
        <div className={classes.swiperLargeBox}>
          <FaCircleChevronLeft
            size={50}
            color="gray"
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
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            modules={[Autoplay, Navigation]}
            className={classes.swiper}
          >
            {FontBoxSwiper()}
          </Swiper>
          <FaCircleChevronRight
            size={50}
            color="gray"
            onClick={() => {
              swiperRef.current?.slideNext(); // swiper의 slideNext 실행
            }}
            className={classes.customBtn}
          />
        </div>
      </div>
    </>
  );
};
export default FontUserReview;
