package com.ddobak.transaction.controller;

import com.ddobak.security.util.LoginInfo;
import com.ddobak.transaction.dto.request.ChargeRequest;
import com.ddobak.transaction.dto.request.PurchaseRequest;
import com.ddobak.transaction.dto.request.WithdrawRequest;
import com.ddobak.transaction.dto.response.ChargeResponse;
import com.ddobak.transaction.dto.response.FontDetailResponse;
import com.ddobak.transaction.dto.response.FontResponse;
import com.ddobak.transaction.dto.response.MyFontResponse;
import com.ddobak.transaction.dto.response.ProducerResponse;
import com.ddobak.transaction.dto.response.PurchaseResponse;
import com.ddobak.transaction.dto.response.TransactionResponse;
import com.ddobak.transaction.dto.response.WithdrawResponse;
import com.ddobak.transaction.service.TransactionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/v1/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    // 포인트 충전 요청
    @PostMapping("/charge")
    public ResponseEntity<ChargeResponse> requestCharge(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody
        ChargeRequest chargeRequest) {
        log.info("{} charge {}", loginInfo.email(), chargeRequest.amount());

        ChargeResponse chargeResponse = transactionService.chargePoint(loginInfo,chargeRequest);
        return ResponseEntity.ok().body(chargeResponse);
    }

    // 포인트 충전 내역 조회
    @GetMapping("/charge/list/{memberId}")
    public ResponseEntity<List<TransactionResponse>> requestChargeList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.info("{} wants to show chargeList",loginInfo.email());

        List<TransactionResponse> transactionResponseList = transactionService.getChargeList(memberId);
        return ResponseEntity.ok().body(transactionResponseList);
    }

    // 포인트 인출 요청
    @PostMapping("/withdraw")
    public ResponseEntity<WithdrawResponse> requestWithdraw(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody
        WithdrawRequest withdrawRequest) {
        log.info("{} withdraw {}",loginInfo.email(), withdrawRequest.amount());

        WithdrawResponse withdrawResponse = transactionService.withdrawPoint(loginInfo, withdrawRequest);
        return ResponseEntity.ok().body(withdrawResponse);
    }

    // 포인트 인출 내역 조회
    @GetMapping("/withdraw/list/{memberId}")
    public ResponseEntity<List<TransactionResponse>> requestWithdrawList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.info("{} wants to show withdrawList",loginInfo.email());

        List<TransactionResponse> transactionResponseList = transactionService.getWithdrawList(memberId);
        return ResponseEntity.ok().body(transactionResponseList);
    }

    // 제작 내역 반환
    @GetMapping("/creation/list/{memberId}")
    public ResponseEntity<List<TransactionResponse>> requestCreationList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.info("{} wants to show creationList", loginInfo.email());

        List<TransactionResponse> transactionResponseList = transactionService.getCreationList(memberId);
        return ResponseEntity.ok().body(transactionResponseList);
    }

    // 구매 요청(판매도 같이 되어야 함)
    @PostMapping("/purchase")
    public ResponseEntity<PurchaseResponse> requestPurchaseFont(@AuthenticationPrincipal LoginInfo loginInfo, @RequestBody
        List<PurchaseRequest> purchaseRequestList) {
        int totalAmount = purchaseRequestList.size();
        for(int i=0;i< purchaseRequestList.size();i++){
            log.info("{} purchase font {}", loginInfo.email(), purchaseRequestList.get(i).fontId());
        }
        PurchaseResponse purchaseResponse = transactionService.purchaseFont(loginInfo, purchaseRequestList, totalAmount);
        return ResponseEntity.ok().body(purchaseResponse);
    }

    // 구매 내역 반환
    @GetMapping("/purchase/list/{memberId}")
    public ResponseEntity<List<TransactionResponse>> requestPurchaseList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.info("{} wants to show purchaseList",loginInfo.email());

        List<TransactionResponse> transactionResponseList = transactionService.getPurchaseList(memberId);
        return ResponseEntity.ok().body(transactionResponseList);
    }

    // 판매 내역 반환
    @GetMapping("/sell/list/{memberId}")
    public ResponseEntity<List<TransactionResponse>> requestSellList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.info("{} wants to show sellList",loginInfo.email());

        List<TransactionResponse> transactionResponseList = transactionService.getSellList(memberId);
        return ResponseEntity.ok().body(transactionResponseList);
    }

    // 전체 거래 내역 반환
    @GetMapping("/list/{memberId}")
    public ResponseEntity<List<TransactionResponse>> requestAllList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long memberId) {
        log.info("{} wants to show all transactionList", loginInfo.email());

        List<TransactionResponse> transactionResponseList = transactionService.getAllTransactionList(memberId);
        return ResponseEntity.ok().body(transactionResponseList);
    }

    // 제작, 구매한 폰트 조회
    @GetMapping("/my")
    public ResponseEntity<List<MyFontResponse>> requestMyFontList(@AuthenticationPrincipal LoginInfo loginInfo) {
        log.info("{} -> font");

        List<MyFontResponse> myFontResponseList = transactionService.getMyFontList(loginInfo);
        return ResponseEntity.ok().body(myFontResponseList);
    }

    // 제작 폰트 조회
    @GetMapping("/font/{producerId}")
    public ResponseEntity<List<FontResponse>> requestFontList(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long producerId) {
        log.info("request {}' fontList",producerId);

        List<FontResponse> fontResponseList = transactionService.getFontList(loginInfo, producerId);
        return ResponseEntity.ok().body(fontResponseList);
    }

    // 제작자 정보 조회
    @GetMapping("/producer/{producerId}")
    public ResponseEntity<List<ProducerResponse>> requestProducerInfo(@AuthenticationPrincipal LoginInfo loginInfo, @PathVariable Long producerId) {
        log.info("{}' Info", producerId);
        List<ProducerResponse> producerResponseList = transactionService.getProducerInfo(loginInfo, producerId);
        return ResponseEntity.ok().body(producerResponseList);
    }

    // 구매 폰트 디테일 조회
    @GetMapping("/font/detail")
    public ResponseEntity<List<FontDetailResponse>> requestPurchaseList(@AuthenticationPrincipal LoginInfo loginInfo) {
        log.info("{}'s font detail info");

        List<FontDetailResponse> fontDetailResponseList = transactionService.getPurchaseList(loginInfo);
        return ResponseEntity.ok().body(fontDetailResponseList);
    }
}
