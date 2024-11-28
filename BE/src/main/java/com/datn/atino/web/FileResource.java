package com.datn.atino.web;


import com.datn.atino.domain.FileNameDictionaryEntity;
import com.datn.atino.service.FileStorageService;
import com.datn.atino.service.respone.CommonResponse;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class FileResource {

    private final FileStorageService fileStorageService;


    public FileResource(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    @GetMapping("/assets/{filename:.+}")
    @ResponseBody
    public ResponseEntity<ByteArrayResource> getFile(@PathVariable String filename) throws IOException {
        return fileStorageService.previewFile(filename);
    }

    @GetMapping("/api/assets/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        Resource file = fileStorageService.load(filename);

        return ResponseEntity
            .ok()
            .header(HttpHeaders.CONTENT_DISPOSITION , "attachment; filename=\"" + file.getFilename() + "\"")
                .contentType(MediaType.ALL)
            .body(file);
    }

    @PostMapping("/api/assets/upload-file")
    public CommonResponse uploadFiles(@RequestPart("files") List<MultipartFile> files) {
        return new CommonResponse()
            .success("Tải file lên thành công, hãy thêm mới/cập nhật để ghi nhận!")
            .data(fileStorageService.uploadFile(files));
    }

    @PostMapping("/api/assets/upload-file-one")
    public FileNameDictionaryEntity uploadFilesOne(@RequestPart("file") MultipartFile files) {
        return fileStorageService.uploadFile(files);
    }




    @DeleteMapping("/api/assets/delete/{fileName}")
    public CommonResponse deleteFile(@PathVariable("fileName") String fileName) throws IOException {
        return new CommonResponse().success().data(fileStorageService.deleteFile(fileName));
    }


}
