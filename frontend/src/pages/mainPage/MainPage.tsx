import { useState, useEffect } from 'react';
import classes from './MainPage.module.css';
import {
  MainFooter,
  MainFooterHeader,
  MainFooterText,
  MainFooterBetween,
  MainFooterMiddle,
  MainFooterBetweenInnerBox,
  MainFooterHeaderText1,
  MainFooterHeaderText2,
} from './mainPageComponents/MainPageComponents';
// 조금 큰 컴포넌트
import MainPageMiniManuscript from './mainPageComponents/MainPageMiniManuscript';
import MainPageLargeManuscript from './mainPageComponents/MainPageLargeManuscript';
import MainPageFontList from './mainPageComponents/MainPageFontList';
import MainPageGuide from './mainPageComponents/MainPageGuide';

const MainPage: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(1001);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  // resize 이벤트에 대한 리스너를 설정합니다.
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <main className={classes.container}>
      {/* 첫 번째 메인 페이지 */}
      <div className={classes.mainLargePage}>
        <MainPageLargeManuscript />
      </div>
      <div className={classes.mainLargePage}>
        <MainPageFontList />
      </div>
      {screenWidth < 1000 ? (
        <></>
      ) : (
        <>
          <div className={classes.mainLargePage}>
            <MainPageGuide />
          </div>
        </>
      )}

      <MainFooter>
        <MainFooterBetween>
          <MainFooterBetweenInnerBox>
            <MainFooterText screenWidth={screenWidth}>LEE JI EUN</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>LEE TAE SEONG</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>LEE JAE MYEONG</MainFooterText>
          </MainFooterBetweenInnerBox>
        </MainFooterBetween>
        <MainFooterMiddle>
          <MainFooterHeader>또박또박 고객문의</MainFooterHeader>
          <MainFooterHeaderText1>원고지를 클릭하시면 </MainFooterHeaderText1>
          <MainFooterHeaderText2>구글폼으로 연결됩니다</MainFooterHeaderText2>
          <MainPageMiniManuscript />
        </MainFooterMiddle>
        <MainFooterBetween>
          <MainFooterBetweenInnerBox>
            <MainFooterText screenWidth={screenWidth}>KIM JIN JU</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>LEE MIN KYU</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>LEE KYU MIN</MainFooterText>
          </MainFooterBetweenInnerBox>
        </MainFooterBetween>
      </MainFooter>
    </main>
  );
};

export default MainPage;
