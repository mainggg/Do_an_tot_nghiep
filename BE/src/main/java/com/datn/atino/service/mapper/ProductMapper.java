package com.datn.atino.service.mapper;

import com.datn.atino.domain.ProductEntity;
import com.datn.atino.service.dto.ProductDTO;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.util.Arrays;

@Component
public class ProductMapper {

    public ProductDTO toDTO(ProductEntity productEntity){
        ProductDTO product = new ProductDTO();
        product.setId(productEntity.getId());
        product.setProductName(productEntity.getProductName());
        product.setProductForm(productEntity.getProductForm());
        product.setDescription(productEntity.getDescription());
        product.setSales(productEntity.getSales());
        product.setAvatar(productEntity.getAvatar());
        product.setPrice(productEntity.getPrice());
        product.setQuantity(productEntity.getQuantity());
        product.setTotalQuantityImported(productEntity.getTotalQuantityImported());
        product.setTotalQuantitySales(productEntity.getTotalQuantitySales());
        product.setProductMaterial(productEntity.getProductMaterial());
        product.setCategory(productEntity.getCategoryEntity());
        if(StringUtils.hasText(productEntity.getProductColor())){
            product.setProductColor(
                    Arrays.asList(productEntity.getProductColor().split(", "))
            );
        }

        if(StringUtils.hasText(productEntity.getProductSize())){
            product.setProductSize(
                    Arrays.asList(productEntity.getProductSize().split(", "))
            );
        }

        return product;
    }

    public ProductEntity toEntity(ProductDTO product){
        ProductEntity productEntity = new ProductEntity();
        productEntity.setProductName(product.getProductName());
        productEntity.setProductForm(product.getProductForm());
        productEntity.setDescription(product.getDescription());
        productEntity.setAvatar(product.getAvatar());
        productEntity.setPrice(product.getPrice());
        productEntity.setSales(product.getSales());
        productEntity.setCategoryEntity(product.getCategory());
        String color = "";
        if(!CollectionUtils.isEmpty(product.getProductColor())){
            for (String c : product.getProductColor()){
                color = color + c + ", ";
            }
            productEntity.setProductColor(color);
        }

        String size = "";
        if(!CollectionUtils.isEmpty(product.getProductSize())){
            for (String s : product.getProductSize()){
                size = size + s + ", ";
            }
            productEntity.setProductSize(size);
        }
        productEntity.setCreatedBy(product.getCreatedBy());
        productEntity.setProductMaterial(product.getProductMaterial());
        return productEntity;
    }

    public void updateForm(ProductEntity productEntity, ProductDTO product){
        productEntity.setProductName(product.getProductName());
        productEntity.setProductForm(product.getProductForm());
        productEntity.setDescription(product.getDescription());
        productEntity.setAvatar(product.getAvatar());
        productEntity.setPrice(product.getPrice());
        productEntity.setSales(product.getSales());
        productEntity.setProductMaterial(product.getProductMaterial());
        productEntity.setCategoryEntity(product.getCategory());
        String color = "";
        if(!CollectionUtils.isEmpty(product.getProductColor())){
            for (String c : product.getProductColor()){
                color = color + c + ", ";
            }
            productEntity.setProductColor(color);
        }

        String size = "";
        if(!CollectionUtils.isEmpty(product.getProductSize())){
            for (String s : product.getProductSize()){
                size = size + s + ", ";
            }
            productEntity.setProductSize(size);
        }
    }


}
