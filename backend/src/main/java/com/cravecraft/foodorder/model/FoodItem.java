package com.cravecraft.foodorder.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "food_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private String category;

    private Double rating;

    private Integer reviewsCount;

    private String prepTime;

    @Column(length = 1000)
    private String image;

    private String tags;

    private Boolean isSpicy;

    private Boolean isVegetarian;

    private Integer calories;
}
