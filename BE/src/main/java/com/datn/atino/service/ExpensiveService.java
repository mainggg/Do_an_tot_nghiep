package com.datn.atino.service;

import com.datn.atino.repository.ProductImportRepository;
import com.datn.atino.service.dto.ExpensiveDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ExpensiveService {

    private final ProductImportRepository productImportRepository;


    public ExpensiveService(ProductImportRepository productImportRepository) {
        this.productImportRepository = productImportRepository;
    }


    public BigDecimal getTotalPriceRevenue(Integer moth, Integer year){
        return productImportRepository.getTotalPrice(moth, year);
    }

    public List<ExpensiveDTO> getExpensiveByMoth(Integer month, Integer year){
        List<ExpensiveDTO> revenueDTOS = productImportRepository.getExpensiveByMoth(month, year);
        BigDecimal totalPrice = productImportRepository.getTotalPrice(month, year);
        for (ExpensiveDTO expensiveDTO : revenueDTOS){
            expensiveDTO.setPercent(expensiveDTO.getTotalPrice().divide(totalPrice, 2).floatValue());
        }
        return revenueDTOS;
    }

    public List<ExpensiveDTO> getExpensiveForManyMonth(){
        return productImportRepository.getExpensiveForManyMonth();
    }
}
