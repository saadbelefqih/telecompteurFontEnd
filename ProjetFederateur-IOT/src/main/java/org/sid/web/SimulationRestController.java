package org.sid.web;



import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin("*")
public class SimulationRestController {
	
	
	@GetMapping(path = "/getImageFromResource",produces = MediaType.IMAGE_JPEG_VALUE)
	public byte[] getImageFromResource() throws IOException {
	      int random_int = (int)Math.floor(Math.random()*(6-1+1)+1);
	      String imgName = "img"+random_int+".jpg";
		File file = new File(System.getProperty("user.home")+"/images/"+imgName);
		Path path = Paths.get(file.toURI());
		return Files.readAllBytes(path);
	}
	
	
	@GetMapping(path = "/simulationData")
	public ResponseEntity<InputStreamResource> simulationData() throws IOException {
//		for(int i = 0 ; i<100 ; i++) {
			
			RestTemplate restTemplate = new RestTemplate();
			String getImage  = "http://localhost:80/getImageFromResource";
			ResponseEntity<byte[]> response  = restTemplate.getForEntity(getImage, byte[].class);
			HttpStatus staus = response.getStatusCode();
			byte[] body = response.getBody();
			InputStream inputStream = new ByteArrayInputStream(body);
			InputStreamResource inputStreamResource = new InputStreamResource(inputStream);

			return ResponseEntity.ok().eTag("img").contentLength(response.getBody().length).contentType(MediaType.IMAGE_JPEG).body(inputStreamResource);

//		}
	}
	
	protected static ClientHttpRequestFactory clientHttpRequestFactory() {
		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
		factory.setReadTimeout(200000);
		factory.setConnectTimeout(200000);
		return factory;
	}


}
