package com.tresdsam.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/files")
public class FileController {

    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/imagen")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(saveFile(file, "images"));
    }

    @PostMapping("/modelo")
    public ResponseEntity<String> uploadModelo(@RequestParam("file") MultipartFile file) throws IOException {
        return ResponseEntity.ok(saveFile(file, "models"));
    }

    private String saveFile(MultipartFile file, String subdir) throws IOException {
        Path dir = Paths.get(uploadPath, subdir);
        Files.createDirectories(dir);
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), dir.resolve(filename));
        return "/uploads/" + subdir + "/" + filename;
    }
}
