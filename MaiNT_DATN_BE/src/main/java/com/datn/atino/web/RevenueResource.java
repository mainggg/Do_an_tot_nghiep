package com.datn.atino.web;


import com.datn.atino.service.RevenueService;
import com.datn.atino.service.respone.CommonResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RevenueResource {

    private final RevenueService statisticalService;

    public RevenueResource(RevenueService statisticalService) {
        this.statisticalService = statisticalService;
    }

    @GetMapping("/admin/revenue/product")
    public CommonResponse getRevenueProduct(){
        return new CommonResponse().success().data(statisticalService.getRevenueProductSell());
    }

    @GetMapping("/admin/total-price")
    public CommonResponse getTotalPrice(){
        return new CommonResponse().success().data(statisticalService.getTotalPriceRevenue(null, null));
    }

    @GetMapping("/admin/total-price/{moth}/{year}")
    public CommonResponse getTotalPriceMothYear(@PathVariable Integer moth, @PathVariable Integer year){
        return new CommonResponse().success().data(statisticalService.getTotalPriceRevenue(moth, year));
    }

    @GetMapping("/admin/revenue/{month}/{year}")
    public CommonResponse getRevenueByMonth(@PathVariable Integer month, @PathVariable Integer year){
        return new CommonResponse().success().data(statisticalService.getRevenueByMoth(month, year));
    }

    @GetMapping("/admin/revenue/many-month")
    public CommonResponse getRevenueForManyMonth(){
        return new CommonResponse().success().data(statisticalService.getRevenueForManyMonth());
    }


}
