package com.datn.atino.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "file_name_dictionary")
public class FileNameDictionaryEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    @JsonIgnore
    private Integer id;

    @Column(name = "parent_id")
    private Integer parentId;

    @Column(name = "entity_type")
    private Integer entityType;

    @Basic
    @Column(name = "file_name")
    private String fileName;

    @Basic
    @Column(name = "saved_file_name")
    private String savedFileName;

    @Column(name = "size")
    private long size;

    @Basic
    @Column(name = "is_draft")
    @JsonIgnore
    private Boolean isDraft = true;

    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

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

    public String getSavedFileName() {
        return savedFileName;
    }

    public void setSavedFileName(String savedFileName) {
        this.savedFileName = savedFileName;
    }

    public Boolean getIsDraft() {
        return isDraft;
    }

    public void setIsDraft(Boolean isDraft) {
        this.isDraft = isDraft;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }


    public Integer getParentId() {
        return parentId;
    }

    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    public Integer getEntityType() {
        return entityType;
    }

    public void setEntityType(Integer entityType) {
        this.entityType = entityType;
    }
}
