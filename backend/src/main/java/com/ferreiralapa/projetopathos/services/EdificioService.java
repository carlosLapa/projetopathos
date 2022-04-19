package com.ferreiralapa.projetopathos.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ferreiralapa.projetopathos.dto.EdificioDTO;
import com.ferreiralapa.projetopathos.entities.Edificio;
import com.ferreiralapa.projetopathos.repositories.EdificioRepository;
import com.ferreiralapa.projetopathos.services.exceptions.EntityNotFoundException;

@Service
public class EdificioService {

	@Autowired
	private EdificioRepository edificioRepository;

	@Transactional(readOnly = true)
	public List<EdificioDTO> findAll() {
		List<Edificio> list = edificioRepository.findAll();
		return list.stream().map(x -> new EdificioDTO(x)).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public EdificioDTO findById(Long id) {
		Optional<Edificio> obj = edificioRepository.findById(id);
		Edificio entity = obj.orElseThrow(() -> new EntityNotFoundException("Edificio não encontrado!"));
		return new EdificioDTO(entity);
	}

}
