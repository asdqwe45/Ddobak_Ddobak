//package com.fontservice.service;
//
//import software.amazon.awssdk.core.sync.RequestBody;
//import software.amazon.awssdk.regions.Region;
//import software.amazon.awssdk.services.s3.S3Client;
//import software.amazon.awssdk.services.s3.model.PutObjectRequest;
//import software.amazon.awssdk.services.s3.model.PutObjectResponse;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Service;
//import java.io.InputStream;
//import java.util.UUID;
//
//@Service
//public class S3Service {
//
//    @Value("${aws.accessKeyId}")
//    private String accessKeyId;
//
//    @Value("${aws.secretKey}")
//    private String secretKey;
//
//    @Value("${aws.s3.bucket}")
//    private String bucketName;
//
//    @Value("${aws.s3.region}")
//    private String region;
//
//    public String uploadToS3(byte[] data, String contentType) {
//        S3Client s3 = S3Client.builder()
//                .region(Region.of(region))
//                .build();
//
//        String key = UUID.randomUUID().toString();
//
//        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                .bucket(bucketName)
//                .key(key)
//                .contentType(contentType)
//                .build();
//
//        s3.putObject(putObjectRequest, RequestBody.fromBytes(data));
//
//        return key; // This returns the S3 object key for future reference.
//    }
//}
package com.fontservice.service;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Service
@RequiredArgsConstructor
@Slf4j
public class S3Service {
    @Autowired
    private AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadSortFile(byte[] fileData, String mimeType) {
        String fileName = "sort-path/" + System.currentTimeMillis() + ".png";  // 파일 이름을 원하는 대로 지정

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(mimeType);
        metadata.setContentLength(fileData.length);

        InputStream inputStream = new ByteArrayInputStream(fileData);

        amazonS3.putObject(bucket, fileName, inputStream, metadata);

        // Public URL을 반환. 이 부분은 버킷 설정에 따라 변경될 수 있습니다.
        return "https://" + bucket + ".s3.amazonaws.com/" + fileName;
    }
    public String uploadFontFile(byte[] fileData, String mimeType) {
        String fileName = "font-path/" + System.currentTimeMillis() + ".ttf";  // 파일 이름을 원하는 대로 지정

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(mimeType);
        metadata.setContentLength(fileData.length);

        InputStream inputStream = new ByteArrayInputStream(fileData);

        amazonS3.putObject(bucket, fileName, inputStream, metadata);

        // Public URL을 반환. 이 부분은 버킷 설정에 따라 변경될 수 있습니다.
        return "https://" + bucket + ".s3.amazonaws.com/" + fileName;
    }
}
