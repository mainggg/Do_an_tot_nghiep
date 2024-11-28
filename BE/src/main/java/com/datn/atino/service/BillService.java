package com.datn.atino.service;


import com.datn.atino.domain.BillEntity;
import com.datn.atino.domain.BillProductEntity;
import com.datn.atino.domain.NotificationEntity;
import com.datn.atino.domain.ProductEntity;
import com.datn.atino.repository.BillRepository;
import com.datn.atino.repository.ProductBillRepository;
import com.datn.atino.repository.ProductRepository;
import com.datn.atino.service.dto.BillDTO;
import com.datn.atino.service.dto.ProductBillDTO;
import com.datn.atino.service.dto.ProductDTO;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.model.PageFilterInput;
import com.datn.atino.service.respone.CommonResponse;
import com.datn.atino.service.respone.PageResponse;
import com.datn.atino.service.util.Constants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class BillService {

    private final BillRepository billRepository;

    private final ProductBillRepository productBillRepository;
    private final ProductRepository productRepository;

    private final WebSocketService webSocketService;

    public BillService(BillRepository billRepository, ProductBillRepository productBillRepository, ProductRepository productRepository, WebSocketService webSocketService) {
        this.billRepository = billRepository;
        this.productBillRepository = productBillRepository;
        this.productRepository = productRepository;
        this.webSocketService = webSocketService;
    }

    public PageResponse<List<BillDTO>> getAllBill(PageFilterInput<BillDTO> input){
        Pageable pageable = Constants.getPageable(input);
        List<BillDTO> result = new ArrayList<>();
        Page<BillEntity> billEntities = billRepository.getAll(input, pageable);

        for (BillEntity billEntity : billEntities.getContent()){
            BillDTO billDTO = new BillDTO();
            billDTO.setId(billEntity.getId());
            billDTO.setBillCode(billEntity.getBillCode());
            billDTO.setCreatedBy(billEntity.getCreatedBy());
            billDTO.setCreatedAt(billEntity.getCreatedAt());
            billDTO.setBillNote(billEntity.getBillNote());
            billDTO.setTotalPrice(billEntity.getTotalPrice());
            billDTO.setReciver(billEntity.getReciver());
            billDTO.setEmail(billEntity.getEmail());
            billDTO.setPhoneNumber(billEntity.getPhoneNumber());
            billDTO.setStatus(billEntity.getStatus());
            result.add(billDTO);
        }

        return new PageResponse<List<BillDTO>>().success().dataCount(billEntities.getTotalElements()).data(result);
    }

    public CommonResponse getDetail(Integer id){
        BillEntity billEntity = billRepository.findByBillId(id);
        BillDTO billDTO = new BillDTO();
        billDTO.setId(billEntity.getId());
        billDTO.setBillCode(billEntity.getBillCode());
        billDTO.setCreatedBy(billEntity.getCreatedBy());
        billDTO.setCreatedAt(billEntity.getCreatedAt());
        billDTO.setBillNote(billEntity.getBillNote());
        billDTO.setTotalPrice(billEntity.getTotalPrice());
        billDTO.setReciver(billEntity.getReciver());
        billDTO.setEmail(billEntity.getEmail());
        billDTO.setPhoneNumber(billEntity.getPhoneNumber());
        billDTO.setStatus(billEntity.getStatus());
        billDTO.setPaymentMethod(billEntity.getPaymentMethod());
        List<BillProductEntity> productEntities = productBillRepository.findByBillId(id);
        Map<Integer, ProductDTO> productDTOMap = productRepository.findByAllProduct()
                .stream()
                .collect(Collectors.toMap(ProductDTO::getId, Function.identity()));
        List<ProductBillDTO> productBillDTOS = new ArrayList<>();

        for (BillProductEntity billProductEntity : productEntities){
            ProductBillDTO productBillDTO = new ProductBillDTO();
            productBillDTO.setId(billProductEntity.getId());
            productBillDTO.setProduct(productDTOMap.get(billProductEntity.getProductId()));
            productBillDTO.setQuantity(billProductEntity.getQuantity());
            productBillDTO.setSales(billProductEntity.getSales());
            productBillDTO.setSize(billProductEntity.getSize());
            productBillDTO.setColor(billProductEntity.getColor());
            productBillDTO.setPrice(billProductEntity.getPrice());
            productBillDTOS.add(productBillDTO);

        }

        billDTO.setProductBill(productBillDTOS);
        return new CommonResponse().success().data(billDTO);
    }

    @Transactional
    public void saveBill(BillDTO input){
        BillEntity billEntity = new BillEntity();
        billEntity.setBillCode(autoGenCode());
        billEntity.setCreatedBy(input.getCreatedBy());
        billEntity.setCreatedAt(Instant.now());
        billEntity.setBillNote(input.getBillNote());
        billEntity.setTotalPrice(input.getTotalPrice());
        billEntity.setReciver(input.getReciver());
        billEntity.setEmail(input.getEmail());
        billEntity.setPhoneNumber(input.getPhoneNumber());
        billEntity.setStatus(input.getStatus());
        billEntity.setAddress(input.getAddress());
        billEntity.setBillNote(input.getBillNote());
        billEntity.setPaymentMethod(input.getPaymentMethod());
        billRepository.save(billEntity);
        BigDecimal total = BigDecimal.ZERO;
        List<ProductEntity> productEntities1 = new ArrayList<>();
        if(CollectionUtils.isEmpty(input.getProductBill())) throw new CustomException(HttpStatus.BAD_REQUEST, "Bạn phải chọn sản phẩm");
        List<BillProductEntity> productEntitiesSave = new ArrayList<>();
        for (ProductBillDTO productBillDTO : input.getProductBill()){
            BillProductEntity productEntity = new BillProductEntity();
            productEntity.setBillId(billEntity.getId());
            productEntity.setProductId(productBillDTO.getProduct().getId());
            productEntity.setQuantity(productBillDTO.getQuantity());
            productEntity.setSales(productBillDTO.getSales());
            productEntity.setSize(productBillDTO.getSize());
            productEntity.setColor(productBillDTO.getColor());
            productEntity.setPrice(productBillDTO.getPrice());
            productEntitiesSave.add(productEntity);
            total = total.add(productBillDTO.getPrice().multiply(BigDecimal.valueOf(productBillDTO.getQuantity())));
            ProductEntity productEntity1 = productRepository.findByIdAndIsActiveTrue(productBillDTO.getProduct().getId());
            productEntity1.setTotalQuantitySales(productEntity1.getTotalQuantitySales() == null ? 0 : productEntity1.getTotalQuantitySales() + productBillDTO.getQuantity());
            productEntity1.setQuantity(productEntity1.getQuantity() == null ? 0 : productEntity1.getQuantity() - productBillDTO.getQuantity());
            productEntities1.add(productEntity1);
        }
        billEntity.setTotalPrice(total);
        billRepository.save(billEntity);
        if(!CollectionUtils.isEmpty(productEntities1)){
            productRepository.saveAll(productEntities1);
        }
        productBillRepository.saveAll(productEntitiesSave);
        NotificationEntity notificationEntity = new NotificationEntity();
        notificationEntity.setTitle("Thông báo đặt hàng");
        notificationEntity.setContent("Đơn hàng có mã " + billEntity.getBillCode() + " vừa được đặt hàng. Vui lòng xác nhận đơn hàng!");
        notificationEntity.setRouterLink("./admin/bill/detail/" + billEntity.getId());
        notificationEntity.setCreatedAt(Instant.now());
        webSocketService.sendMessage(notificationEntity);
    }

    public void changeStatus(Integer id, Integer status){
        BillEntity billEntity = billRepository.findByBillId(id);
        billEntity.setStatus(status);
        billRepository.save(billEntity);
    }

    public String autoGenCode(){
        String maxCode = billRepository.findMaxCode();
        long dem = 0;
        if(StringUtils.hasText(maxCode)){
            dem = Long.parseLong(maxCode.replace("HD", ""));
        }
        dem += 1;
        return "HD" + String.format("%03d", dem);
    }

}
