package com.datn.atino.service.dto;


import com.datn.atino.domain.FileNameDictionaryEntity;

import java.time.Instant;

public class FileNameDictionaryDTO {

    private Integer id;

    private String fileName;

    private String savedFileName;

    private String path;

    private long size;

    private Instant createdAt;

    public FileNameDictionaryDTO() {}

    public FileNameDictionaryDTO(FileNameDictionaryEntity entity) {
        this.id = entity.getId();
        this.fileName = entity.getFileName();
        this.savedFileName = entity.getSavedFileName();
        this.path = entity.getSavedFileName();
        this.size = entity.getSize();
        this.createdAt = entity.getCreatedAt();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getSavedFileName() {
        return savedFileName;
    }

    public void setSavedFileName(String savedFileName) {
        this.savedFileName = savedFileName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
