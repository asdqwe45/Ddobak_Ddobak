package com.ddobak.cart.dto.request;

import com.ddobak.font.entity.Font;

import java.util.List;

public record FontDeleteRequest(
        List<Font> fontList
) {
}
