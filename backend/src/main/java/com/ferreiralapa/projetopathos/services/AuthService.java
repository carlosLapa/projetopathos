package com.ferreiralapa.projetopathos.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ferreiralapa.projetopathos.entities.User;
import com.ferreiralapa.projetopathos.repositories.UserRepository;
import com.ferreiralapa.projetopathos.services.exceptions.ForbiddenException;
import com.ferreiralapa.projetopathos.services.exceptions.UnauthorizedException;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;

	@Transactional(readOnly = true)
	public User authenticated() {
		try {
			// Essa chamada estática, busca o nome do user que já foi reconhecido pelo Spring Security
			String username = SecurityContextHolder.getContext().getAuthentication().getName();
			return userRepository.findByEmail(username);
		} catch (Exception e) {
			throw new UnauthorizedException("Invalid User");
		}
	}

	public void validateSelfOrAdmin(Long userId) {
		User user = authenticated();
		if (!user.getId().equals(userId) && !user.hasRole("ROLE_ADMIN")) {
			throw new ForbiddenException("Access denied");
		}
	}

}
