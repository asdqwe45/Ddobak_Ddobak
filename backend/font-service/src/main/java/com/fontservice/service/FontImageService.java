package com.fontservice.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.springframework.aop.scope.ScopedProxyUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Collections;

@Service
public class FontImageService {

    @Autowired
    private RestTemplate restTemplate;
    @Autowired
    private S3Service s3Service;

    public File convertToPng(MultipartFile file) throws IOException{
        String fileExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());
        System.out.println(fileExtension);
        File tempInputFile = File.createTempFile("source","."+fileExtension);

        file.transferTo(tempInputFile);

        File tempOutputFile = File.createTempFile("converted", ".png");

        if ("png".equalsIgnoreCase(fileExtension)){
            return tempInputFile;
        } else if ("JPG".equalsIgnoreCase(fileExtension)) {
            System.out.println("JPG22");
            tempOutputFile = convertJpgToPng(tempInputFile);
        }else if("pdf".equalsIgnoreCase(fileExtension)){
            System.out.println("??");
            convertPdfToPng(tempInputFile,tempOutputFile);
        }

        return tempOutputFile;

    }

    private File convertJpgToPng(File tempInputFile) throws IOException {
        BufferedImage bufferedImage = ImageIO.read(tempInputFile);

        File outputFile = new File(tempInputFile.getParentFile(),"converted.png");
        ImageIO.write(bufferedImage,"png",outputFile);

        return outputFile;
    }

    public String getS3Url(File imageFile) {
        String fastApiUrl = "http://localhost:8000/upload";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        FileSystemResource resource = new FileSystemResource(imageFile);
        MultiValueMap<String,Object> body = new LinkedMultiValueMap<>();
        body.add("file",resource);

        HttpEntity<MultiValueMap<String,Object>> requestEntity = new HttpEntity<>(body,headers);
        ResponseEntity<byte[]> response = restTemplate.exchange(fastApiUrl, HttpMethod.POST, requestEntity,byte[].class);
        String contentType = response.getHeaders().getContentType().toString();
        String s3Url = new String();
        if ("application/x-font-ttf".equals(contentType)) {
            s3Url = s3Service.uploadFontFile(response.getBody(),"application/x-font-ttf");

        } else if ("image/png".equals(contentType)) {
            s3Url = s3Service.uploadSortFile(response.getBody(),"application/x-font-ttf");

        }

        return s3Url;
    }

    private void convertPdfToPng(File inputFile, File outputFile) throws IOException {
        String fileExtension = getExtention(inputFile.getName());
        System.out.println(getExtention(inputFile.getName()));
        BufferedImage image;


        try (PDDocument document = PDDocument.load(inputFile)) {

            PDFRenderer pdfRenderer = new PDFRenderer(document);
            image = pdfRenderer.renderImageWithDPI(0, 300);
        }

        ImageIO.write(image, "PNG", outputFile);

    }
    private String getExtention(String filename){
        String extension = StringUtils.getFilenameExtension(filename);
        return extension;
    }

}
