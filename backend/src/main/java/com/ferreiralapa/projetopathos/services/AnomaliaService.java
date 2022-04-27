package com.ferreiralapa.projetopathos.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ferreiralapa.projetopathos.dto.AnomaliaDTO;
import com.ferreiralapa.projetopathos.entities.Anomalia;
import com.ferreiralapa.projetopathos.repositories.AnomaliaRepository;
import com.ferreiralapa.projetopathos.services.exceptions.DatabaseException;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

@Service
public class AnomaliaService {

	@Autowired
	private AnomaliaRepository AnomaliaRepository;

	/*
	 * @Transactional(readOnly = true) public List<AnomaliaDTO> findAll() {
	 * List<Anomalia> list = AnomaliaRepository.findAll(); return
	 * list.stream().map(x -> new AnomaliaDTO(x)).collect(Collectors.toList()); }
	 */

	@Transactional(readOnly = true)
	public Page<AnomaliaDTO> findAllPaged(PageRequest pageRequest) {
		Page<Anomalia> list = AnomaliaRepository.findAll(pageRequest);
		return list.map(x -> new AnomaliaDTO(x));
	}

	@Transactional(readOnly = true)
	public AnomaliaDTO findById(Long id) {
		Optional<Anomalia> obj = AnomaliaRepository.findById(id);
		Anomalia entity = obj.orElseThrow(() -> new ResourceNotFoundException("Anomalia não encontrada!"));
		return new AnomaliaDTO(entity, entity.getEdificios());
	}

	@Transactional
	public AnomaliaDTO insert(AnomaliaDTO dto) {
		Anomalia entity = new Anomalia();
		entity.setConsequente(dto.getConsequente());
		entity.setInconsequente(dto.getInconsequente());
		entity.setDescricao(dto.getDescricao());
		entity.setDate(dto.getDate());
		// ainda falta
		entity = AnomaliaRepository.save(entity);
		return new AnomaliaDTO(entity);
	}

	@Transactional
	public AnomaliaDTO update(Long id, AnomaliaDTO dto) {
		try {
			Anomalia entity = AnomaliaRepository.getById(id);
			entity.setConsequente(dto.getConsequente());
			entity.setInconsequente(dto.getInconsequente());
			entity.setDescricao(dto.getDescricao());
			entity.setDate(dto.getDate());
			// ainda falta
			entity = AnomaliaRepository.save(entity);
			return new AnomaliaDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

	public void delete(Long id) {
		try {
			AnomaliaRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade!");
		}

	}

}
