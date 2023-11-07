import React, { useRef, useState, useEffect } from 'react';
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

// API 호출
import { axiosWithAuth } from 'https/http';

type Font = {
  font_id: bigint;
  kor_font_name: string;
  producer_name: string;
  font_file_url: string;
  dibCheck: boolean;
};
// type FontList = {
//   fontResponseList: Font[];
//   fontCount: number;
// };

const MainPageFontList: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();
  const [fonts, setFonts] = useState<Font[]>([]); // 폰트 데이터를 위한 상태

  // 폰트 데이터를 가져오는 함수
  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await axiosWithAuth.get('/font/list'); // API 경로는 예시입니다
        setFonts(response.data.fontResponseList); // 폰트 데이터 상태 업데이트
      } catch (error) {
        console.error('폰트 데이터를 가져오는 데 실패했습니다:', error);
      }
    };
    fetchFonts();
  }, []);

  const renderFontBoxes = () => {
    return fonts.map((font) => (
      <SwiperSlide key={font.font_id} className={classes.swiperSlid}>
        <FontBoxComponent 
        id={font.font_id.toString()} 
        title={font.kor_font_name} 
        maker={font.producer_name}
        // dib={font.dibCheck}
        />
      </SwiperSlide>
    ));
  };

  return (
    <div className={classes.container}>
      <div className={classes.headerBox}>
        <h1 className={classes.swiperHeader}>
          "여러분의 손글씨도 폰트가 될 수 있습니다."
          <br /> <span>폰트 제작 서비스, </span>
          <span className={classes.typeWriterContainer}>
            {/* <span className={classes.animationHeaderText}>또박또박</span> */}
            {/* test */}
            <span className={classes.animationHeaderText}>
              <img src={DdobakLogo} style={{ height: 60 }} alt="또박또박" />
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
          loop={fonts.length > 3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className={classes.swiper}
        >
          {/* {FontBoxSwiper()} */}
          {fonts.length > 0 ? renderFontBoxes() : <div>로딩 중...</div>}
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

