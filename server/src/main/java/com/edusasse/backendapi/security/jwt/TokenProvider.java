package com.edusasse.backendapi.security.jwt;

import java.io.IOException;
import java.util.Base64;
import java.util.Date;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import com.edusasse.backendapi.AppConfig;
import com.edusasse.backendapi.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;

@Component
public class TokenProvider {

	private final String secretKey;

	private final long tokenValidityInMilliseconds;

	private final UserDetailsService userService;

	public TokenProvider(AppConfig config, UserDetailsService userService) {
		this.secretKey = Base64.getEncoder()
				.encodeToString(config.getSecret().getBytes());
		this.tokenValidityInMilliseconds = 1000 * config.getTokenValidityInSeconds();
		this.userService = userService;
	}

	public String createToken(User user) {
		String result = null;
		Date now = new Date();
		Date validity = new Date(now.getTime() + this.tokenValidityInMilliseconds);

		try {
			result = Jwts.builder().setId(UUID.randomUUID().toString())
					.setSubject(new ObjectMapper().writeValueAsString(user)).setIssuedAt(now)
					.signWith(SignatureAlgorithm.HS512, this.secretKey).setExpiration(validity)
					.compact();
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
		return result;
	}

	public Authentication getAuthentication(String token) {
		final Jws<Claims> parseClaimsJws = Jwts.parser().setSigningKey(this.secretKey).parseClaimsJws(token);
		User user = null;
		try {
			user = new ObjectMapper().readValue(parseClaimsJws.getBody().getSubject(), User.class);
		} catch (MalformedJwtException | SignatureException | IllegalArgumentException | IOException e) {
			e.printStackTrace();
		}
		final UserDetails userDetails = this.userService.loadUserByUsername(user.getUsername());

		return new UsernamePasswordAuthenticationToken(userDetails, "",	userDetails.getAuthorities());
	}

}