package com.datn.atino.service;

import com.datn.atino.repository.ProductBillRepository;
import com.datn.atino.repository.ProductImportRepository;
import com.datn.atino.service.dto.RevenueDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class RevenueService {

    private final ProductBillRepository productBillRepository;

    public RevenueService(ProductBillRepository productBillRepository) {
        this.productBillRepository = productBillRepository;
    }

    public List<RevenueDTO> getRevenueProductSell(){
        return productBillRepository.getRevenue();
    }

    public BigDecimal getTotalPriceRevenue(Integer moth, Integer year){
        return productBillRepository.getTotalPrice(moth, year);
    }

    public List<RevenueDTO> getRevenueByMoth(Integer month, Integer year){
        List<RevenueDTO> revenueDTOS = productBillRepository.getRevenueByMoth(month, year);
        BigDecimal totalPrice = productBillRepository.getTotalPrice(month, year);
        for (RevenueDTO revenueDTO : revenueDTOS){
            revenueDTO.setPercent(revenueDTO.getTotalPrice().divide(totalPrice, 2).floatValue());
        }
        return revenueDTOS;
    }

    public List<RevenueDTO> getRevenueForManyMonth(){
        return productBillRepository.getRevenueForManyMonth();
    }

}
