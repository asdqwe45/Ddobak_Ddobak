package com.fontservice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
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

}
