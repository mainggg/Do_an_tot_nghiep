package com.datn.atino.service.util;

import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class Constants {

    public static Pageable getPageable(PageFilterInput input){
        if(input.getPageSize() == 0){
            return Pageable.unpaged();
        }
        return PageRequest.of(input.getPageNumber(), input.getPageSize());
    }

    public interface EntityType {
        int PRODUCT = 1;

        int BANNER = 2;

        int COLLECTION = 3;
    }

}
