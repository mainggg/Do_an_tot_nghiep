package com.datn.atino.service;


import com.datn.atino.domain.FileNameDictionaryEntity;
import com.datn.atino.repository.FileNameDictionaryRepository;
import com.datn.atino.service.dto.FileNameDictionaryDTO;
import com.datn.atino.service.exception.CustomException;
import com.datn.atino.service.mapper.FileNameDictionaryEntityMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.FilenameUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class FileStorageService {

    private static Path path = Paths.get("file.path.data");
    private final FileNameDictionaryRepository fileNameDictionaryRepository;
    private final FileNameDictionaryEntityMapper fileNameDictionaryEntityMapper;

    public FileStorageService(
        @Value("${file.path.data}") String PATH_STRING,
        FileNameDictionaryRepository fileNameDictionaryRepository,
        FileNameDictionaryEntityMapper fileNameDictionaryEntityMapper
    ) {
        path = Paths.get(PATH_STRING);
        this.fileNameDictionaryRepository = fileNameDictionaryRepository;
        this.fileNameDictionaryEntityMapper = fileNameDictionaryEntityMapper;
    }

    public void init() {
        try {
            Files.createDirectory(path);
        } catch (IOException e) {
            throw new RuntimeException("Unable to init upload dir");
        }
    }

    public String save(MultipartFile file) {
        String filename = UUID.randomUUID() + "." + FilenameUtils.getExtension(file.getOriginalFilename());
        try {
            Files.copy(file.getInputStream(), path.resolve(filename));
            return filename;
        } catch (Exception e) {
            //throw new CustomException(HttpStatus.CONFLICT, "Đã tồn tại file có tên: " + filename);
            throw new CustomException(HttpStatus.NOT_FOUND ,"Could not store the file. Error: " + e.getMessage());
        }
    }

    public Resource load(String filename) {
        try {
            //System.err.println(filename);
            Path file = path.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new CustomException(HttpStatus.NOT_FOUND, "Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "Error: " + e.getMessage());
        }
    }

    public ResponseEntity<ByteArrayResource> previewFile(String filename) throws IOException {
        Resource file = load(filename);
        String extension = FilenameUtils.getExtension(filename);
        byte[] data = Files.readAllBytes(file.getFile().toPath());
        ByteArrayResource resource = new ByteArrayResource(data);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        //        FileNameDictionaryEntity fileNameDictionary = fileNameDictionaryRepository.findBySavedFileName(filename);
        //        String downloadFilename = fileNameDictionary == null ? filename : fileNameDictionary.getFileName();
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"");
        if (
            "png".equalsIgnoreCase(extension) ||
            "jpg".equalsIgnoreCase(extension) ||
            "jpge".equalsIgnoreCase(extension) ||
            "gif".equalsIgnoreCase(extension) ||
            "jfif".equalsIgnoreCase(extension)
        ) {
            headers.setContentType(MediaType.IMAGE_PNG);
        }

        return ResponseEntity.ok().headers(headers).body(resource);
    }

    public String deleteFile(String fileName) throws IOException {
        Path file = path.resolve(fileName);
        if (!file.toFile().exists()) throw new CustomException(HttpStatus.NOT_FOUND, "Không tồn tại file: " + fileName);
        Files.delete(file);
        FileNameDictionaryEntity fileNameDictionaryEntityDelete = fileNameDictionaryRepository.findBySavedFileName(fileName);
        if (fileNameDictionaryEntityDelete != null) fileNameDictionaryRepository.delete(fileNameDictionaryEntityDelete);
        return fileName;
    }

    public List<FileNameDictionaryEntity> uploadFile(List<MultipartFile> files) {
        List<FileNameDictionaryEntity> entities = new ArrayList<>(files.size());
        for (MultipartFile file : files) {
            String savedFileName = save(file);
            FileNameDictionaryEntity entity = new FileNameDictionaryEntity();
            entity.setFileName(file.getOriginalFilename());
            entity.setSavedFileName(savedFileName);
            entity.setSize(file.getSize());
            entities.add(entity);
        }
        return fileNameDictionaryRepository.saveAll(entities);
    }

    public FileNameDictionaryEntity uploadFile(MultipartFile file) {
        String savedFileName = save(file);
        FileNameDictionaryEntity entity = new FileNameDictionaryEntity();
        entity.setFileName(file.getOriginalFilename());
        entity.setSavedFileName(savedFileName);
        entity.setSize(file.getSize());
        return fileNameDictionaryRepository.save(entity);
    }


    public void replaceFile(MultipartFile file, String filename) {
        try {
            Files.copy(file.getInputStream(), path.resolve(filename), StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new CustomException(HttpStatus.CONFLICT, "duplicate", filename);
            //throw new CustomException(HttpStatus.NOT_FOUND ,"Could not store the file. Error: " + e.getMessage());
        }
    }

    public void saveFiles(List<MultipartFile> files, Integer parentId, Integer entityType) {
        if (CollectionUtils.isEmpty(files)) return;
        List<FileNameDictionaryEntity> fileNameDictionaryEntities = uploadFile(files);
        fileNameDictionaryEntities.forEach(v -> {
            v.setIsDraft(false);
            v.setParentId(parentId);
            v.setEntityType(entityType);
        });
        fileNameDictionaryRepository.saveAll(fileNameDictionaryEntities);
    }

    public void saveDraftFiles(List<FileNameDictionaryDTO> files, Integer entityId, Integer entityType) {
        if (CollectionUtils.isEmpty(files)) return;
        List<String> savedFileNames = files.stream().map(FileNameDictionaryDTO::getSavedFileName).toList();
        List<FileNameDictionaryEntity> savedFileEntities = fileNameDictionaryRepository.findBySavedFileNameInAndIsDraftTrue(savedFileNames);
        savedFileEntities.forEach(entity -> {
            if (!Files.exists(path.resolve(entity.getSavedFileName()))) {
                throw new CustomException(HttpStatus.NOT_FOUND, "file.not.found", entity.getFileName());
            }
            entity.setParentId(entityId);
            entity.setEntityType(entityType);
            entity.setIsDraft(false);
        });
        fileNameDictionaryRepository.saveAll(savedFileEntities);
    }

    public void saveDraftFile(String fileName, Integer entityId, Integer entityType) {
        FileNameDictionaryEntity savedFileEntity = fileNameDictionaryRepository.findBySavedFileNameAndIsDraftTrue(fileName);
        if (!Files.exists(path.resolve(savedFileEntity.getSavedFileName()))) {
            throw new CustomException(HttpStatus.NOT_FOUND, "file.not.found", savedFileEntity.getFileName());
        }
        savedFileEntity.setParentId(entityId);
        savedFileEntity.setEntityType(entityType);
        savedFileEntity.setIsDraft(false);
        fileNameDictionaryRepository.save(savedFileEntity);
    }

    public void deleteFiles(List<FileNameDictionaryDTO> files, Integer id, int paymentDetail) {
        if (CollectionUtils.isEmpty(files)) return;
        List<String> savedFileNames = files.stream().map(FileNameDictionaryDTO::getSavedFileName).toList();
        List<FileNameDictionaryEntity> savedFileEntities = fileNameDictionaryRepository.findBySavedFileNameInAndIsDraftTrue(savedFileNames);
        savedFileEntities.forEach(entity -> {
            if (Files.exists(path.resolve(entity.getSavedFileName()))) {
                try {
                    deleteFile(entity.getSavedFileName());
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
        fileNameDictionaryRepository.deleteAllInBatch(savedFileEntities);
    }

    public List<FileNameDictionaryDTO> getAllByEntity(Integer id, int entityType) {
        return fileNameDictionaryEntityMapper.toListDTO(fileNameDictionaryRepository.findByEntityType(id, entityType));
    }


    public void saveOrUpdateFileByParent(Integer parentId, Integer entityType, List<FileNameDictionaryDTO> fileNameDictionary) {
        if (!CollectionUtils.isEmpty(fileNameDictionary)) {
            for (FileNameDictionaryDTO fileNameDictionaryDTO : fileNameDictionary) {
                FileNameDictionaryEntity fileNameDictionaryEntity = fileNameDictionaryRepository.findBySavedFileNameAndIsDraftTrue(
                    fileNameDictionaryDTO.getSavedFileName()
                );
                if (fileNameDictionaryEntity != null) {
                    fileNameDictionaryEntity.setEntityType(entityType);
                    fileNameDictionaryEntity.setParentId(parentId);
                    fileNameDictionaryEntity.setIsDraft(false);
                    fileNameDictionaryRepository.save(fileNameDictionaryEntity);
                }
            }
        }
    }
}
