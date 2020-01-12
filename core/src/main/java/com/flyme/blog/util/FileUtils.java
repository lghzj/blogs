package com.zyd.blog.util;

import com.zyd.blog.business.enums.QiniuUploadType;
import com.zyd.blog.framework.exception.ZhydFileException;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

/**
 * @author 李贵和
 * @create 2019-01-30 15:47
 **/
public class FileUtils {
	private static final String BASE_PATH = "E:/work/demo/";
	private FileUtils(){

	}

	public static String upload(MultipartFile file, QiniuUploadType uploadType) {
		String path = BASE_PATH+uploadType.getPath()+System.currentTimeMillis()+file.getOriginalFilename();

		try {
			File dir = new File(BASE_PATH+uploadType);
			if(!dir.exists()){
				dir.mkdirs();
			}
			file.transferTo(new File(path));
		} catch (IOException e) {
			e.printStackTrace();
			throw new ZhydFileException("上传图片发生异常", e);
		}
		return path;
	}
}
