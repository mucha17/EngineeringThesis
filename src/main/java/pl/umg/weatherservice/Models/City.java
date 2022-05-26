package pl.umg.weatherservice.Models;


import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document("cities")
public class City {
    @Id
    private String id;
    @NonNull
    private String name;
    @NonNull
    private String apiCallLink;
    private List<Weather> weather;

    public City(String name, String apiCallLink) {
        this.name = name;
        this.apiCallLink = apiCallLink;
        this.weather = new ArrayList<>();
    }
}
