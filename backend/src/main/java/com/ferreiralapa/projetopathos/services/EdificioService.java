package com.ferreiralapa.projetopathos.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ferreiralapa.projetopathos.entities.Edificio;
import com.ferreiralapa.projetopathos.repositories.EdificioRepository;

@Service
public class EdificioService {

	@Autowired
	private EdificioRepository edificioRepository;

	@Transactional(readOnly = true)
	public List<Edificio> findAll() {
		return edificioRepository.findAll();
	}

}
