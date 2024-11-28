package com.datn.atino.web;


import com.datn.atino.service.ProfitService;
import com.datn.atino.service.respone.CommonResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProfitResource {

    private final ProfitService profitService;

    public ProfitResource(ProfitService profitService) {
        this.profitService = profitService;
    }

    @GetMapping("/admin/profit/total-price")
    public CommonResponse getTotalPrice(){
        return new CommonResponse().success().data(profitService.totalProfit());
    }

    @GetMapping("/admin/all-profit")
    public CommonResponse allProfit(){
        return new CommonResponse().success().data(profitService.getALlProfit());
    }
}
