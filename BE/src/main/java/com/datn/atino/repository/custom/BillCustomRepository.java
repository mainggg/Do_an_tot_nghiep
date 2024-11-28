package com.datn.atino.repository.custom;

import com.datn.atino.domain.BillEntity;
import com.datn.atino.service.dto.BillDTO;
import com.datn.atino.service.model.PageFilterInput;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BillCustomRepository {

    Page<BillEntity> getAll(PageFilterInput<BillDTO> input, Pageable pageable);

}
