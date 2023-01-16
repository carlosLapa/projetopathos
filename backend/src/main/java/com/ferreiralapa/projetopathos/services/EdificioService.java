package com.ferreiralapa.projetopathos.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ferreiralapa.projetopathos.dto.AnomaliaDTO;
import com.ferreiralapa.projetopathos.dto.EdificioDTO;
import com.ferreiralapa.projetopathos.entities.Anomalia;
import com.ferreiralapa.projetopathos.entities.Edificio;
import com.ferreiralapa.projetopathos.repositories.AnomaliaRepository;
import com.ferreiralapa.projetopathos.repositories.EdificioRepository;
import com.ferreiralapa.projetopathos.services.exceptions.DatabaseException;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

@Service
public class EdificioService {

	@Autowired
	private EdificioRepository edificioRepository;

	@Autowired
	private AnomaliaRepository anomaliaRepository;

	/*
	 * @Transactional(readOnly = true) public List<EdificioDTO> findAll() {
	 * List<Edificio> list = edificioRepository.findAll(); return
	 * list.stream().map(x -> new EdificioDTO(x)).collect(Collectors.toList()); }
	 */
	
	@Transactional(readOnly = true)
    public Page<EdificioDTO> findAllPaged(Long categoryId, String nome, Pageable pageable) {
        List<Anomalia> categories = (categoryId == 0) ? null : Arrays.asList(anomaliaRepository.getById(categoryId));
        Page<Edificio> page = edificioRepository.find(categories, nome, pageable);
        edificioRepository.findEdificiosWithAnomalias(page.getContent());
        return page.map(x -> new EdificioDTO(x, x.getAnomalias()));
    }

	@Transactional(readOnly = true)
	public EdificioDTO findById(Long id) {
		Optional<Edificio> obj = edificioRepository.findById(id);
		Edificio entity = obj.orElseThrow(() -> new ResourceNotFoundException("Edificio não encontrado!"));
		return new EdificioDTO(entity, entity.getAnomalias());
	}

	@Transactional
	public EdificioDTO insert(EdificioDTO dto) {
		Edificio entity = new Edificio();
		copyDtoToEntity(dto, entity);
		entity = edificioRepository.save(entity);
		return new EdificioDTO(entity);
	}

	@Transactional
	public EdificioDTO update(Long id, EdificioDTO dto) {
		try {
			Edificio entity = edificioRepository.getById(id);
			copyDtoToEntity(dto, entity);
			entity = edificioRepository.save(entity);
			return new EdificioDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

	public void delete(Long id) {
		try {
			edificioRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade!");
		}

	}

	private void copyDtoToEntity(EdificioDTO dto, Edificio entity) {
		entity.setLocalizacao(dto.getLocalizacao());
		entity.setTipologia(dto.getTipologia());
		entity.setNome(dto.getNome());
		entity.setUtilizacao(dto.getUtilizacao());
		entity.setArquitetura(dto.getArquitetura());
		entity.setPiso(dto.getPiso());
		entity.setFracao(dto.getFracao());
		entity.setImgUrl(dto.getImgUrl());
		entity.setDate(dto.getDate());
		entity.setCreatedAt(dto.getCreatedAt());

		entity.getAnomalias().clear();
		for (AnomaliaDTO anomaliaDto : dto.getAnomalias()) {
			Anomalia anomalia = anomaliaRepository.getById(anomaliaDto.getId());
			entity.getAnomalias().add(anomalia);
		}

	}

}
