package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import com.ferreiralapa.projetopathos.entities.Anomalia;
import com.ferreiralapa.projetopathos.entities.Edificio;

public class AnomaliaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String consequente;
	private String inconsequente;
	private Instant date;
	private String descricao;

	private List<EdificioDTO> edificios = new ArrayList<>();

	public AnomaliaDTO() {
	}

	public AnomaliaDTO(Long id, String consequente, String inconsequente, Instant date, String descricao) {
		this.id = id;
		this.consequente = consequente;
		this.inconsequente = inconsequente;
		this.date = date;
		this.descricao = descricao;
	}

	public AnomaliaDTO(Anomalia entity) {
		this.id = entity.getId();
		this.consequente = entity.getConsequente();
		this.inconsequente = entity.getInconsequente();
		this.date = entity.getDate();
		this.descricao = entity.getDescricao();
	}

	/*
	 * Este construtor, instancia o AnomaliaDTO com a lista de edificios Para cada
	 * edificio que chega no Set (argumento), executamos a função lambda, que insere
	 * cada um deles, transformado para DTO, na lista de edificios da classe (this)
	 * 
	 */
	public AnomaliaDTO(Anomalia entity, Set<Edificio> edificios) {
		this(entity);
		edificios.forEach(ed -> this.edificios.add(new EdificioDTO(ed)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getConsequente() {
		return consequente;
	}

	public void setConsequente(String consequente) {
		this.consequente = consequente;
	}

	public String getInconsequente() {
		return inconsequente;
	}

	public void setInconsequente(String inconsequente) {
		this.inconsequente = inconsequente;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<EdificioDTO> getEdificios() {
		return edificios;
	}

	public void setEdificios(List<EdificioDTO> edificios) {
		this.edificios = edificios;
	}

}
