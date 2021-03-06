package com.ferreiralapa.projetopathos.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ferreiralapa.projetopathos.dto.TratamentoDTO;
import com.ferreiralapa.projetopathos.services.TratamentoService;

@RestController
@RequestMapping(value = "/tratamentos")
public class TratamentoResource {

	@Autowired
	private TratamentoService TratamentoService;

	/*
	 * @GetMapping public ResponseEntity<List<TratamentoDTO>> findAll() {
	 * List<TratamentoDTO> list = TratamentoService.findAll(); return
	 * ResponseEntity.ok().body(list); }
	 */

	@GetMapping
	public ResponseEntity<Page<TratamentoDTO>> findAll(@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "10") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "DESC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "tipologia") String orderBy) {
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<TratamentoDTO> list = TratamentoService.findAllPaged(pageRequest);
		return ResponseEntity.ok().body(list);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<TratamentoDTO> findById(@PathVariable Long id) {
		TratamentoDTO dto = TratamentoService.findById(id);
		return ResponseEntity.ok().body(dto);
	}

	@PostMapping
	public ResponseEntity<TratamentoDTO> insert(@Valid @RequestBody TratamentoDTO dto) {
		dto = TratamentoService.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<TratamentoDTO> update(@Valid @PathVariable Long id, @RequestBody TratamentoDTO dto) {
		dto = TratamentoService.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		TratamentoService.delete(id);
		return ResponseEntity.noContent().build();
	}

}
