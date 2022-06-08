package com.ferreiralapa.projetopathos.services.exceptions;

public class ForbiddenException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	// Para retornar o erro 403 - Forbidden

	public ForbiddenException(String msg) {
		super(msg);

	}

}
