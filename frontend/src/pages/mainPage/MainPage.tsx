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
import MainPageMiniManuscript from './mainPageComponents/MainPageMiniManuscript';
const MainPage: React.FC = () => {
  const [screenWidth, setScreenWidth] = useState<number>(1001);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // resize 이벤트에 대한 리스너를 설정합니다.
  useEffect(() => {
    handleResize();

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
            <MainFooterText screenWidth={screenWidth}>이 지 은</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>이 태 성</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>이 재 명</MainFooterText>
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
            <MainFooterText screenWidth={screenWidth}>김 진 주</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>이 민 규</MainFooterText>
            <MainFooterText screenWidth={screenWidth}>이 규 민</MainFooterText>
          </MainFooterBetweenInnerBox>
        </MainFooterBetween>
      </MainFooter>
    </main>
  );
};

export default MainPage;
