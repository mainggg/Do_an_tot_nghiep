package com.datn.atino.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "color")
public class ColorEntity extends AbstractAuditingEntity<Integer>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "color")
    private String color;

    @Column(name = "is_active")
    private Boolean isActive = true;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
