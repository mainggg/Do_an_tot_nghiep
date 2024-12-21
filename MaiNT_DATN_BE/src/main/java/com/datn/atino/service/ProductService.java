package com.datn.atino.service;


import com.datn.atino.domain.ProductEntity;
import com.datn.atino.repository.ProductRepository;
import com.datn.atino.service.dto.ProductDTO;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.mapper.FileNameDictionaryEntityMapper;
import com.datn.atino.service.mapper.ProductMapper;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    private final FileStorageService fileStorageService;


    public ProductService(ProductRepository productRepository, ProductMapper productMapper, FileStorageService fileStorageService) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.fileStorageService = fileStorageService;
    }

    public PageResponse<List<ProductDTO>> getAll(PageFilterInput<ProductDTO> input){
        Pageable pageable = Constants.getPageable(input);
        List<ProductDTO> result = new ArrayList<>();
        Page<ProductEntity> productEntities = productRepository.getAll(input, pageable);
        for (ProductEntity productEntity : productEntities.getContent()){
            result.add(productMapper.toDTO(productEntity));
        }
        return new PageResponse<List<ProductDTO>>().success().dataCount(productEntities.getTotalElements()).data(result);
    }

    public ProductDTO getDetail(Integer id){
        ProductEntity productEntity = productRepository.findByIdAndIsActiveTrue(id);
        ProductDTO result = productMapper.toDTO(productEntity);
        result.setImageDescription(
                fileStorageService.getAllByEntity(id, Constants.EntityType.PRODUCT)
        );
        return result;
    }

    public void saveProduct(ProductDTO product){
        ProductEntity productEntity = productRepository.findByProductNameAndIsActiveTrue(product.getProductName());
        if(productEntity != null) throw new CustomException(HttpStatus.CONFLICT, "Đã tồn tại sản phẩm có tên: " + product.getProductName());
        productEntity = productMapper.toEntity(product);
        productRepository.save(productEntity);
        fileStorageService.saveDraftFiles(product.getImageDescription(), productEntity.getId(), Constants.EntityType.PRODUCT);
    }

    public void updateProduct(Integer id, ProductDTO product){
        ProductEntity productEntityValidate = productRepository.findByProductNameAndIsActiveTrue(product.getProductName());
        ProductEntity productEntityUpdate = productRepository.findByIdAndIsActiveTrue(id);
        if(productEntityValidate != null && !productEntityValidate.getId().equals(id)){
            throw new CustomException(HttpStatus.CONFLICT, "Đã tồn tại sản phẩm có tên: " + product.getProductName());
        }
        if(productEntityUpdate == null){
            throw new CustomException(HttpStatus.CONFLICT, "Không tìm thấy bản ghi");
        }
        productMapper.updateForm(productEntityUpdate, product);

        productRepository.save(productEntityUpdate);
        fileStorageService.saveDraftFiles(product.getImageDescription(), id, Constants.EntityType.PRODUCT);
    }

    public void deleteProduct(Integer id){
        ProductEntity productEntity = productRepository.findByIdAndIsActiveTrue(id);
        if(productEntity == null){
            throw new CustomException(HttpStatus.CONFLICT, "Không tìm thấy bản ghi");
        }
        productEntity.setActive(false);
        productRepository.save(productEntity);
    }

}
