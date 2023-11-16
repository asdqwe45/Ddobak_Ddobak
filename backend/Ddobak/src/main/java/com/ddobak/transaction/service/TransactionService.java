package com.ddobak.transaction.service;

import com.ddobak.favorite.repository.FavoriteRepository;
import com.ddobak.follow.repository.FollowRepository;
import com.ddobak.font.entity.Font;
import com.ddobak.font.service.FontService;
import com.ddobak.member.entity.Member;
import com.ddobak.member.repository.MemberRepository;
import com.ddobak.member.service.MemberService;
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
import com.ddobak.transaction.entity.Charge;
import com.ddobak.transaction.entity.Creation;
import com.ddobak.transaction.entity.PurchaseOrder;
import com.ddobak.transaction.entity.Transaction;
import com.ddobak.transaction.entity.Withdrawal;
import com.ddobak.transaction.repository.ChargeRepository;
import com.ddobak.transaction.repository.CreationRepository;
import com.ddobak.transaction.repository.PurchaseOrderRepository;
import com.ddobak.transaction.repository.TransactionRepository;
import com.ddobak.transaction.repository.WithdrawalRepository;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

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
    private final FavoriteRepository favoriteRepository;
    private final FollowRepository followRepository;

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
        List<TransactionResponse> transactionResponseList = chargeList.stream()
            .map(charge -> new TransactionResponse(
                charge.getTransactionDate(),
                "포인트 충전",
                null,
                null,
                charge.getTransactionAmount(),
                charge.getTransactionAfterAmount(),
                false,
                0
            ))
            .sorted(Comparator.comparing(TransactionResponse::transactionDate).reversed())
            .collect(Collectors.toList());
        return transactionResponseList;
    }

    // 포인트 인출
    @Transactional
    public WithdrawResponse withdrawPoint(LoginInfo loginInfo, WithdrawRequest withdrawRequest) {
        // 회원 현재 포인트 가져외기
        Member member = memberService.findByEmail(loginInfo.email());

        // 포인트 계산
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
        List<TransactionResponse> transactionResponseList = withdrawalList.stream()
            .map(withdrawal -> new TransactionResponse(
                withdrawal.getTransactionDate(),
                "포인트 인출",
                null,
                null,
                withdrawal.getTransactionAmount(),
                withdrawal.getTransactionAfterAmount(),
                false,
                0
            ))
            .sorted(Comparator.comparing(TransactionResponse::transactionDate).reversed())
            .collect(Collectors.toList());
        return transactionResponseList;
    }

    // 폰트 구매 및 판매
    @Transactional
    public PurchaseResponse purchaseFont(LoginInfo loginInfo, List<PurchaseRequest> purchaseRequestList, int totalAmount) {
        Member buyer = memberService.findByEmail(loginInfo.email());
        LocalDateTime now = LocalDateTime.now();
        PurchaseResponse purchaseResponse;

        AtomicInteger forMultiplePurchaseAmount = new AtomicInteger();
        AtomicInteger forMultiplePurchaseAfterAmount = new AtomicInteger(buyer.getPoint());
        if(totalAmount==1) { // 1개 거래
            // 거래 폰트 정보 가져오기
            Font purchaseFont = fontService.findByFontId(purchaseRequestList.get(0)
                                                                            .fontId());
            Member seller = memberService.findSellerById(purchaseRequestList.get(0)
                                                                            .sellerId());

            // 가격 계산 - 구매자는 감소, 판매자는 증가
            int purchaseAfterAmount = buyer.withdrawPoint(purchaseFont.getPrice());
            int sellerAfterAmount = seller.chargePoint(purchaseFont.getPrice());

            // 거래 Response 생성
            purchaseResponse = new PurchaseResponse(purchaseFont.getPrice(), purchaseAfterAmount,
                false);

            // 거래 내역 저장
            PurchaseOrder purchaseOrder = PurchaseOrder.builder()
                                                       .buyer(buyer)
                                                       .mainFont(purchaseFont.getEngFontName())
                                                       .fontId(purchaseFont.getId())
                                                       .orderCount(1)
                                                       .totalAmount(purchaseFont.getPrice())
                                                       .orderDate(now)
                                                       .totalAfterAmount(purchaseAfterAmount)
                                                       .build();
            purchaseOrderRepository.save(purchaseOrder);
            Transaction transaction = Transaction.builder()
                .transactionAmount(purchaseFont.getPrice())
                .transactionAfterAmount(purchaseAfterAmount)
                .transactionDate(now)
                .seller(seller)
                .buyer(buyer)
                .transactionFont(purchaseFont)
                .purchaseOrder(purchaseOrder)
                .sellerAfterAmount(sellerAfterAmount)
                .build();
            transactionRepository.save(transaction);
        }
        else { // 2개 이상 거래
            Font firstFont = fontService.findByFontId(purchaseRequestList.get(0).fontId());
            PurchaseOrder purchaseOrder = PurchaseOrder.builder()
                .buyer(buyer)
                .orderDate(now)
                .mainFont(firstFont.getKorFontName())
                .fontId(firstFont.getId())
                .orderCount(purchaseRequestList.size())
                .totalAmount(0)
                .build();
            purchaseOrderRepository.save(purchaseOrder);
            purchaseRequestList.stream().forEach(
                purchaseRequest -> {
                    Font purchaseFont = fontService.findByFontId(purchaseRequest.fontId());
                    Member seller = memberService.findSellerById(purchaseRequest.sellerId());
                    AtomicInteger forMultiplePurchaseBefore = new AtomicInteger(buyer.getPoint());
                    forMultiplePurchaseAmount.addAndGet(purchaseFont.getPrice());
                    forMultiplePurchaseBefore.addAndGet((-1) * purchaseFont.getPrice());
                    AtomicInteger sellAfterAmount = new AtomicInteger( seller.chargePoint(purchaseFont.getPrice()));
                    Transaction transaction = Transaction.builder()
                        .transactionDate(now)
                        .seller(seller)
                        .buyer(buyer)
                        .transactionFont(purchaseFont)
                        .purchaseOrder(purchaseOrder)
                        .transactionAmount(purchaseFont.getPrice())
                        .transactionAfterAmount(forMultiplePurchaseBefore.get())
                        .sellerAfterAmount(sellAfterAmount.get())
                        .build();
                    transactionRepository.save(transaction);
                    forMultiplePurchaseAfterAmount.addAndGet((-1) *purchaseFont.getPrice());
                    buyer.withdrawPoint(purchaseFont.getPrice());
                    log.info("{}", forMultiplePurchaseAfterAmount.get());
                    purchaseOrder.calcAfterAmount(forMultiplePurchaseAfterAmount.get());
                    purchaseOrder.calcTotalPrice(purchaseFont.getPrice());
                }
            );
            purchaseResponse = new PurchaseResponse(forMultiplePurchaseAmount.get(), forMultiplePurchaseAfterAmount.get(),true);
        }

        return purchaseResponse;
    }

    // 폰트 구매 내역 조회
    @Transactional(readOnly = true)
    public List<TransactionResponse> getPurchaseList(Long memberId) {
        // 구매 내역 가져오기
        List<PurchaseOrder> purchaseOrderList = purchaseOrderRepository.findOrdersByBuyer(memberId);

        // response 에 맞게 변환
        List<TransactionResponse> transactionResponseList = purchaseOrderList.stream()
            .map(purchaseOrder -> {
                Font nowFont = fontService.findByFontId(purchaseOrder.getFontId());
                boolean isMultipleOrder = purchaseOrder.getOrderCount() > 1;
                return new TransactionResponse(
                    purchaseOrder.getOrderDate(),
                    "폰트 구매",
                    purchaseOrder.getMainFont(),
                    nowFont.getProducer().getNickname(),
                    purchaseOrder.getTotalAmount(),
                    purchaseOrder.getTotalAfterAmount(),
                    isMultipleOrder,
                    isMultipleOrder ? purchaseOrder.getOrderCount() : 0
                );
            })
            .sorted(Comparator.comparing(TransactionResponse::transactionDate).reversed())
            .collect(Collectors.toList());

        return transactionResponseList;
    }

    // 폰트 판매 내역 조회
    @Transactional(readOnly = true)
    public List<TransactionResponse> getSellList(Long memberId) {
        List<Transaction> transactionList = transactionRepository.findTransactionBySeller(memberId);
        List<TransactionResponse> transactionResponseList = transactionList.stream()
            .map(transaction -> new TransactionResponse(
                transaction.getTransactionDate(),
                "폰트 판매",
                transaction.getTransactionFont().getKorFontName(),
                transaction.getSeller().getNickname(),
                transaction.getTransactionFont().getPrice(),
                transaction.getSellerAfterAmount(),
                false,
                0
            ))
            .sorted(Comparator.comparing(TransactionResponse::transactionDate).reversed())
            .collect(Collectors.toList());

        return transactionResponseList;
    }

    // 제작 요청
    @Transactional
    public void requestFontTransaction(Font createdFont, Long memberId, int fontPrice) {
        log.info("{} create font:{}", memberId, createdFont.getKorFontName());
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
            // 2번 이상 제작 -> 거래 내역 필요, 회당 5만원
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

        List<TransactionResponse> transactionResponseList = creationList.stream()
            .map(creation -> new TransactionResponse(
                creation.getTransactionDate(),
                "제작",
                creation.getCreatedFont().getKorFontName(),
                creation.getCreatedFont().getProducer().getNickname(),
                creation.getTransactionAmount(),
                creation.getTransactionAfterAmount(),
                false,
                0
            ))
            .sorted(Comparator.comparing(TransactionResponse::transactionDate).reversed())
            .collect(Collectors.toList());
        return transactionResponseList;
    }

    // 거래 내역 전체 조회
    @Transactional(readOnly = true)
    public List<TransactionResponse> getAllTransactionList(Long memberId) {
        // 충전
        List<TransactionResponse> chargeList = chargeRepository.findChargesByCharger(memberId).stream()
            .map(charge -> new TransactionResponse(
                charge.getTransactionDate(),
                "포인트 충전", null, null,
                charge.getTransactionAmount(),
                charge.getTransactionAfterAmount(),
                false, 0
            )).collect(Collectors.toList());

        // 인출
        List<TransactionResponse> withdrawalList = withdrawalRepository.findWithdrawalByWithdrawer(memberId).stream()
            .map(withdrawal -> new TransactionResponse(
                withdrawal.getTransactionDate(),
                "포인트 인출", null, null,
                withdrawal.getTransactionAmount(),
                withdrawal.getTransactionAfterAmount(),
                false,0
            )).collect(Collectors.toList());

        // 제작
        List<TransactionResponse> creationList = creationRepository.findCreationsByCreator(memberId).stream()
            .map(creation -> new TransactionResponse(
                creation.getTransactionDate(),
                "제작",
                creation.getCreatedFont().getKorFontName(),
                creation.getCreatedFont().getProducer().getNickname(),
                creation.getTransactionAmount(),
                creation.getTransactionAfterAmount(),
                false,0
            )).collect(Collectors.toList());

        // 구매
        List<TransactionResponse> purchaseList = purchaseOrderRepository.findOrdersByBuyer(memberId).stream()
            .map(purchaseOrder -> {
                Font purchasedFont = fontService.findByFontId(purchaseOrder.getFontId());
                boolean checkMultiple = purchaseOrder.getOrderCount() > 1;
                return new TransactionResponse(
                    purchaseOrder.getOrderDate(),
                    "폰트 구매",
                    purchasedFont.getKorFontName(),
                    purchasedFont.getProducer().getNickname(),
                    purchaseOrder.getTotalAmount(),
                    purchaseOrder.getTotalAfterAmount(),
                    checkMultiple,
                    purchaseOrder.getOrderCount()
                );
            }).collect(Collectors.toList());

        // 판매래
        List<TransactionResponse> transactionList = transactionRepository.findTransactionBySeller(memberId).stream()
            .map(transaction -> new TransactionResponse(
                transaction.getTransactionDate(),
                "폰트 판매",
                transaction.getTransactionFont().getKorFontName(),
                transaction.getSeller().getNickname(),
                transaction.getTransactionAmount(),
                transaction.getSellerAfterAmount(),
                false,0
            )).collect(Collectors.toList());

        // 거래 내역 총합 및 날짜 순 정렬
        List<TransactionResponse> transactionResponseList = Stream.of(
            chargeList, withdrawalList, creationList, purchaseList, transactionList
        ).flatMap(List::stream)
            .sorted(Comparator.comparing(TransactionResponse::transactionDate).reversed())
            .collect(Collectors.toList());

        return transactionResponseList;

    }

    //본인 제작, 구매 폰트 조회
    @Transactional(readOnly = true)
    public List<MyFontResponse> getMyFontList(LoginInfo loginInfo) {
        Member member = memberService.findByEmail(loginInfo.email());
        // 제작 내역
        List<Creation> creationList = creationRepository.findCreationsByCreator(member.getId());
        List<MyFontResponse> creationFontList = creationList.stream().map(
            creation -> new MyFontResponse(creation.getCreatedFont().getId(), "제작")
        ).collect(Collectors.toList());

        // 구매 내역
        List<Transaction> purchaseList = transactionRepository.findTransactionBuyer(member.getId());
        List<MyFontResponse> purchaseFontList = purchaseList.stream().map(
                transaction -> new MyFontResponse(transaction.getTransactionFont().getId(), "구매")
            ).collect(Collectors.toList());

        List<MyFontResponse> fontResponseList = Stream.concat(creationFontList.stream(), purchaseFontList.stream()).collect(
            Collectors.toList());
        return fontResponseList;
    }

    // 해당 제작자 폰트 조회
    @Transactional(readOnly = true)
    public List<FontResponse> getFontList(LoginInfo loginInfo, Long producerId) {
        List<Creation> creationList = creationRepository.findCreationsByCreator(producerId);
        List<FontResponse> fontResponseList = creationList.stream()
            .map(creation -> new FontResponse(
                creation.getCreatedFont().getId(),
                creation.getCreatedFont().getKorFontName(),
                creation.getCreatedFont().getFont_file_url(),
                creation.getCreatedFont().getOpen_status()
            ))
            .collect(Collectors.toList());

        return fontResponseList;
    }

    // 제작자 정보 조회
    @Transactional(readOnly = true)
    public List<ProducerResponse> getProducerInfo(LoginInfo loginInfo, Long producerId) {
        List<Creation> creationList = creationRepository.findCreationsByCreator(producerId);

        List<ProducerResponse> producerResponseList = creationList.stream()
            .map(creation -> new ProducerResponse(
                creation.getCreatedFont().getId(),
                creation.getCreatedFont().getKorFontName(),
                favoriteRepository.existsByMemberIdAndFontId(loginInfo.id(), creation.getCreatedFont().getId()),
                followRepository.existsByFollowerIdAndFollowingId(loginInfo.id(), producerId)
            ))
            .collect(Collectors.toList());

        return producerResponseList;
    }

    // 구매한 폰트 디테일 정보 조회
    @Transactional(readOnly = true)
    public List<FontDetailResponse> getPurchaseList(LoginInfo loginInfo) {
        Member member = memberService.findByEmail(loginInfo.email());
        List<Transaction> purchaseList = transactionRepository.findTransactionBuyer(member.getId());

        List<FontDetailResponse> fontDetailResponseList = purchaseList.stream()
            .map(transaction -> new FontDetailResponse(
                 transaction.getTransactionFont().getId(),
                 transaction.getTransactionFont().getKorFontName(),
                 transaction.getTransactionFont().getFont_file_url(),
                 transaction.getTransactionFont().getProducer().getNickname(),
                 transaction.getTransactionFont().getOpen_status()
            ))
            .collect(Collectors.toList());

        return fontDetailResponseList;
    }
}
