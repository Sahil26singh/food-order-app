package com.cravecraft.foodorder.service;

import com.cravecraft.foodorder.model.FoodItem;
import com.cravecraft.foodorder.repository.FoodItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FoodItemService {

    private final FoodItemRepository foodItemRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public List<FoodItem> getFoodItemsByCategory(String category) {
        return foodItemRepository.findByCategory(category);
    }

    public FoodItem getFoodItemById(Long id) {
        return foodItemRepository.findById(id).orElse(null);
    }

    public FoodItem saveFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public void deleteFoodItem(Long id) {
        foodItemRepository.deleteById(id);
    }
}
