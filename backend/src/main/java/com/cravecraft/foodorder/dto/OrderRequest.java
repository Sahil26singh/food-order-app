package com.cravecraft.foodorder.dto;

import com.cravecraft.foodorder.model.OrderItem;
import lombok.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
    private List<OrderItem> items;
    private Double totalAmount;
    private AddressDto address;
    private String paymentMethod;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AddressDto {
        private String fullName;
        private String phone;
        private String street;
        private String city;
        private String instructions;
    }
}
