package com.ddobak.global.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ddobak.global.exception.ErrorCode;
import com.ddobak.global.exception.S3Exception;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class S3Service {

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private final AmazonS3 amazonS3;

    public String uploadFile(MultipartFile file) {
        String fileName = createFileName(file.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try (InputStream inputStream = file.getInputStream()) {
            amazonS3.putObject(
                new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata));
        } catch (IOException e) {
            throw new S3Exception(ErrorCode.UPLOAD_FAIL);
        }

        return fileName;
    }


    public void deleteFile(String fileName) {
        amazonS3.deleteObject(new DeleteObjectRequest(bucketName, fileName));
    }

    private String createFileName(String fileName) {
        return UUID.randomUUID()
                   .toString()
                   .concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new S3Exception(ErrorCode.UPLOAD_FAIL);
        }
    }

    public String uploadSortFile(byte[] fileData, String mimeType) {
        String fileName = "sort-path/" + System.currentTimeMillis() + ".png";  // 파일 이름을 원하는 대로 지정

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(mimeType);
        metadata.setContentLength(fileData.length);

        InputStream inputStream = new ByteArrayInputStream(fileData);

        amazonS3.putObject(bucketName, fileName, inputStream, metadata);

        // Public URL을 반환. 이 부분은 버킷 설정에 따라 변경될 수 있습니다.
        return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
    }
    public String uploadFontFile(byte[] fileData, String mimeType) {
        String fileName = "font-path/" + System.currentTimeMillis() + ".ttf";  // 파일 이름을 원하는 대로 지정

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(mimeType);
        metadata.setContentLength(fileData.length);

        InputStream inputStream = new ByteArrayInputStream(fileData);

        amazonS3.putObject(bucketName, fileName, inputStream, metadata);

        // Public URL을 반환. 이 부분은 버킷 설정에 따라 변경될 수 있습니다.
        return "https://" + bucketName + ".s3.amazonaws.com/" + fileName;
    }

}
