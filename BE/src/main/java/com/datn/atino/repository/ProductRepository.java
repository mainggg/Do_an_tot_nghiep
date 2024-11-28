package com.datn.atino.repository;

import com.datn.atino.domain.ProductEntity;
import com.datn.atino.repository.custom.ProductRepositoryCustom;
import com.datn.atino.service.dto.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer>, ProductRepositoryCustom {

    ProductEntity findByIdAndIsActiveTrue(Integer id);

    ProductEntity findByProductNameAndIsActiveTrue(String productName);

    @Query("select new com.datn.atino.service.dto.ProductDTO(p.id, p.productName) from ProductEntity p inner join CollectionProductEntity c " +
            "on c.idProduct = p.id " +
            "where p.isActive = true and c.idCollection = :idCollection")
    List<ProductDTO> findByCollection(@Param("idCollection") Integer idCollection);

    @Query("select new com.datn.atino.service.dto.ProductDTO(p.id, p.productName) from ProductEntity p" +
            " " +
            "where p.isActive")
    List<ProductDTO> findByAllProduct();


    @Query("select p from ProductEntity p inner join CollectionProductEntity c " +
            "on c.idProduct = p.id " +
            "where p.isActive = true and c.idCollection = :idCollection")
    List<ProductEntity> findEntityByCollection(@Param("idCollection") Integer idCollection);
}
