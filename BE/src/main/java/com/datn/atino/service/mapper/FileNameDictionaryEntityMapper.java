package com.datn.atino.service.mapper;


import com.datn.atino.domain.FileNameDictionaryEntity;
import com.datn.atino.service.dto.FileNameDictionaryDTO;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

@Component
public class FileNameDictionaryEntityMapper {

    public List<FileNameDictionaryDTO> toListDTO(List<FileNameDictionaryEntity> fileNameDictionaryEntities) {
        List<FileNameDictionaryDTO> result = new ArrayList<>();
        if (!CollectionUtils.isEmpty(fileNameDictionaryEntities)) {
            fileNameDictionaryEntities.forEach(f -> {
                if (!f.getIsDraft()) {
                    FileNameDictionaryDTO fileNameDictionaryDTO = new FileNameDictionaryDTO();
                    fileNameDictionaryDTO.setFileName(f.getFileName());
                    fileNameDictionaryDTO.setId(f.getId());
                    fileNameDictionaryDTO.setSavedFileName(f.getSavedFileName());
                    fileNameDictionaryDTO.setSize(f.getSize());
                    fileNameDictionaryDTO.setPath(f.getSavedFileName());
                    fileNameDictionaryDTO.setCreatedAt(f.getCreatedAt());
                    result.add(fileNameDictionaryDTO);
                }
            });
        }
        return result;
    }


    public FileNameDictionaryDTO toDTO(FileNameDictionaryEntity fileNameDictionaryEntity) {
        FileNameDictionaryDTO fileNameDictionaryDTO = new FileNameDictionaryDTO();
        if (fileNameDictionaryEntity != null) {
            fileNameDictionaryDTO.setFileName(fileNameDictionaryEntity.getFileName());
            fileNameDictionaryDTO.setId(fileNameDictionaryEntity.getId());
            fileNameDictionaryDTO.setSavedFileName(fileNameDictionaryEntity.getSavedFileName());
            fileNameDictionaryDTO.setSize(fileNameDictionaryEntity.getSize());
            fileNameDictionaryDTO.setPath(fileNameDictionaryEntity.getSavedFileName());
            fileNameDictionaryDTO.setCreatedAt(fileNameDictionaryEntity.getCreatedAt());
        }
        return fileNameDictionaryDTO;
    }
}
