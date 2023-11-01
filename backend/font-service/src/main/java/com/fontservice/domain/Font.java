package com.fontservice.domain;

import com.fontservice.controller.FontController;
import com.fontservice.controller.FontController.FontWebRequest;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
public class Font {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="font_id")
    private Long font_id;

    @Column(nullable = false)
    private Long producer_id;

    @Column(nullable = false)
    private String font_sort_url;

    @Column(columnDefinition = "varchar(255) default 'urlDefault'")
    private String font_file_url;

    @Column(columnDefinition = "varchar(255) default 'koNameDefault'")
    private String ko_font_name;

    @Column(columnDefinition = "varchar(255) default 'enNameDefault'")
    private String en_font_name;

    @Column(columnDefinition = "boolean default false")
    private Boolean openStatus;

    @Column(columnDefinition = "boolean default false")
    private Boolean freeStatus;

    @Column(columnDefinition = "int default 0")
    private Integer price;

    @Column(columnDefinition = "boolean default false")
    private Boolean commerceStatus;

    @Column(columnDefinition = "varchar(255) default 'IntroduceDefault'")
    private String introduceText;

    @Column
    private LocalDateTime create_date;

    public Font(Long producer_id, String font_sort_url) {
        this.producer_id = producer_id;
        this.font_sort_url = font_sort_url;
    }

    public Font() {
    }

    public Font setFont_file_url(String font_file_url) {
        this.font_file_url = font_file_url;
        return this;
    }

    public Font setOpenStatus(Boolean openStatus) {
        this.openStatus = openStatus;
        return this;
    }

    public Font setFreeStatus(Boolean freeStatus) {
        this.freeStatus = freeStatus;
        return this;
    }

    public Font setPrice(Integer price) {
        this.price = price;
        return this;
    }

    public Font setCommerceStatus(Boolean commerceStatus) {
        this.commerceStatus = commerceStatus;
        return this;
    }

    public Font setIntroduceText(String introduceText) {
        this.introduceText = introduceText;
        return this;
    }

    public void createFont(FontWebRequest req, String font_file_url) {
        this.font_file_url = font_file_url;
        this.openStatus = req.openStatus();
        this.freeStatus = req.freeStatus();
        this.price = req.price();
        this.commerceStatus = req.commerceStatus();
        this.introduceText = req.introduceText();
    }
}
