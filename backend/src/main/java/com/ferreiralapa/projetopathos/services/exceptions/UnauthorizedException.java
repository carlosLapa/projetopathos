package com.ferreiralapa.projetopathos.services.exceptions;

public class UnauthorizedException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	// Para retornar o erro 401 - Unauthorized
	
	public UnauthorizedException(String msg) {
		super(msg);

	}

}
