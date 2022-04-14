package com.ferreiralapa.projetopathos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ferreiralapa.projetopathos.entities.Edificio;

@Repository
public interface EdificioRepository extends JpaRepository<Edificio, Long> {

}
