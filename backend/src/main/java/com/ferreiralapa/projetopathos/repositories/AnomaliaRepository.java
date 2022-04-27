package com.ferreiralapa.projetopathos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ferreiralapa.projetopathos.entities.Anomalia;

@Repository
public interface AnomaliaRepository extends JpaRepository<Anomalia, Long> {

}
