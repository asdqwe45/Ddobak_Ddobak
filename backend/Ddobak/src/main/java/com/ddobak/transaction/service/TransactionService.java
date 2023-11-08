package com.ddobak.transaction.service;

import com.ddobak.font.entity.Font;
import com.ddobak.font.service.FontService;
import com.ddobak.global.exception.ErrorCode;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.member.service.MemberService;
import com.ddobak.security.util.LoginInfo;
import com.ddobak.transaction.dto.request.ChargeRequest;
import com.ddobak.transaction.dto.request.PurchaseRequest;
import com.ddobak.transaction.dto.request.WithdrawRequest;
import com.ddobak.transaction.dto.response.ChargeResponse;
import com.ddobak.transaction.dto.response.PurchaseResponse;
import com.ddobak.transaction.dto.response.TransactionResponse;
import com.ddobak.transaction.dto.response.WithdrawResponse;
import com.ddobak.transaction.entity.Charge;
import com.ddobak.transaction.entity.Creation;
import com.ddobak.transaction.entity.PurchaseOrder;
import com.ddobak.transaction.entity.Transaction;
import com.ddobak.transaction.entity.Withdrawal;
import com.ddobak.transaction.exception.TransactionException;
import com.ddobak.transaction.repository.ChargeRepository;
import com.ddobak.transaction.repository.CreationRepository;
import com.ddobak.transaction.repository.PurchaseOrderRepository;
import com.ddobak.transaction.repository.TransactionRepository;
import com.ddobak.transaction.repository.WithdrawalRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class TransactionService {

    private final MemberRepository memberRepository;
    private final TransactionRepository transactionRepository;
    private final ChargeRepository chargeRepository;
    private final WithdrawalRepository withdrawalRepository;
    private final PurchaseOrderRepository purchaseOrderRepository;
    private final CreationRepository creationRepository;

    private final MemberService memberService;
    private final FontService fontService;

    // 포인트 충전
    @Transactional
    public ChargeResponse chargePoint(LoginInfo loginInfo, ChargeRequest chargeRequest) {
        // 회원 현재 포인트 가져오기
        Member member = memberService.findByEmail(loginInfo.email());

        // 포인트 계산
        int afterChargeAmount = member.chargePoint(chargeRequest.amount()); // 회원 포인트 업데이트
        LocalDateTime now = LocalDateTime.now();
        Charge charge = Charge.builder()
            .transactionAmount(chargeRequest.amount())
            .transactionAfterAmount(afterChargeAmount)
            .transactionDate(now)
            .charger(member)
            .build();

        chargeRepository.save(charge);

        return new ChargeResponse(chargeRequest.amount(), afterChargeAmount);
    }

    // 포인트 충전 내역 반환
    @Transactional(readOnly = true)
    public List<TransactionResponse> getChargeList(Long memberId) {
        // 충전 내역 가져오기
        List<Charge> chargeList = chargeRepository.findChargesByCharger(memberId);
        List<TransactionResponse> transactionResponseList = new ArrayList<>();
        for(int i=0;i<chargeList.size();i++) {
            TransactionResponse transactionResponse =
                new TransactionResponse(
                    chargeList.get(i).getTransactionDate(),
                "포인트 충전",
                    null,
                    null,
                    chargeList.get(i).getTransactionAmount(),
                    chargeList.get(i).getTransactionAfterAmount(),
                    false,
                    0);
            transactionResponseList.add(transactionResponse);
        }

        transactionResponseList.sort(Comparator.comparing(TransactionResponse::transactionDate).reversed());
        return transactionResponseList;
    }

    // 포인트 인출
    @Transactional
    public WithdrawResponse withdrawPoint(LoginInfo loginInfo, WithdrawRequest withdrawRequest) {
        // 회원 현재 포인트 가져외기
        Member member = memberService.findByEmail(loginInfo.email());

        // 포인트 계산
        checkEnoughPoint(member.getId(), withdrawRequest.amount());

        int afterWithdrawMAmount = member.withdrawPoint(withdrawRequest.amount());
        LocalDateTime now = LocalDateTime.now();
        Withdrawal withdrawal = Withdrawal.builder()
            .transactionAmount(withdrawRequest.amount())
            .transactionAfterAmount(afterWithdrawMAmount)
            .transactionDate(now)
            .withdrawer(member)
            .build();

        withdrawalRepository.save(withdrawal);

        return new WithdrawResponse(withdrawRequest.amount(), afterWithdrawMAmount);
    }

    // 포인트 인출 내역 반환
    @Transactional(readOnly = true)
    public List<TransactionResponse> getWithdrawList(Long memberId) {
        // 충전 내역 가져오기
        List<Withdrawal> withdrawalList = withdrawalRepository.findWithdrawalByWithdrawer(memberId);
        List<TransactionResponse> transactionResponseList = new ArrayList<>();
        for(int i=0;i<withdrawalList.size();i++) {
            TransactionResponse transactionResponse =
                new TransactionResponse(
                    withdrawalList.get(i).getTransactionDate(),
                    "포인트 인출",
                    null,
                    null,
                    withdrawalList.get(i).getTransactionAmount(),
                    withdrawalList.get(i).getTransactionAfterAmount(),
                    false,
                    0);
            transactionResponseList.add(transactionResponse);
        }

        transactionResponseList.sort(Comparator.comparing(TransactionResponse::transactionDate).reversed());
        return transactionResponseList;
    }

    // 폰트 구매 및 판매
    @Transactional
    public PurchaseResponse purchaseFont(LoginInfo loginInfo, List<PurchaseRequest> purchaseRequestList, int totalAmount) {
        Member buyer = memberService.findByEmail(loginInfo.email());
        LocalDateTime now = LocalDateTime.now();
        PurchaseResponse purchaseResponse;
        int purchaseAfterAmount = 0;
        int sellAfterAmount = 0;

        int forMultiplePurchaseAmount = 0;
        int forMultiplePurchaseAfterAmount = 0;
        if(purchaseRequestList.size()==1) { // 1개 일때
            // 해당 폰트 정보 가져오기
            Font purchaseFont = fontService.findByFontId(purchaseRequestList.get(0).fontId());
            Member seller = memberService.findSellerById(purchaseRequestList.get(0).sellerId());

            // 폰트 가격만큼 계산
            purchaseAfterAmount = buyer.withdrawPoint(purchaseFont.getPrice());

            // 판매자 포인트 증가
            sellAfterAmount = seller.chargePoint(purchaseFont.getPrice());

            // Response 생성
            purchaseResponse = new PurchaseResponse(purchaseFont.getPrice(), purchaseAfterAmount,false);

            PurchaseOrder purchaseOrder = PurchaseOrder.builder()
                                                       .buyer(buyer)
                                                       .mainFont(purchaseFont.getKor_font_name())
                                                       .fontId(purchaseFont.getId())
                                                       .orderCount(1)
                                                       .totalAmount(purchaseFont.getPrice())
                                                       .orderDate(now)
                                                       .totalAfterAmount(purchaseAfterAmount)
                                                       .build();
            purchaseOrderRepository.save(purchaseOrder);

            // 구매 및 판매 내역 저장
            Transaction transaction = Transaction.builder()
                                                     .transactionAmount(purchaseFont.getPrice())
                                                 .transactionAfterAmount(purchaseAfterAmount)
                                                     .transactionDate(now)
                                                     .seller(seller)
                                                     .buyer(buyer)
                                                     .transactionFont(purchaseFont)
                                                 .purchaseOrder(purchaseOrder)
                                                 .sellerAfterAmount(sellAfterAmount)
                                                     .build();

            transactionRepository.save(transaction);
        }
        else { // 여러개 일때
            Font firstFont = fontService.findByFontId(purchaseRequestList.get(0).fontId());
            PurchaseOrder purchaseOrder = PurchaseOrder.builder()
                                                       .buyer(buyer)
                .orderDate(now)
                                                       .mainFont(firstFont.getKor_font_name())
                                                       .fontId(firstFont.getId())
                                                       .orderCount(purchaseRequestList.size())
                                                       .totalAmount(totalAmount)
                                                       .build();
            purchaseOrderRepository.save(purchaseOrder);
            int forMultiplePurchaseBefore = buyer.getPoint();
            for(int i=0;i<purchaseRequestList.size();i++) {
                Font purchaseFont = fontService.findByFontId(purchaseRequestList.get(i).fontId());
                Member seller = memberService.findSellerById(purchaseRequestList.get(i).sellerId());
                forMultiplePurchaseAmount += purchaseFont.getPrice();
                forMultiplePurchaseBefore -= purchaseFont.getPrice();
                sellAfterAmount = seller.chargePoint(purchaseFont.getPrice());
                Transaction transaction = Transaction.builder()
                                                         .transactionDate(now)
                                                             .seller(seller)
                                                         .buyer(buyer)
                                                         .transactionFont(purchaseFont)
                                                         .purchaseOrder(purchaseOrder)
                                                         .transactionAmount(purchaseFont.getPrice())
                                                         .transactionAfterAmount(forMultiplePurchaseBefore)
                    .sellerAfterAmount(sellAfterAmount)
                                                         .build();
                transactionRepository.save(transaction);
            }
            forMultiplePurchaseAfterAmount += buyer.withdrawPoint(forMultiplePurchaseAmount);
            purchaseOrder.calcAfterAmount(forMultiplePurchaseAfterAmount);

            purchaseResponse = new PurchaseResponse(forMultiplePurchaseAmount, forMultiplePurchaseAfterAmount, true);
        }

        return purchaseResponse;
    }

    // 폰트 구매 내역 조회
    @Transactional(readOnly = true)
    public List<TransactionResponse> getPurchaseList(Long memberId) {
        // 구매 내역 가져오기
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findOrdersByBuyer(memberId);

        // response 에 맞게 변환
        List<TransactionResponse> transactionResponseList = new ArrayList<>();
        for(int i=0;i< purchaseOrderList.size();i++) {
            Font nowFont = fontService.findByFontId(purchaseOrderList.get(i).getFontId());
            TransactionResponse transactionResponse;
            if(purchaseOrderList.get(i).getOrderCount() > 1) {
                transactionResponse = new TransactionResponse(
                    purchaseOrderList.get(i).getOrderDate(),
                    "폰트 구매",
                    purchaseOrderList.get(i).getMainFont(),
                    nowFont.getProducer().getNickname(),
                    purchaseOrderList.get(i).getTotalAmount(),
                    purchaseOrderList.get(i).getTotalAfterAmount(),
                    true,
                    purchaseOrderList.get(i).getOrderCount()
                    );
            }
            else {
                transactionResponse = new TransactionResponse(
                    purchaseOrderList.get(i).getOrderDate(),
                    "폰트 구매",
                    purchaseOrderList.get(i).getMainFont(),
                    nowFont.getProducer().getNickname(),
                    purchaseOrderList.get(i).getTotalAmount(),
                    purchaseOrderList.get(i).getTotalAfterAmount(),
                        false,
                    0
                    );
            }
            transactionResponseList.add(transactionResponse);
        }

        transactionResponseList.sort(Comparator.comparing(TransactionResponse::transactionDate).reversed());
        return transactionResponseList;
    }

    // 폰트 판매 내역 조회
    @Transactional(readOnly = true)
    public List<TransactionResponse> getSellList(Long memberId) {
        List<TransactionResponse> transactionResponseList = new ArrayList<>();
        List<Transaction> transactionList = transactionRepository.findTransactionBySeller(memberId);

        for(int i=0;i<transactionList.size();i++) {
            TransactionResponse transactionResponse = new TransactionResponse(
                transactionList.get(i).getTransactionDate(),
                "폰트 판매",
                transactionList.get(i).getTransactionFont().getKor_font_name(),
                transactionList.get(i).getSeller().getNickname(),
                transactionList.get(i).getTransactionFont().getPrice(),
                transactionList.get(i).getSellerAfterAmount(),
                false,
                0
            );
            transactionResponseList.add(transactionResponse);
        }

        return transactionResponseList;
    }


    // 제작 요청
    @Transactional
    public void requestFontTransaction(Font createdFont, Long memberId, int fontPrice) {
        log.info("{} create font:{}", memberId, createdFont.getKor_font_name());
        Member creator = memberService.findSellerById(memberId);

        LocalDateTime now = LocalDateTime.now();

        if(!creator.isProductionStatus()) {
            // 처음 제작
            creator.changeProductionStatus();
            Creation creation = Creation.builder()
                .createdFont(createdFont)
                .creator(creator)
                .transactionAmount(0)
                .transactionAfterAmount(creator.getPoint())
                .transactionDate(now)
                .build();

            creationRepository.save(creation);
        }
        else {
            // 2번 이상 제작 -> 거래 내역 필요
            // 5만원
            int createAfterAmount = creator.withdrawPoint(50000);
            Creation creation = Creation.builder()
                                        .createdFont(createdFont)
                                        .creator(creator)
                                        .transactionAmount(50000)
                                        .transactionAfterAmount(createAfterAmount)
                                        .transactionDate(now)
                                        .build();

            creationRepository.save(creation);
        }
    }

    // 폰트 제작 내역 조회
    @Transactional(readOnly = true)
    public List<TransactionResponse> getCreationList(Long memberId) {
        List<Creation> creationList = creationRepository.findCreationsByCreator(memberId);

        List<TransactionResponse> transactionResponseList = new ArrayList<>();
        for(int i=0;i<creationList.size();i++) {
            TransactionResponse transactionResponse = new TransactionResponse(
                creationList.get(i).getTransactionDate(),
                "제작",
                creationList.get(i).getCreatedFont().getKor_font_name(),
                creationList.get(i).getCreatedFont().getProducer().getNickname(),
                creationList.get(i).getTransactionAmount(),
                creationList.get(i).getTransactionAfterAmount(),
                false,
                0
            );
            transactionResponseList.add(transactionResponse);
        }

        return transactionResponseList;
    }

    // 거래 내역 전체 조회
    @Transactional(readOnly = true)
    public List<TransactionResponse> getAllTransactionList(Long memberId) {
        List<TransactionResponse> transactionResponseList = new ArrayList<>();

        // 충전
        List<Charge> chargeList = chargeRepository.findChargesByCharger(memberId);
        for(int i=0;i<chargeList.size();i++) {
            TransactionResponse transactionResponse =
                new TransactionResponse(
                    chargeList.get(i).getTransactionDate(),
                    "포인트 충전",
                    null,
                    null,
                    chargeList.get(i).getTransactionAmount(),
                    chargeList.get(i).getTransactionAfterAmount(),
                    false,
                    0);
            transactionResponseList.add(transactionResponse);
        }

        // 인출
        List<Withdrawal> withdrawalList = withdrawalRepository.findWithdrawalByWithdrawer(memberId);
        for(int i=0;i<withdrawalList.size();i++) {
            TransactionResponse transactionResponse =
                new TransactionResponse(
                    withdrawalList.get(i).getTransactionDate(),
                    "포인트 인출",
                    null,
                    null,
                    withdrawalList.get(i).getTransactionAmount(),
                    withdrawalList.get(i).getTransactionAfterAmount(),
                    false,
                    0);
            transactionResponseList.add(transactionResponse);
        }

        // 제작
        List<Creation> creationList = creationRepository.findCreationsByCreator(memberId);
        for(int i=0;i<creationList.size();i++) {
            TransactionResponse transactionResponse = new TransactionResponse(
                creationList.get(i).getTransactionDate(),
                "제작",
                creationList.get(i).getCreatedFont().getKor_font_name(),
                creationList.get(i).getCreatedFont().getProducer().getNickname(),
                creationList.get(i).getTransactionAmount(),
                creationList.get(i).getTransactionAfterAmount(),
                false,
                0
            );
            transactionResponseList.add(transactionResponse);
        }


        // 구매 판매
        // 구매(Order), 판매(Transaction)
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findOrdersByBuyer(memberId);
        for(int i=0;i< purchaseOrderList.size();i++) {
            Font purchasedFont = fontService.findByFontId(purchaseOrderList.get(i).getFontId());
            boolean checkMultiple;
            if(purchaseOrderList.get(i).getOrderCount() >= 2) {
                checkMultiple = true;
            }
            else {
                checkMultiple = false;
            }
            TransactionResponse transactionResponse = new TransactionResponse(
                purchaseOrderList.get(i).getOrderDate(),
                "폰트 구매",
                purchasedFont.getKor_font_name(),
                purchasedFont.getProducer().getNickname(),
                purchaseOrderList.get(i).getTotalAmount(),
                purchaseOrderList.get(i).getTotalAfterAmount(),
                checkMultiple,
                purchaseOrderList.get(i).getOrderCount()
            );
            transactionResponseList.add(transactionResponse);
        }


        List<Transaction> transactionList = transactionRepository.findTransactionBySeller(memberId);
        for(int i=0;i<transactionList.size();i++) {
            TransactionResponse transactionResponse = new TransactionResponse(
                transactionList.get(i).getTransactionDate(),
                "폰트 판매",
                transactionList.get(i).getTransactionFont().getKor_font_name(),
                transactionList.get(i).getSeller().getNickname(),
                transactionList.get(i).getTransactionAmount(),
                transactionList.get(i).getTransactionAfterAmount(),
                false,
                0
            );
            transactionResponseList.add(transactionResponse);
        }


        // 날짜 순으로 정렬
        transactionResponseList.sort(Comparator.comparing(TransactionResponse::transactionDate).reversed());

        return transactionResponseList;

    }


    private void checkEnoughPoint(Long memberId, int amount) {
        Member member = memberService.findMemberById(memberId);

        if(member.getPoint() < amount) {
            throw new TransactionException(ErrorCode.POINT_NOT_ENOUGH);
        }
    }
}
