package com.datn.atino.domain;

import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "news")
public class NewsEntity extends AbstractAuditingEntity<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "author")
    private String author;

    @Column(name = "brief_description")
    private String briefDescription;

    @Column(name = "content")
    private String content;

    @Column(name = "is_visible")
    private Boolean isVisible;

    @Column(name = "is_active")
    private Boolean isActive = true;

    public NewsEntity() {
    }

    public NewsEntity(Integer id, String title, String avatar, String author, String briefDescription, Boolean isVisible, Instant createdAt, Instant updatedAt) {
        this.id = id;
        this.title = title;
        this.avatar = avatar;
        this.author = author;
        this.isVisible = isVisible;
        this.briefDescription = briefDescription;
        this.setCreatedAt(createdAt);
        this.setUpdatedAt(updatedAt);
    }

    @Override
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getBriefDescription() {
        return briefDescription;
    }

    public void setBriefDescription(String briefDescription) {
        this.briefDescription = briefDescription;
    }
}
