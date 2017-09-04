package com.edusasse.backendapi.controller;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.edusasse.backendapi.Application;
import com.edusasse.backendapi.model.User;
import com.edusasse.backendapi.security.jwt.TokenProvider;
import com.edusasse.backendapi.service.UserService;

@RestController
@CrossOrigin
public class AuthController {

	private final UserService userService;

	private final TokenProvider tokenProvider;

	private final PasswordEncoder passwordEncoder;

	private final AuthenticationManager authenticationManager;

	public AuthController(PasswordEncoder passwordEncoder, UserService userService,
			TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
		this.userService = userService;
		this.tokenProvider = tokenProvider;
		this.passwordEncoder = passwordEncoder;
		this.authenticationManager = authenticationManager;

		User user = new User();
		user.setName("Mr. Super Admin");
		user.setEmail("admin@superadmin.com");
		user.setUsername("admin");
		user.setPassword(this.passwordEncoder.encode("admin"));
		this.userService.save(user);
	}
	
    @GetMapping("/authenticate")
    public void authenticate() {
    	// we don't have to do anything here
    	// this is just a secure endpoint and the JWTFilter
    	// validates the token
    	// this service is called at startup of the app to check 
    	// if the jwt token is still valid
    }

	@PostMapping("/login")
	public String authorize(@Valid @RequestBody User loginUser, HttpServletResponse response) {		
		final UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword());

		try {
			this.authenticationManager.authenticate(authenticationToken);
			final User user = this.userService.lookup(loginUser.getUsername());
			return tokenProvider.createToken(user);
		}
		catch (AuthenticationException e) {
			Application.logger.info("Security exception {}", e.getMessage());
			response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
			return null;
		}
	}
	
	@GetMapping("/user/{username}")
	public User authorize(@PathVariable("username") final String username, final HttpServletResponse response) {
		final User user = this.userService.lookup(username);
		return user;
	}
	
	@PutMapping("/user/{username}")
	public User updateUser(@PathVariable("username") final String username, @RequestBody final User user) {
		this.userService.save(user);
		return this.userService.lookup(username);
	}
	
	@PostMapping("/signup")
	public String signup(@RequestBody User signupUser) {
		if (this.userService.usernameExists(signupUser.getUsername())) {
			return "EXISTS";
		}

		signupUser.encodePassword(this.passwordEncoder);
		this.userService.save(signupUser);
		final User user = this.userService.lookup(signupUser.getUsername());
		return this.tokenProvider.createToken(user);
	}

}