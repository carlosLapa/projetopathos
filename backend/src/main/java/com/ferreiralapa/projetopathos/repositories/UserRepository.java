package com.ferreiralapa.projetopathos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ferreiralapa.projetopathos.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}
