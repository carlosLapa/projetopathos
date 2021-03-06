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
import com.ferreiralapa.projetopathos.dto.EdificioDTO;
import com.ferreiralapa.projetopathos.entities.Anomalia;
import com.ferreiralapa.projetopathos.entities.Edificio;
import com.ferreiralapa.projetopathos.repositories.AnomaliaRepository;
import com.ferreiralapa.projetopathos.repositories.EdificioRepository;
import com.ferreiralapa.projetopathos.services.exceptions.DatabaseException;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

@Service
public class AnomaliaService {

	@Autowired
	private AnomaliaRepository anomaliaRepository;

	@Autowired
	private EdificioRepository edificioRepository;

	/*
	 * @Transactional(readOnly = true) public List<AnomaliaDTO> findAll() {
	 * List<Anomalia> list = AnomaliaRepository.findAll(); return
	 * list.stream().map(x -> new AnomaliaDTO(x)).collect(Collectors.toList()); }
	 */

	@Transactional(readOnly = true)
	public Page<AnomaliaDTO> findAllPaged(PageRequest pageRequest) {
		Page<Anomalia> list = anomaliaRepository.findAll(pageRequest);
		return list.map(x -> new AnomaliaDTO(x));
	}

	@Transactional(readOnly = true)
	public AnomaliaDTO findById(Long id) {
		Optional<Anomalia> obj = anomaliaRepository.findById(id);
		Anomalia entity = obj.orElseThrow(() -> new ResourceNotFoundException("Anomalia não encontrada!"));
		return new AnomaliaDTO(entity, entity.getEdificios());
	}

	@Transactional
	public AnomaliaDTO insert(AnomaliaDTO dto) {
		Anomalia entity = new Anomalia();
		copyDtoToEntity(dto, entity);
		entity = anomaliaRepository.save(entity);
		return new AnomaliaDTO(entity);
	}

	@Transactional
	public AnomaliaDTO update(Long id, AnomaliaDTO dto) {
		try {
			Anomalia entity = anomaliaRepository.getById(id);
			copyDtoToEntity(dto, entity);
			entity = anomaliaRepository.save(entity);
			return new AnomaliaDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

	public void delete(Long id) {
		try {
			anomaliaRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade!");
		}

	}

	private void copyDtoToEntity(AnomaliaDTO dto, Anomalia entity) {
		entity.setConsequente(dto.getConsequente());
		entity.setInconsequente(dto.getInconsequente());
		entity.setDescricao(dto.getDescricao());
		entity.setDate(dto.getDate());
		/*
		 * Para garantir que compiamos somente as edificios que vêm no dto, efetuamos um
		 * clear, para limpar os edificios que podem estar na entidade Assim, associamos
		 * edificio (entidades) dentro da entidade anomalia
		 */
		entity.getEdificios().clear();
		for (EdificioDTO edificioDto : dto.getEdificios()) {
			Edificio edificio = edificioRepository.getById(edificioDto.getId());
			entity.getEdificios().add(edificio);
		}

	}

}
