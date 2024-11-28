package com.datn.atino.service;


import com.datn.atino.repository.ProductBillRepository;
import com.datn.atino.repository.ProductImportRepository;
import com.datn.atino.service.dto.ProfitDTO;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.math.BigDecimal;
import java.util.*;

@Service
public class ProfitService {

    private final ProductImportRepository productImportRepository;

    private final ProductBillRepository productBillRepository;

    public ProfitService(ProductImportRepository productImportRepository, ProductBillRepository productBillRepository) {
        this.productImportRepository = productImportRepository;
        this.productBillRepository = productBillRepository;
    }

    public BigDecimal totalProfit(){
        return productBillRepository.getTotalPrice(null, null).subtract(
                productImportRepository.getTotalPrice(null, null)
        );
    }

    public Set<ProfitDTO> getALlProfit(){
        List<ProfitDTO> profitDTOS = new ArrayList<>(productBillRepository.getAllMonthYear());
        profitDTOS.addAll(productImportRepository.getAllMonthYear());
        if(CollectionUtils.isEmpty(profitDTOS)) return new HashSet<>();
        Set<ProfitDTO> profitDTOSet = new LinkedHashSet<>(profitDTOS);
        for (ProfitDTO profitDTO : profitDTOSet){
            BigDecimal totalRevenue = productBillRepository.getTotalPrice(profitDTO.getMonth(), profitDTO.getYear());
            if(totalRevenue == null) totalRevenue = BigDecimal.ZERO;
            BigDecimal totalExpensive = productImportRepository.getTotalPrice(profitDTO.getMonth(), profitDTO.getYear());
            if(totalExpensive == null) totalExpensive = BigDecimal.ZERO;
            profitDTO.setTotalPrice(totalRevenue.subtract(totalExpensive));
        }
        return profitDTOSet;
    }

}
