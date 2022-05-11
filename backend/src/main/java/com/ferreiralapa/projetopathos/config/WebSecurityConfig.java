package com.ferreiralapa.projetopathos.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private UserDetailsService userDetailService;

	/*
	 * Temos q configurar qual é o algoritmo de encriptação de senha -
	 * BCryptPasswordEncoder e o serviço UserDetailsService. Assim o Spring Security
	 * já "sabe" como vai buscar o user por email e como vai ter que analisar a
	 * password encriptada - (razão das 2 classes injectadas)
	 * 
	 */
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailService).passwordEncoder(passwordEncoder);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		/* "libertar" todos os endpoints */
		web.ignoring().antMatchers("/actuator/**");
	}

	/*
	 * Aqui temos de declarar este método explicitamente, para que o
	 * AuthenticationManager seja também um componente disponivel ao sistema Então
	 * já estamos a fazê-lo desde logo com a anotação Bean (tivemos que fazer o
	 * Override para fazer isso)
	 */
	@Override
	@Bean
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

}
