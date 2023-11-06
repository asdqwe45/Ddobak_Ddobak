package com.ddobak.transaction.entity;

import com.ddobak.global.entity.BaseEntity;
import javax.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Transaction extends BaseEntity {


}
