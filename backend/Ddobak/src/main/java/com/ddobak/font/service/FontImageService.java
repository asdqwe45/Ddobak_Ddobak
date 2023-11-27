package com.ddobak.font.service;

import com.ddobak.font.dto.request.MakeFontRequest;
import com.ddobak.security.util.LoginInfo;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.io.File;
import java.io.IOException;

@Service
public interface FontImageService {

    String processAndUploadImages(List<MultipartFile> files) throws IOException;

    byte[] createZipFromUrls(String reqUrl) throws IOException;

    String createFont(MakeFontRequest req) throws IOException;
}

