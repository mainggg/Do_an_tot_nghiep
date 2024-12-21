package com.datn.atino.domain;

import jakarta.persistence.*;


@Entity
@Table(name = "collection_product")
public class CollectionProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "id_collection")
    private Integer idCollection;

    @Column(name = "id_product")
    private Integer idProduct;

    public Integer getIdCollection() {
        return idCollection;
    }

    public void setIdCollection(Integer idCollection) {
        this.idCollection = idCollection;
    }

    public Integer getIdProduct() {
        return idProduct;
    }

    public void setIdProduct(Integer idProduct) {
        this.idProduct = idProduct;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
