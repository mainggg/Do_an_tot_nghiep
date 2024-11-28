package com.datn.atino.domain;

import com.datn.atino.service.dto.FileNameDictionaryDTO;
import com.datn.atino.service.dto.ProductDTO;
import jakarta.persistence.*;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "collection", schema = "datn_atino", catalog = "")
public class CollectionEntity extends AbstractAuditingEntity<Integer>{
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private Integer id;
    @Basic
    @Column(name = "name")
    private String name;
    @Transient
    private List<ProductDTO> products;

    @Transient
    private List<FileNameDictionaryDTO> files;

    @Basic
    @Column(name = "is_active")
    private Boolean isActive = true;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CollectionEntity that = (CollectionEntity) o;
        return id == that.id && Objects.equals(name, that.name) && Objects.equals(isActive, that.isActive);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, isActive);
    }

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }

    public List<FileNameDictionaryDTO> getFiles() {
        return files;
    }

    public void setFiles(List<FileNameDictionaryDTO> files) {
        this.files = files;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
