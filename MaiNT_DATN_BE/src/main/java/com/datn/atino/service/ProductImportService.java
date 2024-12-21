package com.datn.atino.service;


import com.datn.atino.domain.ProductEntity;
import com.datn.atino.domain.ProductImportEntity;
import com.datn.atino.repository.ProductImportRepository;
import com.datn.atino.repository.ProductRepository;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductImportService {
    private final ProductImportRepository productImportRepository;
    private final ProductRepository productRepository;

    public ProductImportService(ProductImportRepository productImportRepository, ProductRepository productRepository) {
        this.productImportRepository = productImportRepository;
        this.productRepository = productRepository;
    }

    public PageResponse<List<ProductImportEntity>> getAll(PageFilterInput<ProductImportEntity> input){
        Pageable pageable = Constants.getPageable(input);
        Page<ProductImportEntity> productImportEntities = productImportRepository.getAll(input, pageable);
        return new PageResponse<List<ProductImportEntity>>().success().data(productImportEntities.getContent()).dataCount(productImportEntities.getTotalElements());
    }


    @Transactional
    public void saveProductImport(ProductImportEntity input){
        ProductEntity productEntity = productRepository.findByIdAndIsActiveTrue(input.getProductEntity().getId());
        if(productEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tồn tại sản phẩm");
        input.setProductEntity(productEntity);
        productImportRepository.save(input);
        if(productEntity.getTotalQuantityImported() == null){
            productEntity.setTotalQuantityImported(input.getQuantityImport());
        } else {
            productEntity.setTotalQuantityImported(productEntity.getTotalQuantityImported() + input.getQuantityImport());
        }

        if(productEntity.getTotalQuantitySales() == null){
            productEntity.setQuantity(productEntity.getTotalQuantityImported());
        } else {
            productEntity.setQuantity(productEntity.getTotalQuantityImported() - productEntity.getTotalQuantitySales());
        }

        productRepository.save(productEntity);
    }


    @Transactional
    public void updateProductImport(Integer id, ProductImportEntity input){
        ProductImportEntity productImportEntity = productImportRepository.findByIdAndIsActiveTrue(id);
        if(productImportEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy bản ghi");
        ProductEntity productEntity = productRepository.findByIdAndIsActiveTrue(input.getProductEntity().getId());
        if(productEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tồn tại sản phẩm");
        productEntity.setTotalQuantityImported(
                productEntity.getTotalQuantityImported() - productImportEntity.getQuantityImport() + input.getQuantityImport()
        );
        if(productEntity.getTotalQuantitySales() == null){
            productEntity.setQuantity(input.getQuantityImport());
        } else {
            productEntity.setQuantity(productEntity.getTotalQuantityImported() - productEntity.getTotalQuantitySales());
        }

        if(productEntity.getQuantity() < 0){
            throw new CustomException(HttpStatus.BAD_REQUEST, "Số lượng sản phẩm đang nhỏ hơn 0");
        }

        productRepository.save(productEntity);
        input.setProductEntity(productEntity);
        productImportRepository.save(input);
    }

    @Transactional
    public void deleteProductImport(Integer id){
        ProductImportEntity productImportEntity = productImportRepository.findByIdAndIsActiveTrue(id);
        if(productImportEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy bản ghi");
        ProductEntity productEntity = productRepository.findByIdAndIsActiveTrue(productImportEntity.getProductEntity().getId());
        if(productEntity == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tồn tại sản phẩm");
        productEntity.setTotalQuantityImported(productEntity.getTotalQuantityImported() - productImportEntity.getQuantityImport());
        if(productEntity.getTotalQuantitySales() == null){
            productEntity.setQuantity(productImportEntity.getQuantityImport());
        } else {
            productEntity.setQuantity(productEntity.getTotalQuantityImported() - productEntity.getTotalQuantitySales());
        }

        if(productEntity.getQuantity() < 0){
            throw new CustomException(HttpStatus.BAD_REQUEST, "Số lượng sản phẩm đang nhỏ hơn 0");
        }

        productImportEntity.setActive(false);
        productImportRepository.save(productImportEntity);
        productRepository.save(productEntity);
    }

}
