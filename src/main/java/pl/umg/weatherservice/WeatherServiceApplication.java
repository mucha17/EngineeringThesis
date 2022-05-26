package pl.umg.weatherservice;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import lombok.RequiredArgsConstructor;
import pl.umg.weatherservice.Models.City;
import pl.umg.weatherservice.Models.Weather;
import pl.umg.weatherservice.Repositories.CityRepository;

@EnableScheduling
@RequiredArgsConstructor
@SpringBootApplication
public class WeatherServiceApplication {

	private final CityRepository cityRepository;

	private final CloseableHttpClient httpClient = HttpClients.createDefault();
	public static void main(String[] args) {
		SpringApplication.run(WeatherServiceApplication.class, args);
	}

	@Scheduled(cron = "0 1 * * * ?")
	public void scheduledTask() throws IOException {
		List<City> cities = this.cityRepository.findAll();
		for(City city : cities) {
			try {
            	HttpGet request = new HttpGet(city.getApiCallLink());
				System.out.println(city.getApiCallLink());
				try (CloseableHttpResponse response = httpClient.execute(request)) {
					System.out.println(response.getStatusLine().toString());
					HttpEntity entity = response.getEntity();
					Header headers = entity.getContentType();
					System.out.println(headers);
					if (entity != null) {
						ObjectMapper objectMapper = new ObjectMapper();
						Weather parser = objectMapper.readValue(EntityUtils.toString(entity), Weather.class);
						city.getWeather().add(parser);
						System.out.println(parser.getCurrent().getCondition().getText() + " " + parser.getLocation().getName());
					}
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		this.cityRepository.saveAll(cities);
	}
}
