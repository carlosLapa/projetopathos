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

import com.ferreiralapa.projetopathos.dto.TratamentoDTO;
import com.ferreiralapa.projetopathos.entities.Tratamento;
import com.ferreiralapa.projetopathos.repositories.TratamentoRepository;
import com.ferreiralapa.projetopathos.services.exceptions.DatabaseException;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

@Service
public class TratamentoService {

	@Autowired
	private TratamentoRepository tratamentoRepository;

	/*
	 * @Transactional(readOnly = true) public List<CausaDTO> findAll() { List<Causa>
	 * list = CausaRepository.findAll(); return list.stream().map(x -> new
	 * CausaDTO(x)).collect(Collectors.toList()); }
	 */

	@Transactional(readOnly = true)
	public Page<TratamentoDTO> findAllPaged(PageRequest pageRequest) {
		Page<Tratamento> list = tratamentoRepository.findAll(pageRequest);
		return list.map(x -> new TratamentoDTO(x));
	}

	@Transactional(readOnly = true)
	public TratamentoDTO findById(Long id) {
		Optional<Tratamento> obj = tratamentoRepository.findById(id);
		Tratamento entity = obj.orElseThrow(() -> new ResourceNotFoundException("Tratamento não encontrado!"));
		return new TratamentoDTO(entity);
	}

	@Transactional
	public TratamentoDTO insert(TratamentoDTO dto) {
		Tratamento entity = new Tratamento();
		copyDtoToEntity(dto, entity);
		entity = tratamentoRepository.save(entity);
		return new TratamentoDTO(entity);
	}

	@Transactional
	public TratamentoDTO update(Long id, TratamentoDTO dto) {
		try {
			Tratamento entity = tratamentoRepository.getById(id);
			copyDtoToEntity(dto, entity);
			entity = tratamentoRepository.save(entity);
			return new TratamentoDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

	public void delete(Long id) {
		try {
			tratamentoRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade!");
		}

	}

	private void copyDtoToEntity(TratamentoDTO dto, Tratamento entity) {
		entity.setTipologia(dto.getTipologia());
		entity.setProcedimento(dto.getProcedimento());
		entity.setDiagnostico(dto.getDiagnostico());
		entity.setProduto(dto.getProduto());
		entity.setImgUrl(dto.getImgUrl());
	}

}
