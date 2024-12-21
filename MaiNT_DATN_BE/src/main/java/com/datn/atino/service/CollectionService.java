package com.datn.atino.service;

import com.datn.atino.domain.CollectionEntity;
import com.datn.atino.domain.CollectionProductEntity;
import com.datn.atino.domain.ProductEntity;
import com.datn.atino.repository.CollectionProductRepository;
import com.datn.atino.repository.CollectionRepository;
import com.datn.atino.repository.FileNameDictionaryRepository;
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
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class CollectionService {

    private final CollectionRepository collectionRepository;

    private final CollectionProductRepository collectionProductRepository;

    private final FileNameDictionaryRepository fileNameDictionaryRepository;

    private final FileNameDictionaryEntityMapper fileNameDictionaryEntityMapper;

    private final ProductRepository productRepository;

    private final FileStorageService fileStorageService;

    private final ProductMapper productMapper;

    public CollectionService(CollectionRepository collectionRepository, CollectionProductRepository collectionProductRepository, FileNameDictionaryRepository fileNameDictionaryRepository, FileNameDictionaryEntityMapper fileNameDictionaryEntityMapper, ProductRepository productRepository, FileStorageService fileStorageService, ProductMapper productMapper) {
        this.collectionRepository = collectionRepository;
        this.collectionProductRepository = collectionProductRepository;
        this.fileNameDictionaryRepository = fileNameDictionaryRepository;
        this.fileNameDictionaryEntityMapper = fileNameDictionaryEntityMapper;
        this.productRepository = productRepository;
        this.fileStorageService = fileStorageService;
        this.productMapper = productMapper;
    }

    public PageResponse<List<CollectionEntity>> getAll(PageFilterInput<CollectionEntity> input){
        Pageable pageable = Constants.getPageable(input);
        Page<CollectionEntity> collectionEntities = collectionRepository.getAll(input, pageable);
        List<CollectionEntity> result = collectionEntities.getContent();
        for (CollectionEntity collectionEntity : result) {
            collectionEntity.setFiles(
                    fileNameDictionaryEntityMapper.toListDTO(
                            fileNameDictionaryRepository.findByEntityType(collectionEntity.getId(), Constants.EntityType.COLLECTION)
                    )
            );
            collectionEntity.setProducts(
                    productRepository.findByCollection(collectionEntity.getId())
            );
        }
        return new PageResponse<List<CollectionEntity>>().success().data(result).dataCount(collectionEntities.getTotalElements());
    }

    public CollectionEntity getDetail(Integer id){
        CollectionEntity collection = collectionRepository.findByIdAndIsActiveTrue(id);
        List<ProductEntity> productEntities = productRepository.findEntityByCollection(id);
        List<ProductDTO> productDTOS = new ArrayList<>();
        for (ProductEntity productEntity : productEntities){
            productDTOS.add(productMapper.toDTO(productEntity));
        }
        collection.setFiles(fileStorageService.getAllByEntity(id, Constants.EntityType.COLLECTION));
        if(!CollectionUtils.isEmpty(productDTOS)){
            collection.setProducts(productDTOS);
        }
        return collection;
    }

    public void saveCollection(CollectionEntity collectionEntity){
        collectionRepository.save(collectionEntity);
        List<CollectionProductEntity> productEntities = new ArrayList<>();
        for (ProductDTO product : collectionEntity.getProducts()){
            CollectionProductEntity collectionProductEntity = new CollectionProductEntity();
            collectionProductEntity.setIdCollection(collectionEntity.getId());
            collectionProductEntity.setIdProduct(product.getId());
            productEntities.add(collectionProductEntity);
        }
        if(!CollectionUtils.isEmpty(productEntities)){
            collectionProductRepository.saveAll(productEntities);
        }

        fileStorageService.saveDraftFiles(collectionEntity.getFiles(), collectionEntity.getId(), Constants.EntityType.COLLECTION);
    }


    public void updateCollection(Integer id, CollectionEntity collectionEntity){
        CollectionEntity collection = collectionRepository.findByIdAndIsActiveTrue(id);
        if(collection == null) throw new CustomException(HttpStatus.NOT_FOUND, "Không tìm thấy bản ghi");
        collectionEntity.setId(id);
        collectionRepository.save(collectionEntity);
        List<CollectionProductEntity> list = collectionProductRepository.findByIdCollection(id);
        if(!CollectionUtils.isEmpty(list)) collectionProductRepository.deleteAll(list);
        List<CollectionProductEntity> productEntities = new ArrayList<>();
        for (ProductDTO product : collectionEntity.getProducts()){
            CollectionProductEntity collectionProductEntity = new CollectionProductEntity();
            collectionProductEntity.setIdCollection(collectionEntity.getId());
            collectionProductEntity.setIdProduct(product.getId());
            productEntities.add(collectionProductEntity);
        }
        if(!CollectionUtils.isEmpty(productEntities)){
            collectionProductRepository.saveAll(productEntities);
        }

        fileStorageService.saveDraftFiles(collectionEntity.getFiles(), collectionEntity.getId(), Constants.EntityType.COLLECTION);

    }

    public void deleteCollection(Integer id){
        CollectionEntity collection = collectionRepository.findByIdAndIsActiveTrue(id);
        if(collection == null) throw new CustomException(HttpStatus.NOT_FOUND, "Koông tìm thấy bản ghi");
        collection.setActive(false);
        collectionRepository.save(collection);
    }

}
