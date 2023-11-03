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

// 로고 테스트
import DdobakLogo from '../../../common/commonAssets/ddobak_logo.png';

const MainPageFontList: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();

  return (
    <div className={classes.container}>
      <div className={classes.headerBox}>
        <h1 className={classes.swiperHeader}>
          "여러분의 손글씨도 폰트가 될 수 있습니다."
          <br /> 폰트 제작 서비스,{' '}
          <span className={classes.typeWriterContainer}>
            {/* <span className={classes.animationHeaderText}>또박또박</span> */}
            {/* test */}
            <span className={classes.animationHeaderText}>
              <img src={DdobakLogo} style={{ height: 75.2 }} alt="또박또박" />
            </span>
          </span>
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
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className={classes.swiper}
        >
          {/* {FontBoxSwiper()} */}
          {renderFontBoxes()}
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

// const NUMBER_OF_SWIPERSLID = 200;
// const FontBoxSwiper = () => {
//   let boxes = [];
//   for (let i = 0; i < NUMBER_OF_SWIPERSLID; i++) {
//     boxes.push(
//       <SwiperSlide key={i + 'f'} className={classes.swiperSlid}>
//         <FontBoxComponent />
//       </SwiperSlide>,
//     );
//   }

//   return boxes;
// };

const renderFontBoxes = () => {
  const fonts = [
    {
      id: '1',
      title: '또박또박_테스트체_1',
      maker: '김싸피_1',
      content: '다람쥐 헌 쳇바퀴에 타고파_1',
    },
    {
      id: '2',
      title: '또박또박_테스트체_2',
      maker: '이싸피_2',
      content: '다람쥐 헌 쳇바퀴에 타고파_2',
    },
    {
      id: '3',
      title: '또박또박_테스트체_3',
      maker: '박싸피_3',
      content: '다람쥐 헌 쳇바퀴에 타고파_3',
    },
    {
      id: '4',
      title: '또박또박_테스트체_4',
      maker: '최싸피_4',
      content: '다람쥐 헌 쳇바퀴에 타고파_4',
    },
    {
      id: '5',
      title: '또박또박_테스트체_5',
      maker: '정싸피_5',
      content: '다람쥐 헌 쳇바퀴에 타고파_5',
    },
    {
      id: '6',
      title: '또박또박_테스트체_6',
      maker: '양싸피_6',
      content: '다람쥐 헌 쳇바퀴에 타고파_6',
    },
    {
      id: '7',
      title: '또박또박_테스트체_7',
      maker: '위싸피_7',
      content: '다람쥐 헌 쳇바퀴에 타고파_7',
    },
    {
      id: '8',
      title: '또박또박_테스트체_8',
      maker: '안싸피_8',
      content: '다람쥐 헌 쳇바퀴에 타고파_8',
    },
  ];

  return fonts.map((font) => (
    <SwiperSlide key={font.id} className={classes.swiperSlid}>
      <FontBoxComponent id={font.id} title={font.title} maker={font.maker} content={font.content} />
    </SwiperSlide>
  ));
};
