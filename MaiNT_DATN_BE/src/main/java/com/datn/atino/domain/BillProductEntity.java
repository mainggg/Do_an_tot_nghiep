package com.datn.atino.domain;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "bill_product", schema = "datn_atino", catalog = "")
public class BillProductEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "bill_id")
    private Integer billId;

    @Basic
    @Column(name = "product_id")
    private Integer productId;
    @Basic
    @Column(name = "quantity")
    private Integer quantity;
    @Basic
    @Column(name = "price")
    private BigDecimal price;
    @Basic
    @Column(name = "size")
    private String size;
    @Basic
    @Column(name = "color")
    private String color;
    @Basic
    @Column(name = "created_at")
    private LocalDate createdAt = LocalDate.now();
    @Basic
    @Column(name = "sales")
    private Integer sales;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BillProductEntity that = (BillProductEntity) o;
        return billId == that.billId && Objects.equals(productId, that.productId) && Objects.equals(quantity, that.quantity) && Objects.equals(price, that.price) && Objects.equals(size, that.size) && Objects.equals(color, that.color) && Objects.equals(createdAt, that.createdAt) && Objects.equals(sales, that.sales);
    }

    @Override
    public int hashCode() {
        return Objects.hash(billId, productId, quantity, price, size, color, createdAt, sales);
    }
}
