package com.ferreiralapa.projetopathos.resources;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.ferreiralapa.projetopathos.dto.EdificioDTO;
import com.ferreiralapa.projetopathos.services.EdificioService;

@RestController
@RequestMapping(value = "/edificios")
public class EdificioResource {

	@Autowired
	private EdificioService edificioService;

	@GetMapping
	public ResponseEntity<List<EdificioDTO>> findAll() {
		List<EdificioDTO> list = edificioService.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<EdificioDTO> findById(@PathVariable Long id) {
		EdificioDTO dto = edificioService.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<EdificioDTO> insert(@RequestBody EdificioDTO dto) {
		dto = edificioService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<EdificioDTO> update(@PathVariable Long id, @RequestBody EdificioDTO dto) {
		dto = edificioService.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		edificioService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
