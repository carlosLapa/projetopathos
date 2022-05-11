package com.ferreiralapa.projetopathos.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

/* Classe responsável por manter alguma configuração, criar um componente específico, etc */

@Configuration
public class AppConfig {

	@Value("${jwt.secret}")
	private String jwtSecret;
	
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
	
	/* Beans de Segurança - Tokens 
	 * Objetos que acedem ao token JWT - Ler, descodificar e criar um
	 * No 1o bean, registamos a nossa assinatura - signature key - na conversão do token
	 * No 2o bean, acede ao token e passamos como argumento o tokenConverter de cima
	 * Depois injetamos estes 2 beans no Authorization Server
	 * */
	
	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		JwtAccessTokenConverter tokenConverter = new JwtAccessTokenConverter();
		tokenConverter.setSigningKey(jwtSecret);
		return tokenConverter;
	}

	@Bean
	public JwtTokenStore tokenStore() {
		return new JwtTokenStore(accessTokenConverter());
	}

}
