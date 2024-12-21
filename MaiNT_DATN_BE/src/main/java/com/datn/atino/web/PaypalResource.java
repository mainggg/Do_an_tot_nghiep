package com.datn.atino.web;

import com.datn.atino.config.PaypalPaymentIntent;
import com.datn.atino.config.PaypalPaymentMethod;
import com.datn.atino.service.PaypalService;
import com.datn.atino.service.respone.CommonResponse;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class PaypalResource {

    @Autowired
    PaypalService service;

    public static final String SUCCESS_URL = "home/payment-success";
    public static final String CANCEL_URL = "home/payment";

    @GetMapping("/pay/{giaTien}")
    public CommonResponse payment(@PathVariable("giaTien") double giaTien) {
        try {
            Payment payment = service.createPayment(giaTien, "USD", PaypalPaymentMethod.paypal,
                    PaypalPaymentIntent.sale, "Mô tả", "http://localhost:4200/" + CANCEL_URL,
                    "http://localhost:4200/" + SUCCESS_URL);
            for(Links link:payment.getLinks()) {
                if(link.getRel().equals("approval_url")) {
                    return new CommonResponse().success().data(link.getHref());
                }
            }

        } catch (PayPalRESTException e) {

            e.printStackTrace();
        }
        return new CommonResponse().success("Có lỗi xảy ra");
    }

    @GetMapping(value = CANCEL_URL)
    public String cancelPay() {
        return "cancel";
    }

    @GetMapping(value = SUCCESS_URL)
    public RedirectView successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
        try {
            Payment payment = service.executePayment(paymentId, payerId);
            System.out.println(payment.toJSON());
            if (payment.getState().equals("approved")) {
                return new RedirectView("http://localhost:4200/home/payment-success");
            }
        } catch (PayPalRESTException e) {
            System.out.println(e.getMessage());
        }
        return new RedirectView();
    }

}