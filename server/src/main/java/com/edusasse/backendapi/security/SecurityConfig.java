package com.edusasse.backendapi.security;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import com.edusasse.backendapi.security.jwt.JWTConfigurer;
import com.edusasse.backendapi.security.jwt.TokenProvider;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final TokenProvider tokenProvider;

	public SecurityConfig(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		  .csrf()
		    .disable()
		  .cors()	
		    .and()
		  .sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()
		  .authorizeRequests()
		    .antMatchers("/signup").permitAll()
		    .antMatchers("/login").permitAll()
		    .anyRequest().authenticated()
		    .and()
		  .apply(new JWTConfigurer(this.tokenProvider));
	}

}