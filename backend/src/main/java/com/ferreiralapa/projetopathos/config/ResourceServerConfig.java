package com.ferreiralapa.projetopathos.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	/* Serve só pra permitir o H2 */
	@Autowired
	private Environment env;

	@Autowired
	private JwtTokenStore tokenStore;

	/* Endpoints públicos */
	private static final String[] PUBLIC = { "/oauth/token", "/h2-console/**" };

	/*
	 * O resourceServer vai descodificar o token e analisar se o token corresponde
	 * às variaveis definidas, secret, validade, etc e se, portanto, é válido
	 */
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.tokenStore(tokenStore);
	}

	/*
	 * Configuração das rotas e respetivas permissões/restrições
	 */
	@Override
	public void configure(HttpSecurity http) throws Exception {

		// Permitir o H2
		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
			http.headers().frameOptions().disable();
		}

		http.authorizeRequests().antMatchers(PUBLIC).permitAll().anyRequest().authenticated();
	}

}
