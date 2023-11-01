package com.fontservice.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
public class Keyword {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "keyword_id")
    private Long keyword_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="font_id")
    private Font Font;

    @Column(nullable = false)
    private String Keyword1;

    @Column(columnDefinition = "varchar(255) default 'default'")
    private String Keyword2;

    private String Keyword3;

}
