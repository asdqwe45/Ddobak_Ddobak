package com.ddobak.font.service;

import com.ddobak.global.exception.ErrorCode;
import com.ddobak.member.entity.Member;
import com.ddobak.member.exception.EmailException;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Slf4j
@RequiredArgsConstructor
@Service
public class FontEmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    private String makeEmailTemplate() {
        Context context = new Context();
        return templateEngine.process("fontCreatedEmailTemplate", context);

    }

    public void sendCompleteEmail(Member member ) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        String htmlText = makeEmailTemplate();

        try {
            helper.setTo(member.getEmail());
            helper.setSubject("또박 또박 폰트 완료 메일입니다.");
            helper.setText(htmlText, true); // true는 HTML 형식으로 설정

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("Failed to send HTML email", e);
            throw new EmailException(ErrorCode.EMAIL_SEND_ERROR);
        }
    }
}
