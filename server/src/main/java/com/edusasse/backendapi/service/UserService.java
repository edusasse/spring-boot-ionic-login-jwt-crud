package com.edusasse.backendapi.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.edusasse.backendapi.model.User;

@Service
public class UserService {

	private final Map<String, User> db;

	public UserService() {
		this.db = new ConcurrentHashMap<>();
	}

	public User lookup(String username) {
		return this.db.get(username);
	}

	public User save(User user) {
		return this.db.put(user.getUsername(), user);
	}

	public boolean usernameExists(String username) {
		return this.db.containsKey(username);
	}
}