package com.ddobak.member.service;

import com.ddobak.global.exception.ErrorCode;
import com.ddobak.member.exception.EmailException;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.thymeleaf.context.Context;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.TemplateEngine;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;


    public String makeEmailTemplate(String authCode) {
        Context context = new Context();
        context.setVariable("authCode", authCode);

        return templateEngine.process("emailTemplate", context);
    }

    public void sendHTMLEmail(String toEmail, String title, String authCode) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");
        String htmlText = makeEmailTemplate(authCode);

        try {
            helper.setTo(toEmail);
            helper.setSubject(title);
            helper.setText(htmlText, true); // true는 HTML 형식으로 설정

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("Failed to send HTML email", e);
            throw new EmailException(ErrorCode.EMAIL_SEND_ERROR);
        }
    }
}
