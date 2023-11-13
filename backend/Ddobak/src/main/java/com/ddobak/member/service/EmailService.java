package com.ddobak.member.service;

import com.ddobak.global.exception.ErrorCode;
import com.ddobak.member.exception.EmailException;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.naming.Context;
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

    private SimpleMailMessage createEmailForm(String toEmail, String title, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }

    public void sendHTMLEmail(String toEmail, String title, String htmlText) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

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
