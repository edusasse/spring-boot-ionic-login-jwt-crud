package com.edusasse.backendapi.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Crud implements Serializable {

	private static final long serialVersionUID = -2947634901193009506L;

	@Id
    @GeneratedValue
    private Long id;
    private String name;

    public Crud() {
    }

    public Crud(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "CRUD{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
