package com.datn.atino.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "product_import")
public class ProductImportEntity extends AbstractAuditingEntity<Integer>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private ProductEntity productEntity;

    @Column(name = "color")
    private String color;

    @Column(name = "size")
    private String size;

    @Column(name = "price_import")
    private BigDecimal priceImport;

    @Column(name = "quantity_import")
    private Integer quantityImport;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Transient
    private ProductEntity product;

    public ProductImportEntity (){

    }

    public ProductImportEntity(Integer id, ProductEntity product, String size, String color, Integer quantityImport, BigDecimal priceImport, Instant updatedAt){
        this.id = id;
        this.product = product;
        this.size = size;
        this.color = color;
        this.quantityImport = quantityImport;
        this.priceImport = priceImport;
        this.setUpdatedAt(updatedAt);
    }

    @Override
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public ProductEntity getProductEntity() {
        return productEntity;
    }

    public void setProductEntity(ProductEntity productEntity) {
        this.productEntity = productEntity;
    }

    public Integer getQuantityImport() {
        return quantityImport;
    }

    public void setQuantityImport(Integer quantityImport) {
        this.quantityImport = quantityImport;
    }

    public ProductEntity getProduct() {
        return product;
    }

    public void setProduct(ProductEntity product) {
        this.product = product;
    }

    public BigDecimal getPriceImport() {
        return priceImport;
    }

    public void setPriceImport(BigDecimal priceImport) {
        this.priceImport = priceImport;
    }
}
