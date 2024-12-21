package com.datn.atino.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

public class ExpensiveDTO {

    private LocalDate dateSell;

    private String productName;

    private Long quantity;

    private Float percent;

    private BigDecimal totalPrice;

    public ExpensiveDTO() {
    }

    public ExpensiveDTO(LocalDate dateSell, String productName, Long quantity) {
        this.dateSell = dateSell;
        this.productName = productName;
        this.quantity = quantity;
    }

    public ExpensiveDTO(Date dateSell, BigDecimal totalPrice) {
        this.dateSell = dateSell.toLocalDate();
        this.totalPrice = totalPrice;
    }

    public ExpensiveDTO(String productName, BigDecimal totalPrice) {
        this.productName = productName;
        this.totalPrice = totalPrice;
    }

    @JsonFormat(pattern="dd-MM-yyyy")
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    public LocalDate getDateSell() {
        return dateSell;
    }

    public void setDateSell(LocalDate dateSell) {
        this.dateSell = dateSell;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Long getQuantity() {
        return quantity;
    }

    public void setQuantity(Long quantity) {
        this.quantity = quantity;
    }

    public Float getPercent() {
        return percent;
    }

    public void setPercent(Float percent) {
        this.percent = percent;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

}
