package pl.umg.weatherservice.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import pl.umg.weatherservice.Models.City;

public interface CityRepository extends MongoRepository<City, String> {
    
}
