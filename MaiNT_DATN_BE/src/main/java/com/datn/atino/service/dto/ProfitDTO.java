package com.datn.atino.service.dto;

import java.math.BigDecimal;
import java.util.Objects;

public class ProfitDTO {

    private Integer month;

    private Integer year;

    private BigDecimal totalPrice;

    public ProfitDTO() {
    }

    public ProfitDTO(Integer month, Integer year) {
        this.month = month;
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProfitDTO profitDTO)) return false;
        return Objects.equals(getMonth(), profitDTO.getMonth()) && Objects.equals(getYear(), profitDTO.getYear());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMonth(), getYear());
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
}
