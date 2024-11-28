package com.datn.atino.service.dto;

import com.datn.atino.domain.CategoryEntity;

import java.math.BigDecimal;
import java.util.List;

public class ProductDTO {

    private Integer id;

    private String productName;

    private CategoryEntity category;

    private String avatar;

    private String description;

    private String productMaterial;

    private BigDecimal price;

    private List<String> productColor;

    private List<String> productSize;

    private String productForm;

    private Integer sales;

    private Integer quantity;

    private Integer totalQuantitySales;

    private Integer totalQuantityImported;

    private Integer isVisible;

    private List<FileNameDictionaryDTO> imageDescription;

    private String createdBy;

    public ProductDTO() {
    }

    public ProductDTO(Integer id, String productName) {
        this.id = id;
        this.productName = productName;
    }

    public Integer getId() {
        return id;
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
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

    public List<String> getProductColor() {
        return productColor;
    }

    public void setProductColor(List<String> productColor) {
        this.productColor = productColor;
    }

    public String getProductForm() {
        return productForm;
    }

    public void setProductForm(String productForm) {
        this.productForm = productForm;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
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

    public List<FileNameDictionaryDTO> getImageDescription() {
        return imageDescription;
    }

    public void setImageDescription(List<FileNameDictionaryDTO> imageDescription) {
        this.imageDescription = imageDescription;
    }

    public List<String> getProductSize() {
        return productSize;
    }

    public void setProductSize(List<String> productSize) {
        this.productSize = productSize;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public CategoryEntity getCategory() {
        return category;
    }

    public void setCategory(CategoryEntity category) {
        this.category = category;
    }

    public String getProductMaterial() {
        return productMaterial;
    }

    public void setProductMaterial(String productMaterial) {
        this.productMaterial = productMaterial;
    }
}
