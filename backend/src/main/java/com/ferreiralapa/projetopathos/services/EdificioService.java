package com.ferreiralapa.projetopathos.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ferreiralapa.projetopathos.dto.EdificioDTO;
import com.ferreiralapa.projetopathos.entities.Edificio;
import com.ferreiralapa.projetopathos.repositories.EdificioRepository;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

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
		Edificio entity = obj.orElseThrow(() -> new ResourceNotFoundException("Edificio não encontrado!"));
		return new EdificioDTO(entity);
	}

	@Transactional
	public EdificioDTO insert(EdificioDTO dto) {
		Edificio entity = new Edificio();
		entity.setLocalizacao(dto.getLocalizacao());
		entity.setTipologia(dto.getTipologia());
		entity.setNome(dto.getNome());
		entity.setUtilizacao(dto.getUtilizacao());
		entity.setArquitetura(dto.getArquitetura());
		entity.setPiso(dto.getPiso());
		entity.setFracao(dto.getFracao());
		entity = edificioRepository.save(entity);
		return new EdificioDTO(entity);
	}

	@Transactional
	public EdificioDTO update(Long id, EdificioDTO dto) {
		try {
			Edificio entity = edificioRepository.getById(id);
			entity.setLocalizacao(dto.getLocalizacao());
			entity.setTipologia(dto.getTipologia());
			entity.setNome(dto.getNome());
			entity.setUtilizacao(dto.getUtilizacao());
			entity.setArquitetura(dto.getArquitetura());
			entity.setPiso(dto.getPiso());
			entity.setFracao(dto.getFracao());
			entity = edificioRepository.save(entity);
			return new EdificioDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

}
