package com.ddobak.font.entity;

import com.ddobak.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Keyword extends BaseEntity {

    @Column(nullable = false)
    private String keyword;

    @ManyToMany(mappedBy = "keywords")
    private List<Font> fonts;
    public Keyword(String keyword, Font font){
        this.keyword=keyword;
    }
}

