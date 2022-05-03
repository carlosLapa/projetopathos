package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;

import com.ferreiralapa.projetopathos.entities.Role;

public class RoleDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String authority;

	public RoleDTO() {
	}

	public RoleDTO(Long id, String authority) {
		this.id = id;
		this.authority = authority;
	}

	/*
	 * Este construtor vai ser utilizado num construtor no User, para que seja lá
	 * povoada a lista de roles
	 */
	public RoleDTO(Role role) {
		id = role.getId();
		authority = role.getAuthority();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

}
