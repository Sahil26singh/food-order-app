package com.cravecraft.foodorder.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String orderId;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    @Column(nullable = false)
    private Double totalAmount;

    private String customerName;

    private String customerPhone;

    private String streetAddress;

    private String city;

    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    private LocalDateTime createdAt;

    private Integer estimatedMinutes;

    private String driverName;

    private String driverPhone;

    private String driverVehicle;
}
