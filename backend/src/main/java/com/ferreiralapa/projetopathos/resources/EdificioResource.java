package com.ferreiralapa.projetopathos.resources;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ferreiralapa.projetopathos.entities.Edificio;
import com.ferreiralapa.projetopathos.services.EdificioService;

@RestController
@RequestMapping(value = "/edificios")
public class EdificioResource {

	@Autowired
	private EdificioService edificioService;

	@GetMapping
	public ResponseEntity<List<Edificio>> findAll() {
		List<Edificio> list = edificioService.findAll();
		return ResponseEntity.ok().body(list);
	}

}
