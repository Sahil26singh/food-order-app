package com.cravecraft.foodorder.dto;

import com.cravecraft.foodorder.model.User;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthResponse {
    private String token;
    private User user;
}
