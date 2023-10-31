package com.fontservice.repository;

import com.fontservice.domain.Font;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FontRepository extends JpaRepository<Font,Long> {

}
