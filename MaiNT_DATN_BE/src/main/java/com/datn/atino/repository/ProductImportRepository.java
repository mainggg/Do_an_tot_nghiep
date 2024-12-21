package com.datn.atino.repository;

import com.datn.atino.domain.ProductImportEntity;
import com.datn.atino.repository.custom.ProductImportCustom;
import com.datn.atino.service.dto.ExpensiveDTO;
import com.datn.atino.service.dto.ProfitDTO;
import com.datn.atino.service.dto.RevenueDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductImportRepository extends JpaRepository<ProductImportEntity, Integer>, ProductImportCustom {

    ProductImportEntity findByIdAndIsActiveTrue(Integer id);

    @Query("select sum(b.priceImport * b.quantityImport) from ProductImportEntity b where b.isActive = true and ((:moth is null or :year is null) or (month (b.createdAt) = :moth and year(b.createdAt) = :year))")
    BigDecimal getTotalPrice(@Param("moth") Integer moth, @Param("year") Integer year);

    @Query("select new com.datn.atino.service.dto.ExpensiveDTO(p.productName, sum(b.priceImport * b.quantityImport)) from ProductImportEntity b join ProductEntity p on b.productEntity.id = p.id " +
            "where ((:moth is null or :year is null) or (month (b.createdAt) = :moth and year(b.createdAt) = :year)) and b.isActive = true " +
            "group by p.id")
    List<ExpensiveDTO> getExpensiveByMoth(@Param("moth") Integer moth, @Param("year") Integer year);

    @Query("select new com.datn.atino.service.dto.ExpensiveDTO(date(b.createdAt), sum(b.priceImport * b.quantityImport)) from ProductImportEntity b where b.isActive = true " +
            "group by year(b.createdAt), month (b.createdAt) order by b.createdAt asc ")
    List<ExpensiveDTO> getExpensiveForManyMonth();

    @Query("select new com.datn.atino.service.dto.ProfitDTO(month (b.createdAt), year (b.createdAt)) from ProductImportEntity b where b.isActive = true order by b.createdAt asc ")
    List<ProfitDTO> getAllMonthYear();

    @Query("SELECT SUM(p.quantityImport) FROM ProductImportEntity p " +
            "WHERE p.productEntity.id = :productId " +
            "AND p.color = :color " +
            "AND p.size = :size " +
            "AND p.isActive = true")
    Long getTotalQuantityImport(@Param("color") String color,
                                @Param("size") String size,
                                @Param("productId") Integer productId);
}
