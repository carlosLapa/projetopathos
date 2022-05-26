package com.ferreiralapa.projetopathos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ferreiralapa.projetopathos.entities.Causa;

@Repository
public interface CausaRepository extends JpaRepository<Causa, Long> {

}
