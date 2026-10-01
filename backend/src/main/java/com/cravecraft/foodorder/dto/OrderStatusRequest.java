package com.cravecraft.foodorder.dto;

import com.cravecraft.foodorder.model.OrderStatus;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatusRequest {
    private OrderStatus status;
}
