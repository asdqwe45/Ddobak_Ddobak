import React, { useCallback } from 'react';
// import axios from 'axios';

interface PaymentProps {
  amount: number;
  // 결제 성공, 실패, 취소 시 호출할 콜백 함수를 props로 받기
  onPaymentSuccess: (response: any) => void;
  onPaymentFailure: (error: any) => void;
  onPaymentCancel: (cancelData: any) => void;
}

const PaymentComponent: React.FC<PaymentProps> = ({
  amount,
  onPaymentSuccess,
  onPaymentFailure,
  onPaymentCancel,
}) => {
  const onClickPayment = useCallback(() => {
    // 1. 아임포트 모듈 초기화
    const { IMP } = window as any;
    IMP.init('imp48632810'); // 가맹점 식별코드를 입력

    // 2. 결제 정보를 설정하고 결제창을 호출
    IMP.request_pay({
      pg: 'html5_inicis', // PG사의 코드
      pay_method: 'card', // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, // 가맹점에서 관리하는 주문번호
      name: '주문명', // 주문명
      amount: amount, // 결제 금액
      buyer_email: 'zizu4256@naver.com', // 구매자 이메일
      buyer_name: '또박또박', // 구매자명
      buyer_tel: '010-1234-5678', // 구매자 전화번호
      buyer_addr: '광주광역시 광산구 오선동', // 구매자 주소
      buyer_postcode: '123-456', // 구매자 우편번호
      // ... 기타 필요한 결제 정보를 설정
    }, (response: any) => {
      
      // 3. 결제 완료 후 콜백 함수를 실행
      if (response.success) {
        // 결제 성공 시 로직
        console.log('성공')
        onPaymentSuccess(response);
      } else {
        // 결제 실패 시 로직
        console.log('실패')
        onPaymentFailure(response);
      }
    });
  }, [amount, onPaymentSuccess, onPaymentFailure ]);

  return <button onClick={onClickPayment}>결제창</button>;
};

export default PaymentComponent;
