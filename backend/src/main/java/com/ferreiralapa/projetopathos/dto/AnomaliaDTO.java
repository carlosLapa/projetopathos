package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;
import java.time.Instant;

import com.ferreiralapa.projetopathos.entities.Anomalia;

public class AnomaliaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String consequente;
	private String inconsequente;
	private Instant date;
	private String descricao;

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

}
