package com.ferreiralapa.projetopathos.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ferreiralapa.projetopathos.entities.Edificio;
import com.ferreiralapa.projetopathos.entities.Anomalia;

@Repository
public interface EdificioRepository extends JpaRepository<Edificio, Long> {
    
    @Query("SELECT DISTINCT obj FROM Edificio obj INNER JOIN obj.anomalias anoms WHERE "
            + "(COALESCE(:anomalias) IS NULL OR anoms IN :anomalias) AND "
            + "(LOWER(obj.name) LIKE LOWER(CONCAT('%',:name,'%'))) ")
    Page<Edificio> find(List<Anomalia> anomalias, String name, Pageable pageable);
    
    @Query("SELECT obj FROM Edificio obj JOIN FETCH obj.anomalias WHERE obj IN :edificios")
    List<Edificio> findEdificiosWithAnomalias(List<Edificio> edificios);

}
