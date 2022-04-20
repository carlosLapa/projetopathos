package com.ferreiralapa.projetopathos.services.exceptions;

public class DatabaseException extends RuntimeException {
	private static final long serialVersionUID = 1L;

	/*
	 * No "super", passamos o argumento para o construtor da "superclass" - neste
	 * caso RuntimeException
	 */
	public DatabaseException(String msg) {
		super(msg);

	}

}
