package com.cravecraft.foodorder.controller;

import com.cravecraft.foodorder.model.FoodItem;
import com.cravecraft.foodorder.service.FoodItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FoodItemController {

    private final FoodItemService foodItemService;

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "UP", "message", "CraveCraft Spring Boot Backend is operational!"));
    }

    @GetMapping("/food")
    public ResponseEntity<List<FoodItem>> getAllFoodItems(@RequestParam(required = false) String category) {
        if (category != null && !category.equalsIgnoreCase("all")) {
            return ResponseEntity.ok(foodItemService.getFoodItemsByCategory(category));
        }
        return ResponseEntity.ok(foodItemService.getAllFoodItems());
    }

    @GetMapping("/food/{id}")
    public ResponseEntity<FoodItem> getFoodItemById(@PathVariable Long id) {
        FoodItem item = foodItemService.getFoodItemById(id);
        if (item == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(item);
    }

    @PostMapping("/food")
    public ResponseEntity<FoodItem> createFoodItem(@RequestBody FoodItem foodItem) {
        return ResponseEntity.ok(foodItemService.saveFoodItem(foodItem));
    }

    @DeleteMapping("/food/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Long id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }
}
