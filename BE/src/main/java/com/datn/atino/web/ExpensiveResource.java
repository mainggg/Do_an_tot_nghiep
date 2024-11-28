package com.datn.atino.web;

import com.datn.atino.service.ExpensiveService;
import com.datn.atino.service.respone.CommonResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExpensiveResource {

    private final ExpensiveService expensiveService;

    public ExpensiveResource(ExpensiveService expensiveService) {
        this.expensiveService = expensiveService;
    }

    @GetMapping("/admin/expensive/total-price")
    public CommonResponse getTotalPrice(){
        return new CommonResponse().success().data(expensiveService.getTotalPriceRevenue(null, null));
    }

    @GetMapping("/admin/expensive/total-price/{moth}/{year}")
    public CommonResponse getTotalPriceMothYear(@PathVariable Integer moth, @PathVariable Integer year){
        return new CommonResponse().success().data(expensiveService.getTotalPriceRevenue(moth, year));
    }

    @GetMapping("/admin/expensive/{month}/{year}")
    public CommonResponse getRevenueByMonth(@PathVariable Integer month, @PathVariable Integer year){
        return new CommonResponse().success().data(expensiveService.getExpensiveByMoth(month, year));
    }

    @GetMapping("/admin/expensive/many-month")
    public CommonResponse getRevenueForManyMonth(){
        return new CommonResponse().success().data(expensiveService.getExpensiveForManyMonth());
    }
}
