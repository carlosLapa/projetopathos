package com.ferreiralapa.projetopathos.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ferreiralapa.projetopathos.dto.AnomaliaDTO;
import com.ferreiralapa.projetopathos.services.AnomaliaService;

@RestController
@RequestMapping(value = "/anomalias")
public class AnomaliaResource {

	@Autowired
	private AnomaliaService AnomaliaService;

	/*
	 * @GetMapping public ResponseEntity<List<AnomaliaDTO>> findAll() {
	 * List<AnomaliaDTO> list = AnomaliaService.findAll(); return
	 * ResponseEntity.ok().body(list); }
	 */

	@GetMapping
	public ResponseEntity<Page<AnomaliaDTO>> findAll(Pageable pageable) {			
		Page<AnomaliaDTO> list = AnomaliaService.findAllPaged(pageable);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<AnomaliaDTO> findById(@PathVariable Long id) {
		AnomaliaDTO dto = AnomaliaService.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<AnomaliaDTO> insert(@Valid @RequestBody AnomaliaDTO dto) {
		dto = AnomaliaService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<AnomaliaDTO> update(@Valid @PathVariable Long id, @RequestBody AnomaliaDTO dto) {
		dto = AnomaliaService.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		AnomaliaService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
