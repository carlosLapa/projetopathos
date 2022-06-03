package com.ferreiralapa.projetopathos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ferreiralapa.projetopathos.entities.Tratamento;

@Repository
public interface TratamentoRepository extends JpaRepository<Tratamento, Long> {

}
