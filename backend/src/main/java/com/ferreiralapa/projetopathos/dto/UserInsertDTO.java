package com.ferreiralapa.projetopathos.dto;

import com.ferreiralapa.projetopathos.services.validation.UserInsertValid;

/*
 * Esta anotação vai processar a verificação, na BD, relativo ao email do utilizador
 * */
@UserInsertValid
public class UserInsertDTO extends UserDTO {
	private static final long serialVersionUID = 1L;

	private String password;

	public UserInsertDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
