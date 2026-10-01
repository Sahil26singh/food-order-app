package com.cravecraft.foodorder.service;

import com.cravecraft.foodorder.dto.OrderRequest;
import com.cravecraft.foodorder.model.Order;
import com.cravecraft.foodorder.model.OrderStatus;
import com.cravecraft.foodorder.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final Random random = new Random();

    public Order createOrder(OrderRequest request) {
        String generatedOrderId = "ORD-" + (100000 + random.nextInt(900000));

        Order order = Order.builder()
                .orderId(generatedOrderId)
                .items(request.getItems())
                .totalAmount(request.getTotalAmount())
                .customerName(request.getAddress() != null ? request.getAddress().getFullName() : "Valued Customer")
                .customerPhone(request.getAddress() != null ? request.getAddress().getPhone() : "")
                .streetAddress(request.getAddress() != null ? request.getAddress().getStreet() : "")
                .city(request.getAddress() != null ? request.getAddress().getCity() : "")
                .paymentMethod(request.getPaymentMethod())
                .status(OrderStatus.PLACED)
                .createdAt(LocalDateTime.now())
                .estimatedMinutes(25)
                .driverName("Alex Rivers")
                .driverPhone("+1 (555) 234-5678")
                .driverVehicle("Electric Scooter (Plate: SF-892)")
                .build();

        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderByOrderId(String orderId) {
        return orderRepository.findByOrderId(orderId).orElse(null);
    }

    public Order updateOrderStatus(Long id, OrderStatus newStatus) {
        Order order = orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }
}
