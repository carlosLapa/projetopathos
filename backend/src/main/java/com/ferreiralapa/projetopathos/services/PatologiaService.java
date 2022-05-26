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

import com.ferreiralapa.projetopathos.dto.PatologiaDTO;
import com.ferreiralapa.projetopathos.entities.Patologia;
import com.ferreiralapa.projetopathos.repositories.PatologiaRepository;
import com.ferreiralapa.projetopathos.services.exceptions.DatabaseException;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

@Service
public class PatologiaService {

	@Autowired
	private PatologiaRepository patologiaRepository;

	/*
	 * @Transactional(readOnly = true) public List<CausaDTO> findAll() { List<Causa>
	 * list = CausaRepository.findAll(); return list.stream().map(x -> new
	 * CausaDTO(x)).collect(Collectors.toList()); }
	 */

	@Transactional(readOnly = true)
	public Page<PatologiaDTO> findAllPaged(PageRequest pageRequest) {
		Page<Patologia> list = patologiaRepository.findAll(pageRequest);
		return list.map(x -> new PatologiaDTO(x));
	}

	@Transactional(readOnly = true)
	public PatologiaDTO findById(Long id) {
		Optional<Patologia> obj = patologiaRepository.findById(id);
		Patologia entity = obj.orElseThrow(() -> new ResourceNotFoundException("Patologia não encontrada!"));
		return new PatologiaDTO(entity);
	}

	@Transactional
	public PatologiaDTO insert(PatologiaDTO dto) {
		Patologia entity = new Patologia();
		copyDtoToEntity(dto, entity);
		entity = patologiaRepository.save(entity);
		return new PatologiaDTO(entity);
	}

	@Transactional
	public PatologiaDTO update(Long id, PatologiaDTO dto) {
		try {
			Patologia entity = patologiaRepository.getById(id);
			copyDtoToEntity(dto, entity);
			entity = patologiaRepository.save(entity);
			return new PatologiaDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

	public void delete(Long id) {
		try {
			patologiaRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade!");
		}

	}

	private void copyDtoToEntity(PatologiaDTO dto, Patologia entity) {
		entity.setTipologia(dto.getTipologia());
		entity.setDano(dto.getDano());
		entity.setDescricao(dto.getDescricao());
		entity.setImgUrl(dto.getImgUrl());
		entity.setDate(dto.getDate());
		
	}

}
