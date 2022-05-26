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
import com.ferreiralapa.projetopathos.dto.CausaDTO;
import com.ferreiralapa.projetopathos.entities.Anomalia;
import com.ferreiralapa.projetopathos.entities.Causa;
import com.ferreiralapa.projetopathos.repositories.AnomaliaRepository;
import com.ferreiralapa.projetopathos.repositories.CausaRepository;
import com.ferreiralapa.projetopathos.services.exceptions.DatabaseException;
import com.ferreiralapa.projetopathos.services.exceptions.ResourceNotFoundException;

@Service
public class CausaService {

	@Autowired
	private CausaRepository causaRepository;

	@Autowired
	private AnomaliaRepository anomaliaRepository;

	/*
	 * @Transactional(readOnly = true) public List<CausaDTO> findAll() { List<Causa>
	 * list = CausaRepository.findAll(); return list.stream().map(x -> new
	 * CausaDTO(x)).collect(Collectors.toList()); }
	 */

	@Transactional(readOnly = true)
	public Page<CausaDTO> findAllPaged(PageRequest pageRequest) {
		Page<Causa> list = causaRepository.findAll(pageRequest);
		return list.map(x -> new CausaDTO(x));
	}

	@Transactional(readOnly = true)
	public CausaDTO findById(Long id) {
		Optional<Causa> obj = causaRepository.findById(id);
		Causa entity = obj.orElseThrow(() -> new ResourceNotFoundException("Causa não encontrada!"));
		return new CausaDTO(entity, entity.getAnomalias());
	}

	@Transactional
	public CausaDTO insert(CausaDTO dto) {
		Causa entity = new Causa();
		copyDtoToEntity(dto, entity);
		entity = causaRepository.save(entity);
		return new CausaDTO(entity);
	}

	@Transactional
	public CausaDTO update(Long id, CausaDTO dto) {
		try {
			Causa entity = causaRepository.getById(id);
			copyDtoToEntity(dto, entity);
			entity = causaRepository.save(entity);
			return new CausaDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		}

	}

	public void delete(Long id) {
		try {
			causaRepository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("id não encontrado! " + id + "");
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Violação de integridade!");
		}

	}

	private void copyDtoToEntity(CausaDTO dto, Causa entity) {
		entity.setTipologia(dto.getTipologia());
		entity.setDescricao(dto.getDescricao());

		/*
		 * Para garantir que compiamos somente as anomalias que vêm no dto, efetuamos um
		 * clear, para limpar as anomalias que podem estar na entidade. Depois,
		 * associamos anomalias (entidades) dentro da entidade anomalia
		 */
		entity.getAnomalias().clear();

		for (AnomaliaDTO anomaliaDto : dto.getAnomalias()) {
			Anomalia anomalia = anomaliaRepository.getById(anomaliaDto.getId());
			entity.getAnomalias().add(anomalia);
		}

	}

}
