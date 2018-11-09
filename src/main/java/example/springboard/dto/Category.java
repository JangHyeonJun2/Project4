package example.springboard.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
public class Category {
    @Setter @Getter
    private Long id;
    @Setter @Getter
    private String name;
}
