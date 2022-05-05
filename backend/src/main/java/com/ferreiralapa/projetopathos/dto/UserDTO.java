package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.ferreiralapa.projetopathos.entities.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	
	@Size(min = 5, max= 60, message = "Nome deve ter entre 5 e 60 caracteres")
	@NotBlank(message = "Campo obrigatório")
	private String firstName;
	
	@NotBlank(message = "Campo obrigatório")
	private String lastName;
	
	@NotBlank(message = "Campo obrigatório")
	private String email;
	// private String password;
	private Integer contact;

	Set<RoleDTO> roles = new HashSet<>();

	public UserDTO() {
	}

	public UserDTO(Long id, String firstName, String lastName, String email, Integer contact) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		// this.password = password;
		this.contact = contact;
	}

	/*
	 * Neste construtor, a lista de roles é construida juntamente com o user (devido
	 * ao método EAGER implementado na entidade) depois acedemos a essa lista,
	 * percorremos e para cada um, instanciamos um RoleDTO, com o role respectivo,
	 * que inserimos na lista de roles (definida acima no Set)
	 */
	public UserDTO(User entity) {
		id = entity.getId();
		firstName = entity.getFirstName();
		lastName = entity.getLastName();
		email = entity.getEmail();
		contact = entity.getContact();
		/*
		 * password = entity.getPassword(); - Vai transitar num DTO específico para isso:
		 * - UserInsertDTO
		 */
		entity.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Integer getContact() {
		return contact;
	}

	public void setContact(Integer contact) {
		this.contact = contact;
	}

	public Set<RoleDTO> getRoles() {
		return roles;
	}

}
