package com.datn.atino.repository;


import com.datn.atino.domain.FileNameDictionaryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FileNameDictionaryRepository extends JpaRepository<FileNameDictionaryEntity, Integer> {
    @Query("select f from FileNameDictionaryEntity f where f.isDraft = true  and f.savedFileName = :savedFileName")
    FileNameDictionaryEntity findBySavedFileNameAndIsDraftTrue(@Param("savedFileName") String savedFileName);

    FileNameDictionaryEntity findBySavedFileNameAndIsDraftFalse(String savedFileName);
    List<FileNameDictionaryEntity> findBySavedFileNameInAndIsDraftTrue(List<String> savedFileName);

    @Query("select f from FileNameDictionaryEntity f where f.savedFileName = :savedFileName")
    FileNameDictionaryEntity findBySavedFileName(@Param("savedFileName") String savedFileName);

    @Query("select f from FileNameDictionaryEntity f where f.parentId = :parentId and f.entityType = :entityType")
    List<FileNameDictionaryEntity> findByEntityType(@Param("parentId") Integer parentId, @Param("entityType") Integer entityType);

    @Query("select f from FileNameDictionaryEntity f where f.parentId in :parentId and f.entityType = :entityType")
    List<FileNameDictionaryEntity> findByIdInEntityType(@Param("parentId") List<Integer> parentId, @Param("entityType") Integer entityType);

    List<FileNameDictionaryEntity> findByEntityType(Integer entityType);
}
