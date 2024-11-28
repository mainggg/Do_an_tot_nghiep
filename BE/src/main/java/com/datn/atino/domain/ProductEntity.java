package com.datn.atino.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "product")
public class ProductEntity extends AbstractAuditingEntity<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonIgnore
    @ManyToOne()
    @JoinColumn(name = "category_id")
    private CategoryEntity categoryEntity;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "description")
    private String description;

    @Column(name = "material")
    private String productMaterial;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "size")
    private String productSize;

    @Column(name = "product_color")
    private String productColor;

    @Column(name = "product_form")
    private String productForm;

    @Column(name = "sales")
    private Integer sales;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "total_quantity_sales")
    private Integer totalQuantitySales;

    @Column(name = "total_quantity_imported")
    private Integer totalQuantityImported;


    @Column(name = "is_visible")
    private Integer isVisible;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @JsonIgnore
    @OneToMany(mappedBy = "productEntity")
    private List<ProductImportEntity> productImportEntities;

    @Override
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getProductColor() {
        return productColor;
    }

    public void setProductColor(String productColor) {
        this.productColor = productColor;
    }

    public String getProductForm() {
        return productForm;
    }

    public void setProductForm(String productForm) {
        this.productForm = productForm;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getTotalQuantitySales() {
        return totalQuantitySales;
    }

    public void setTotalQuantitySales(Integer totalQuantitySales) {
        this.totalQuantitySales = totalQuantitySales;
    }

    public Integer getTotalQuantityImported() {
        return totalQuantityImported;
    }

    public void setTotalQuantityImported(Integer totalQuantityImported) {
        this.totalQuantityImported = totalQuantityImported;
    }

    public Integer getIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Integer isVisible) {
        this.isVisible = isVisible;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }

    public List<ProductImportEntity> getProductImportEntities() {
        return productImportEntities;
    }

    public void setProductImportEntities(List<ProductImportEntity> productImportEntities) {
        this.productImportEntities = productImportEntities;
    }

    public String getProductSize() {
        return productSize;
    }

    public void setProductSize(String productSize) {
        this.productSize = productSize;
    }

    public CategoryEntity getCategoryEntity() {
        return categoryEntity;
    }

    public void setCategoryEntity(CategoryEntity categoryEntity) {
        this.categoryEntity = categoryEntity;
    }

    public String getProductMaterial() {
        return productMaterial;
    }

    public void setProductMaterial(String productMaterial) {
        this.productMaterial = productMaterial;
    }
}
