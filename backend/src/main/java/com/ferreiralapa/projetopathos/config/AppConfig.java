package com.ferreiralapa.projetopathos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/* Classe responsável por manter alguma configuração, criar um componente específico, etc */

@Configuration
public class AppConfig {

	/*
	 * Anotação que serve para identificar um Componente, para instanciar e gerir a
	 * injeção desta dependência noutros componentes - neste caso é uma anotação de
	 * método.
	 * 
	 * Assim podemos injectar esta dependências noutras classes/componentes, e pode
	 * ser reconhecido e gerido pelo Spring Boot
	 */
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
