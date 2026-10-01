package com.cravecraft.foodorder.controller;

import com.cravecraft.foodorder.dto.OrderRequest;
import com.cravecraft.foodorder.dto.OrderStatusRequest;
import com.cravecraft.foodorder.model.Order;
import com.cravecraft.foodorder.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderRequest request) {
        return ResponseEntity.ok(orderService.createOrder(request));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderByOrderId(@PathVariable String orderId) {
        Order order = orderService.getOrderByOrderId(orderId);
        if (order == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @RequestBody OrderStatusRequest request) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, request.getStatus()));
    }
}
