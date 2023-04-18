package com.ferreiralapa.projetopathos.services;

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

import requestModels.AddAnomaliaRequest;

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
    public Page<AnomaliaDTO> findAllPaged(Pageable pageable) {
        Page<Anomalia> list = anomaliaRepository.findAll(pageable);
        return list.map(x -> new AnomaliaDTO(x));
    }

    @Transactional(readOnly = true)
    public AnomaliaDTO findById(Long id) {
        Optional<Anomalia> obj = anomaliaRepository.findById(id);
        Anomalia entity = obj.orElseThrow(() -> new ResourceNotFoundException("Anomalia não encontrada!"));
        return new AnomaliaDTO(entity, entity.getEdificios());
    }

//	@Transactional
//	public AnomaliaDTO insert(AnomaliaDTO dto) {
//		Anomalia entity = new Anomalia();
//		copyDtoToEntity(dto, entity);
//		entity = anomaliaRepository.save(entity);
//		return new AnomaliaDTO(entity);
//	}

// Método que podemos eventualmente eliminar, pois fizemos outro que compreende o upload de imagens
// e está mais adequado	(ver abaixo linha 133)
//    public AnomaliaDTO insert(AnomaliaDTO dto) {
//        Anomalia entity = new Anomalia();
//        entity.setDescricao(dto.getDescricao());
//        copyDtoToEntity(dto, entity);
//        entity = anomaliaRepository.save(entity);
//        return new AnomaliaDTO(entity);
//    }

//	@Transactional
//	public AnomaliaDTO update(Long id, AnomaliaDTO dto) {
//		try {
//			Anomalia entity = anomaliaRepository.getById(id);
//			copyDtoToEntity(dto, entity);
//			entity = anomaliaRepository.save(entity);
//			return new AnomaliaDTO(entity);
//		} catch (EntityNotFoundException e) {
//			throw new ResourceNotFoundException("id não encontrado! " + id + "");
//		}
//
//	}

    @Transactional
    public AnomaliaDTO update(Long id, AnomaliaDTO dto) {
        try {
            Anomalia entity = anomaliaRepository.getById(id);
            entity.setDescricao(dto.getDescricao());
            copyDtoToEntity(dto, entity);
            entity = anomaliaRepository.save(entity);
            return new AnomaliaDTO(entity);
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Id not found " + id);
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

    /*
     * Acho que o problema da imagem está aqui, pois ele espera que chegue uma lista
     * com os edificios
     * podemos criar outro método para lidar com o request de inserir/editar uma
     * anomalia
     */
    private void copyDtoToEntity(AnomaliaDTO dto, Anomalia entity) {
        entity.setConsequente(dto.getConsequente());
        entity.setInconsequente(dto.getInconsequente());
        entity.setTipologia(dto.getTipologia());
        entity.setDescricao(dto.getDescricao());
        entity.setDate(dto.getDate());
        entity.setImg(dto.getImg());
        /*
         * Para garantir que compiamos somente as edificios que vêm no dto, efetuamos um
         * clear, para limpar os edificios que podem estar na entidade. Assim,
         * associamos
         * edificio (entidades) dentro da entidade anomalia
         */
        entity.getEdificios().clear();
        for (EdificioDTO edificioDto : dto.getEdificios()) {
            Edificio edificio = edificioRepository.getById(edificioDto.getId());
            entity.getEdificios().add(edificio);
        }

    }

    public AddAnomaliaRequest insert(AddAnomaliaRequest addAnomaliaRequest) {
        Anomalia entity = new Anomalia();
        copyRequestToEntity(addAnomaliaRequest, entity);
        entity = anomaliaRepository.save(entity);
        return new AddAnomaliaRequest(entity);
    }

    public void copyRequestToEntity(AddAnomaliaRequest addAnomaliaRequest, Anomalia entity) {
        entity.setConsequente(addAnomaliaRequest.getConsequente());
        entity.setInconsequente(addAnomaliaRequest.getInconsequente());
        entity.setTipologia(addAnomaliaRequest.getTipologia());
        entity.setDescricao(addAnomaliaRequest.getDescricao());
        entity.setDate(addAnomaliaRequest.getDate());
        entity.setImg(addAnomaliaRequest.getImg());
    }

}
