package com.edusasse.backendapi.model;

import java.util.Date;

import org.springframework.security.crypto.password.PasswordEncoder;

public class User {

	private String name;

	private String username;

	private String email;

	private String password;
	
	private String notifications;
	
	private Date validTo;

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void encodePassword(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.password);
	}

	public final String getNotifications() {
		return notifications;
	}

	public final void setNotifications(String notifications) {
		this.notifications = notifications;
	}

	public final Date getValidTo() {
		return validTo;
	}

	public final void setValidTo(Date validTo) {
		this.validTo = validTo;
	}

}