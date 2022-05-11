package com.ferreiralapa.projetopathos.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ferreiralapa.projetopathos.dto.RoleDTO;
import com.ferreiralapa.projetopathos.dto.UserDTO;
import com.ferreiralapa.projetopathos.dto.UserInsertDTO;
import com.ferreiralapa.projetopathos.dto.UserUpdateDTO;
import com.ferreiralapa.projetopathos.entities.Role;
import com.ferreiralapa.projetopathos.entities.User;
import com.ferreiralapa.projetopathos.repositories.RoleRepository;
import com.ferreiralapa.projetopathos.repositories.UserRepository;
import com.ferreiralapa.projetopathos.services.exceptions.DatabaseException;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

@Service
public class UserService implements UserDetailsService {

	/* Para fornecer mais info e auxiliar nos testes */
	private static Logger logger = LoggerFactory.getLogger(UserService.class);
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	/*
	 * @Transactional(readOnly = true) public List<UserDTO> findAll() { List<User>
	 * list = UserRepository.findAll(); return list.stream().map(x -> new
	 * UserDTO(x)).collect(Collectors.toList()); }
	 */

	@Transactional(readOnly = true)
	public Page<UserDTO> findAllPaged(Pageable pageable) {
		Page<User> list = userRepository.findAll(pageable);
		return list.map(x -> new UserDTO(x));
	}

	@Transactional(readOnly = true)
	public UserDTO findById(Long id) {
		Optional<User> obj = userRepository.findById(id);
		User entity = obj.orElseThrow(() -> new ResourceNotFoundException("User não encontrada!"));
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO insert(UserInsertDTO dto) {
		User entity = new User();
		copyDtoToEntity(dto, entity);
		entity.setPassword(passwordEncoder.encode(dto.getPassword()));
		entity = userRepository.save(entity);
		return new UserDTO(entity);
	}

	@Transactional
	public UserDTO update(Long id, UserUpdateDTO dto) {
		try {
			User entity = userRepository.getById(id);
			copyDtoToEntity(dto, entity);
			entity = userRepository.save(entity);
			return new UserDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

	public void delete(Long id) {
		try {
			userRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade!");
		}

	}

	private void copyDtoToEntity(UserDTO dto, User entity) {
		entity.setFirstName(dto.getFirstName());
		entity.setLastName(dto.getLastName());
		entity.setEmail(dto.getEmail());
		entity.setContact(dto.getContact());

		entity.getRoles().clear();
		for (RoleDTO roleDto : dto.getRoles()) {
			Role role = roleRepository.getById(roleDto.getId());
			entity.getRoles().add(role);
		}

	}

	/* Dado um username (email) devolve os detalhes do user */
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = userRepository.findByEmail(username);
		if (user == null) {
			logger.error("Utilizador não encontrado " + username);
			throw new UsernameNotFoundException("Utilizador não encontrado");
		}
		logger.info("Utilizador encontrado " + username);
		return user;
	}

}
