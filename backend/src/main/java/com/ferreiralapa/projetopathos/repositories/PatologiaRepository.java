package com.ferreiralapa.projetopathos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ferreiralapa.projetopathos.entities.Patologia;

@Repository
public interface PatologiaRepository extends JpaRepository<Patologia, Long> {

}
