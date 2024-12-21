package com.datn.atino.domain;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "notification", schema = "datn_atino", catalog = "")
public class NotificationEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;
    @Basic
    @Column(name = "title")
    private String title;
    @Basic
    @Column(name = "content")
    private String content;

    @Basic
    @Column(name = "router_link")
    private String routerLink;

    @Basic
    @Column(name = "is_read")
    private Boolean isRead = false;
    @Basic
    @Column(name = "username")
    private String username;
    @Basic
    @Column(name = "createdAt")
    private Instant createdAt = Instant.now();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NotificationEntity that = (NotificationEntity) o;
        return id == that.id && Objects.equals(title, that.title) && Objects.equals(content, that.content) && Objects.equals(isRead, that.isRead) && Objects.equals(username, that.username) && Objects.equals(createdAt, that.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, content, isRead, username, createdAt);
    }

    public String getRouterLink() {
        return routerLink;
    }

    public void setRouterLink(String routerLink) {
        this.routerLink = routerLink;
    }
}
