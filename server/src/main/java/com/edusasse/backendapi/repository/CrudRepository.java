package com.edusasse.backendapi.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.edusasse.backendapi.model.Crud;

public interface CrudRepository extends JpaRepository<Crud, Long> {
}
