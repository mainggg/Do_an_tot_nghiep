package com.datn.atino.web;


import com.datn.atino.service.BillService;
import com.datn.atino.service.dto.BillDTO;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillResource {

    private final BillService billService;

    public BillResource(BillService billService) {
        this.billService = billService;
    }


    @PostMapping("/admin/bills")
    public PageResponse<List<BillDTO>> getAll(@RequestBody PageFilterInput<BillDTO> input){
        return billService.getAllBill(input);
    }

    @PostMapping("/bills")
    public PageResponse<List<BillDTO>> getAllUser(@RequestBody PageFilterInput<BillDTO> input){
        return billService.getAllBill(input);
    }

    @GetMapping("/bills/{id}")
    public CommonResponse getDetail(@PathVariable Integer id){
        return billService.getDetail(id);
    }

    @PostMapping("/bills/create")
    public CommonResponse createBill(@RequestBody BillDTO input){
        billService.saveBill(input);
        return new CommonResponse().success();
    }

    @PostMapping("/bills/check")
    public CommonResponse check(@RequestBody BillDTO input){
        billService.checkRemain(input);
        return new CommonResponse().success();
    }

    @GetMapping("/bills/{billId}/change/{status}")
    public CommonResponse changeStatus(@PathVariable Integer billId, @PathVariable Integer status){
        billService.changeStatus(billId, status);
        return new CommonResponse().success();
    }

}
