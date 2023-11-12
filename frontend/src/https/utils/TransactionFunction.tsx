import { axiosWithAuth, getData } from 'https/http';

const BASE_URL = '/transaction';

// 포인트 충전 요청
export async function transactionChargeAPI(amount: number): Promise<any> {
  const data = {
    amount: amount,
  };
  return axiosWithAuth
    .post(BASE_URL + '/charge', data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 포인트 충전 내역 조회 [4]
// 리스트
// interface TransactionResponse {
//     transactionDate: Date;
//     transactionType: string;
//     fontName: string;
//     fontCreator: string;
//     transactionAmount: number;
//     transactionAfterAmount: number;
//     isMultiple: boolean;
//     totalOrderCount: number;
//   }
export async function transactionChargeListAPI(): Promise<any> {
  const memberId = await getData('id');
  return axiosWithAuth
    .get(BASE_URL + `/charge/list/${memberId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 포인트 인출 요청
export async function transactionWithdrawAPI(amount: number): Promise<any> {
  const data = {
    amount: amount,
  };
  return axiosWithAuth
    .post(BASE_URL + '/withdraw', data)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 포인트 인출 내역 조회 [5]
export async function transactionWithdrawListAPI(): Promise<any> {
  const memberId = await getData('id');
  return axiosWithAuth
    .get(BASE_URL + `/withdraw/list/${memberId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 제작 내역 반환 [6]
export async function transactionCreationListAPI(): Promise<any> {
  const memberId = await getData('id');
  return axiosWithAuth
    .get(BASE_URL + `/creation/list/${memberId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 구매 요청 (판매도 같이 되어야 함)
interface PurchaseRequestType {
  fontId: number;
  sellerId: number;
}
export async function transactionPurchaseAPI(
  PurchaseRequestList: PurchaseRequestType[],
): Promise<any> {
  return axiosWithAuth
    .post(BASE_URL + '/purchase', PurchaseRequestList)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 구매 내역 반환 [2]
export async function transactionPurchaseListAPI(): Promise<any> {
  const memberId = await getData('id');
  return axiosWithAuth
    .get(BASE_URL + `/purchase/list/${memberId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 판매 내역 반환 [3]
export async function transactionSellList(): Promise<any> {
  const memberId = await getData('id');
  return axiosWithAuth
    .get(BASE_URL + `/sell/list/${memberId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 전체 거래 내역 변환 [1]
export async function transactionListAllAPI(): Promise<any> {
  const memberId = await getData('id');
  return axiosWithAuth
    .get(BASE_URL + `/list/${memberId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 제작, 구매한 폰트 조회
export async function transactionMyAllAPI(): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + '/my')
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}

// 제작 폰트 조회
export async function transactionProducerAPI(producerId: string): Promise<any> {
  return axiosWithAuth
    .get(BASE_URL + `/font/${producerId}`)
    .then((r) => {
      return r.data;
    })
    .catch((e) => {
      throw e;
    });
}
