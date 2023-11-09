import React, { useEffect, useRef, useState } from 'react';
import classes from './FontUserReview.module.css';
// import { axiosWithAuth } from 'https/http';

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

// 테스트 이미지
// import MinuGuide from '../fontDetailPageAssets/review_ex.png';
import { reviewListAPI } from 'https/utils/ReviewFunction';

interface ReviewListType {
  reviewer: string;
  reviewContext: string;
  reviewUrl: string;
}

const FontBoxSwiper = (data: ReviewListType[]) => {
  let boxes = [];
  for (let i = 0; i < data.length; i++) {
    boxes.push(
      <SwiperSlide key={i + 'fff'} className={classes.swiperSlid}>
        <div className={classes.imgContainer}>
          <img src={data[i].reviewUrl} alt="MinuGuide" />
        </div>
        <div className={classes.reviewText}>{data[i].reviewContext}</div>
      </SwiperSlide>,
    );
  }

  return boxes;
};

interface FontUserReviewType {
  fontId: string;
}

const FontUserReview: React.FC<FontUserReviewType> = ({ fontId }) => {
  const swiperRef = useRef<SwiperCore>();
  const [reviewList, setReviewList] = useState<ReviewListType[]>([]);
  // FontUserReview.js 예시
  // const fetchReviews = async () => {
  //   try {
  //     const response = await axios.get('/api/review');
  //     // 상태에 리뷰 데이터 저장
  //   } catch (error) {
  //     // 에러 핸들링
  //   }
  // };
  useEffect(() => {
    async function fetch() {
      const data = await reviewListAPI(fontId)
        .then((r) => {
          console.log(r);
          return r.reviewResponseList;
        })
        .catch((e) => {
          console.error(e);
        });
      await setReviewList(data);
    }
    fetch();
  }, [fontId]);

  return (
    <>
      <div className={classes.container}>
        <div className={classes.swiperLargeBox}>
          <FaCircleChevronLeft
            size={40}
            color="gray"
            onClick={() => {
              swiperRef.current?.slidePrev(); // swiper의 slidePrev 실행
            }}
            className={classes.customBtn}
          />
          <Swiper
            onBeforeInit={(swiper: SwiperInstance) => (swiperRef.current = swiper)} // ref에 swiper 저장
            slidesPerView={3}
            spaceBetween={0}
            loop={true}
            // autoplay={{
            //   delay: 2500,
            //   disableOnInteraction: false,
            // }}
            modules={[Autoplay, Navigation]}
            className={classes.swiper}
          >
            {FontBoxSwiper(reviewList)}
          </Swiper>
          <FaCircleChevronRight
            size={40}
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
