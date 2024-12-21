package com.datn.atino.repository;

import com.datn.atino.domain.BillProductEntity;
import com.datn.atino.service.dto.ProfitDTO;
import com.datn.atino.service.dto.RevenueDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductBillRepository extends JpaRepository<BillProductEntity, Integer> {

    List<BillProductEntity> findByBillId(Integer billId);

    @Query("select new com.datn.atino.service.dto.RevenueDTO(pi.createdAt , p.productName, sum(pi.quantity)) from BillProductEntity pi join ProductEntity p on p.id = pi.productId " +
            "group by pi.createdAt, pi.productId order by pi.createdAt")
    List<RevenueDTO> getRevenue();

    @Query("select sum(b.price * b.quantity) from BillProductEntity b where ((:moth is null or :year is null) or (month (b.createdAt) = :moth and year(b.createdAt) = :year))")
    BigDecimal getTotalPrice(@Param("moth") Integer moth, @Param("year") Integer year);

    @Query("select new com.datn.atino.service.dto.RevenueDTO(p.productName, sum(b.price * b.quantity)) from BillProductEntity b join ProductEntity p on b.productId = p.id " +
            "where ((:moth is null or :year is null) or (month (b.createdAt) = :moth and year(b.createdAt) = :year)) " +
            "group by p.id")
    List<RevenueDTO> getRevenueByMoth(@Param("moth") Integer moth, @Param("year") Integer year);

    @Query("select new com.datn.atino.service.dto.RevenueDTO(b.createdAt, sum(b.price * b.quantity)) from BillProductEntity b group by year(b.createdAt), month (b.createdAt) order by b.createdAt")
    List<RevenueDTO> getRevenueForManyMonth();

    @Query("select new com.datn.atino.service.dto.ProfitDTO(month (b.createdAt), year (b.createdAt)) from BillProductEntity b order by b.createdAt asc ")
    List<ProfitDTO> getAllMonthYear();

    @Query("SELECT SUM(bp.quantity) " +
            "FROM BillProductEntity bp " +
            "JOIN BillEntity b ON bp.billId = b.id " +
            "WHERE b.status != -1 AND bp.color = :color AND bp.size = :size AND bp.productId = :productId")
    Long getTotalQuantityByColorAndSizeAndStatus(
            @Param("color") String color,
            @Param("size") String size,
            @Param("productId") Integer productId
    );
}
