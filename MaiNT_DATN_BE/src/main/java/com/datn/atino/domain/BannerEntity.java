package com.datn.atino.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "banner")
public class BannerEntity extends AbstractAuditingEntity<Integer>{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "image_banner")
    private String imageBanner;

    @Column(name = "is_visible")
    private Boolean isVisible = true;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Override
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImageBanner() {
        return imageBanner;
    }

    public void setImageBanner(String imageBanner) {
        this.imageBanner = imageBanner;
    }

    public Boolean getVisible() {
        return isVisible;
    }

    public void setVisible(Boolean visible) {
        isVisible = visible;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
