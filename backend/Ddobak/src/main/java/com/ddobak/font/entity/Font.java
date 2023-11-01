package com.ddobak.font.entity;

import com.ddobak.global.entity.BaseEntity;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import com.fontservice.controller.FontController;
import com.fontservice.controller.FontController.FontWebRequest;
import lombok.Getter;
import lombok.Setter;
import net.bytebuddy.dynamic.loading.InjectionClassLoader;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
public class Font {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="font_id")
    private Long font_id;

    //    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="producer")
//    @OnDelete(OnDeleteAction.CASCADE)
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

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean openStatus;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean freeStatus;

    public Font(Long producer_id, String font_sort_url, String font_file_url, String ko_font_name, String en_font_name, Boolean openStatus, Boolean freeStatus, Integer price, Boolean commerceStatus, String introduceText, LocalDate create_date) {
        this.producer_id = producer_id;
        this.font_sort_url = font_sort_url;
        this.font_file_url = font_file_url;
        this.ko_font_name = ko_font_name;
        this.en_font_name = en_font_name;
        this.openStatus = openStatus;
        this.freeStatus = freeStatus;
        this.price = price;
        this.commerceStatus = commerceStatus;
        this.introduceText = introduceText;
        this.create_date = create_date;
    }

    @Column(columnDefinition = "int default 0")
    private Integer price;

    @Column(columnDefinition = "BOOLEAN default false")
    private Boolean commerceStatus;

    @Column(columnDefinition = "varchar(255) default 'IntroduceDefault'")
    private String introduceText;

    @Column
    private LocalDate create_date;


    public Font() {
    }

    public Font setFont_file_url(String font_file_url) {
        this.font_file_url = font_file_url;
        return this;
    }
    public Font setKo_font_name(String ko_font_name) {
        this.ko_font_name = ko_font_name;
        return this;
    }

    public Font setEn_font_name(String en_font_name) {
        this.en_font_name = en_font_name;
        return this;
    }

    public Font setCreate_date(LocalDate create_date) {
        this.create_date = create_date;
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
