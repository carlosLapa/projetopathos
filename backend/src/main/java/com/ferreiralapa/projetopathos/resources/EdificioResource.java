package com.ferreiralapa.projetopathos.resources;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ferreiralapa.projetopathos.entities.Edificio;

@RestController
@RequestMapping(value = "/edificios")
public class EdificioResource {

	@GetMapping
	public ResponseEntity<List<Edificio>> findAll() {
		List<Edificio> list = new ArrayList<>();
		list.add(new Edificio(1L, "Aveiro", "Prédio", "Prédio1", "Habitação", "Moderna", 1, "2A"));
		list.add(new Edificio(2L, "Coimbra", "Prédio", "Prédio2", "Habitação", "Moderna", 4, "4C"));
		return ResponseEntity.ok().body(list);
	}

}
