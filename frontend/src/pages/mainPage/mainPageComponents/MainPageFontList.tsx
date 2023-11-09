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
import MainFontBox from './mainFontBox/MainFontBox';

import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import { mainRedColor } from 'common/colors/CommonColors';

// 로고 테스트
import DdobakLogo from '../../../common/commonAssets/ddobak_logo.png';

// API 호출
import { axiosWithAuth, axiosWithoutAuth, getData } from 'https/http';

type Font = {
  font_id: bigint;
  kor_font_name: string;
  producer_name: string;
  font_file_url: string;
  dibCheck: boolean;
};
type FontList = {
  fontListResponse: Font[];
  fontCount: number;
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
      const token = await getData('accessToken');
      if (token) {
        try {
          const response: FontList = await axiosWithAuth.get('/font/list').then((r) => {
            return r.data;
          }); // API 경로는 예시입니다
          console.log('로그인 한 상태에서 데이터 가져오기');
          console.log(response);
          setFonts(response.fontListResponse); // 폰트 데이터 상태 업데이트
        } catch (error) {
          console.error('폰트 데이터를 가져오는 데 실패했습니다:', error);
        }
      } else {
        try {
          const response: FontList = await axiosWithoutAuth.get('/font/list/NoAuth').then((r) => {
            return r.data;
          }); // API 경로는 예시입니다
          console.log('비회원 한 상태에서 데이터 가져오기');
          console.log(response);
          setFonts(response.fontListResponse); // 폰트 데이터 상태 업데이트
        } catch (error) {
          console.error('폰트 데이터를 가져오는 데 실패했습니다:', error);
        }
      }
    };
    fetchFonts();
  }, []);

  const renderFontBoxes = () => {
    return fonts.map((font) => (
      <SwiperSlide key={font.font_id} className={classes.swiperSlid}>
        <MainFontBox
          id={font.font_id.toString()}
          title={font.kor_font_name}
          maker={font.producer_name}
          dib={font.dibCheck}
        />
      </SwiperSlide>
    ));
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [getNumber, setGetNumber] = useState<number>(3);
  const [gapSize, setGapSize] = useState<number>(31);
  // 화면 크기가 변경될 때 호출되는 함수
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // useEffect 내에서 화면 크기에 따라 getNumber 상태를 설정하는 로직
  useEffect(() => {
    if (screenWidth <= 930) {
      setGetNumber(1);
      setGapSize(40);
    } else if (screenWidth <= 1200) {
      setGetNumber(2);
      setGapSize(40);
    } else {
      setGetNumber(3);
      setGapSize(31);
    }
  }, [screenWidth]); // screenWidth가 변경될 때마다 이 효과를 실행합니다.

  // resize 이벤트에 대한 리스너를 설정합니다.
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 빈 의존성 배열로 이 효과는 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  return (
    <div className={classes.container}>
      <div className={classes.headerBox}>
        <h1 className={classes.swiperHeader}>
          "여러분의 손글씨도 폰트가 될 수 있습니다."
          <br /> <span className={classes.swiperHeader}>폰트 제작 서비스, </span>
          <span className={classes.typeWriterContainer}>
            <span className={classes.animationHeaderText}>
              <img src={DdobakLogo} className={classes.ddobakLogo} alt="또박또박" />
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
          slidesPerView={getNumber}
          spaceBetween={gapSize}
          loop={fonts && fonts.length > 3}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          className={classes.swiper}
        >
          {/* {FontBoxSwiper()} */}
          {fonts && fonts.length > 0 ? renderFontBoxes() : <div>로딩 중...</div>}
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
