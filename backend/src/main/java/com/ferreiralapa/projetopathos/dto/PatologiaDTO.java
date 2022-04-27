package com.ferreiralapa.projetopathos.dto;

import java.io.Serializable;
import java.time.Instant;

import com.ferreiralapa.projetopathos.entities.Patologia;

public class PatologiaDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String tipologia;
	private String dano;
	private String descricao;
	private String imgUrl;
	private Instant date;

	public PatologiaDTO() {
		super();
	}

	public PatologiaDTO(Long id, String tipologia, String dano, String descricao, String imgUrl, Instant date) {
		this.id = id;
		this.tipologia = tipologia;
		this.dano = dano;
		this.descricao = descricao;
		this.imgUrl = imgUrl;
		this.date = date;
	}

	public PatologiaDTO(Patologia entity) {
		this.id = entity.getId();
		this.tipologia = entity.getTipologia();
		this.dano = entity.getDano();
		this.descricao = entity.getDescricao();
		this.imgUrl = entity.getImgUrl();
		this.date = entity.getDate();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTipologia() {
		return tipologia;
	}

	public void setTipologia(String tipologia) {
		this.tipologia = tipologia;
	}

	public String getDano() {
		return dano;
	}

	public void setDano(String dano) {
		this.dano = dano;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public Instant getDate() {
		return date;
	}

	public void setDate(Instant date) {
		this.date = date;
	}

}
