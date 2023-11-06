import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import classes from './ExchangeModal.module.css';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { exchangeModalActions } from 'store/exchangeModalSlice';
import { AiOutlineClose, AiFillCloseCircle } from 'react-icons/ai';
import { mainRedColor, borderColor } from 'common/colors/CommonColors';

interface ExchangeModalState {
  exchangeModal: {
    exchangeVisible: boolean;
  };
}

const BANK_LIST = [
  '한국은행',
  '산업은행',
  '기업은행',
  '국민은행',
  '외환은행',
  '수협은행',
  '수출입은행',
  '농협은행',
  '농협회원조합',
  '우리은행',
  'SC제일은행',
  '서울은행',
  '한국씨티은행',
  '대구은행',
  '부산은행',
  '광주은행',
  '제주은행',
  '전북은행',
  '경남은행',
  '새마을금고연합회',
  '신협중앙회',
  '상호저축은행',
  '기타 외국계은행',
  '모건스탠리은행',
  'HSBC은행',
  '도이치은행',
  '알비에스피엘씨은행',
  '제이피모간체이스은행',
  '미즈호코퍼레이트은행',
  '미쓰비시도쿄UFJ은행',
  'BOA',
  '비엔피파리바은행',
  '중국공상은행',
  '중국은행',
  '산림조합',
  '대화은행',
  '우체국',
  '신용보증기금',
  '기술신용보증기금',
  '하나은행',
  '신한은행',
  '케이뱅크',
  '카카오뱅크',
  '토스뱅크',
  '한국주택금융공사',
  '서울보증보험',
  '경찰청',
  '금융결제원',
  '동양종합금융증권',
  '현대증권',
  '미래에셋증권',
  '대우증권',
  '삼성증권',
  '한국투자증권',
  'NH투자증권',
  '교보증권',
  '하이투자증권',
  '에이치엠씨투자증권',
  '키움증권',
  '이트레이드증권',
  'SK증권',
  '대신증권',
  '솔로몬투자증권',
  '한화증권',
  '하나대투증권',
  '신한금융투자',
  '동부증권',
  '유진투자증권',
  '메리츠증권',
  '엔에이치투자증권',
  '부국증권',
  '신영증권',
  '엘아이지투자증권',
];

const ExchangeModal: React.FC = () => {
  useEffect(() => {
    ReactModal.setAppElement('body'); // body나 다른 id를 사용할 수 있습니다.

    setTotalPoint(CURRENT_POINT);
  }, []);
  const dispatch = useDispatch();
  const clickChargeHandler = () => {
    dispatch(exchangeModalActions.toggle());
  };
  const showExchange = useSelector(
    (state: ExchangeModalState) => state.exchangeModal.exchangeVisible,
  );
  const closeModal = () => {
    clickChargeHandler();
  };

  const CURRENT_POINT = 45000;

  // 선택은행
  // 계좌번호
  const [selectedBank, setSelectedBank] = useState<string>('');

  // const [currentPoint, setCurrentPoint] = useState<number>(CURRENT_POINT);
  const [exchangePoint, setExchangePoint] = useState<number>(0);
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const howMuchCharge = (value: number) => {
    // console.log(currentPoint, value);
    if (totalPoint < value) {
      alert('인출할 금액을 초과하였습니다.');
      return;
    }
    setExchangePoint(exchangePoint + value);
    setTotalPoint(totalPoint - value);
  };
  const removeCharge = () => {
    setExchangePoint(0);
    setTotalPoint(CURRENT_POINT);
  };
  return (
    <ReactModal
      isOpen={showExchange}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      className={classes.overLay}
      style={{
        content: {
          zIndex: 10005,
        },
        overlay: {
          zIndex: 10004, // NavBar보다 1 높게 설정
          // ... other styles
        },
      }}
    >
      <div className={classes.modalContainer}>
        <div className={classes.topBox}>
          <AiOutlineClose size={30} className={classes.closeIcon} onClick={closeModal} />
        </div>
        <div className={classes.middleBox}>
          <div
            className={classes.innerBox}
            style={{
              borderBottomStyle: 'solid',
              borderBottomWidth: 2,
              borderBottomColor: borderColor,
            }}
          >
            <p className={classes.innerText}>현재 포인트</p>
            <p className={classes.innerText}>{CURRENT_POINT} P</p>
          </div>
          <div
            className={classes.innerMiddleBox}
            style={{ height: 40, justifyContent: 'space-between' }}
          >
            <p className={classes.innerText}>인출할 포인트</p>
            <p className={classes.innerNormalText}>인출은 1,000 단위로 가능합니다.</p>
          </div>
          <div
            className={classes.innerMiddleBox}
            style={{ height: 60, justifyContent: 'flex-end' }}
          >
            <div className={classes.chargeBox}>
              <p className={classes.chargeText}>{exchangePoint} P</p>
              <div className={classes.removeImgBox}>
                <AiFillCloseCircle size={32} color={borderColor} onClick={removeCharge} />
              </div>
            </div>
          </div>
          <div
            className={classes.innerMiddleBox}
            style={{ height: 40, justifyContent: 'flex-end' }}
          >
            <button
              className={classes.valueBtn}
              onClick={() => {
                howMuchCharge(1000);
              }}
            >
              + 1,000
            </button>
            <button
              className={classes.valueBtn}
              onClick={() => {
                howMuchCharge(5000);
              }}
            >
              + 5,000
            </button>
            <button
              className={classes.valueBtn}
              onClick={() => {
                howMuchCharge(10000);
              }}
            >
              + 10,000
            </button>
            <button
              className={classes.valueBtn}
              onClick={() => {
                howMuchCharge(50000);
              }}
            >
              + 50,000
            </button>
          </div>
          <div
            className={classes.innerMiddleBox}
            style={{
              height: 40,
              justifyContent: 'space-between',
              borderTopStyle: 'solid',
              borderTopWidth: 2,
              borderTopColor: borderColor,
              paddingTop: 10,
            }}
          >
            <p className={classes.innerText}>입금 계좌</p>
            <p className={classes.innerNormalText}>
              -없이 입력해주세요. 입금은 약 2~3일이 소요됩니다.
            </p>
          </div>
          <div
            className={classes.innerMiddleBox}
            style={{ height: 60, justifyContent: 'flex-end' }}
          >
            {/* <input type="text" placeholder="은행명" className={classes.inputBank} /> */}

            <Dropdown
              options={BANK_LIST}
              onChange={(e) => {
                setSelectedBank(e.value);
              }}
              value={selectedBank}
              placeholder="은행명"
              controlClassName={classes.controlClass}
            />
            <input type="text" placeholder="계좌번호" className={classes.inputAccount} />
          </div>
          <div
            className={classes.innerBox}
            style={{ borderTopStyle: 'solid', borderTopWidth: 2, borderTopColor: borderColor }}
          >
            <p className={classes.innerText} style={{ color: mainRedColor }}>
              나머지 포인트
            </p>
            <p className={classes.innerText}>{totalPoint} P</p>
          </div>
        </div>
        <div className={classes.bottomBox}>
          <button
            className={classes.modalBtn}
            style={{ backgroundColor: mainRedColor }}
            onClick={closeModal}
          >
            인출하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ExchangeModal;
